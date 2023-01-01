import { Editor, Transforms, Element as SlateElement, Point, Path } from 'slate';
import copy from 'copy-to-clipboard';
import { v4 } from 'uuid';
import React, { CSSProperties, MouseEvent, useContext, useMemo, useState } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { CustomElement } from '../../components/Editor/types';
import { ELEMENT_TYPES_MAP } from '../../components/Editor/constants';
import { useScrollContext } from '../ScrollContext/ScrollContext';
import { useDragDrop, DragDropValues, DragDropHandlers } from '../../hooks/useDragDrop';
import { getNodePath } from '../../components/Editor/utils';

export type HoveredNode = CustomElement | null;

export type NodeSettingsContextValues = DragDropValues & {
  hoveredNode: HoveredNode;
  isNodeSettingsOpen: boolean;
  nodeSettingsPos?: CSSProperties;
};

export type NodeSettingsContextHandlers = DragDropHandlers & {
  openNodeSettings: (_dragRef: any, _node: HoveredNode) => void;
  closeNodeSettings: () => void;
  hoverIn: (_e: MouseEvent<HTMLDivElement>, _node: CustomElement) => void;
  hoverOut: (_e: MouseEvent<HTMLDivElement>, _node: CustomElement) => void;
  triggerPlusButton: (_onFocusCallback: () => void) => void;
  deleteNode: () => void;
  duplicateNode: () => void;
  copyLinkNode: () => void;
  changeHoveredNode: (_hoveredProps: HoveredNode) => void;
};

export type NodeSettingsContextType = [NodeSettingsContextValues, NodeSettingsContextHandlers];

const defaultValues: NodeSettingsContextValues = {
  hoveredNode: null,
  isNodeSettingsOpen: false,
  nodeSettingsPos: undefined,
  dndState: { from: -1, to: -1 },
  disableWhileDrag: false,
};

const NodeSettingsContext = React.createContext<NodeSettingsContextType>([
  defaultValues,
  {
    openNodeSettings: (_dragRef: any, _node?: HoveredNode) => {},
    closeNodeSettings: () => {},
    hoverIn: (_e: MouseEvent<HTMLDivElement>, _node: CustomElement) => {},
    hoverOut: (_e: MouseEvent<HTMLDivElement>, _node: CustomElement) => {},
    triggerPlusButton: (_onFocusCallback: () => void) => {},
    deleteNode: () => {},
    duplicateNode: () => {},
    copyLinkNode: () => {},
    onDrop: (_e) => {},
    onDragEnd: (_e) => {},
    onDragEnter: (_e) => {},
    onDragStart: (_e) => {},
    changeHoveredNode: (_hoveredProps: HoveredNode) => {},
  },
]);

// We can get next nodes with sub paths [5, 0] | [5, 1] || [5, 2, 3];
const getRootLevelNextNodePath = (currentPath: Path, nextPoint: Point | undefined): Point | Path => {
  if (!nextPoint) return [currentPath[0] + 1];

  const rootNodePath = nextPoint.path[0];
  const subNodePath = nextPoint.path[1];

  if (typeof subNodePath === 'number' && subNodePath > 0) {
    return { path: [rootNodePath + 1, 0], offset: 0 };
  }

  return { path: [rootNodePath, 0], offset: 0 };
};

const getInitialState = ({ children }: Editor): HoveredNode => {
  if (children.length === 1) {
    const node = children[0] as CustomElement;
    return node;
  }

  return null;
};

const NodeSettingsProvider = ({ children }) => {
  const editor = useSlate();
  const { disableScroll, enableScroll } = useScrollContext();
  const [dragValues, dragHandlers] = useDragDrop(editor);

  const [nodeSettingsPos, setNodeSettingsPos] = useState<CSSProperties>();
  const [hoveredNode, setHoveredNode] = useState<HoveredNode>(() => getInitialState(editor));
  const [isNodeSettingsOpen, setNodeSettingsOpen] = useState<boolean>(false);

  const values: NodeSettingsContextValues = {
    hoveredNode,
    isNodeSettingsOpen,
    nodeSettingsPos,
    ...dragValues,
  };

  const handlers = useMemo<NodeSettingsContextHandlers>(
    () => ({
      hoverIn: (e: MouseEvent<HTMLDivElement>, node: CustomElement) => {
        if (isNodeSettingsOpen) return e.preventDefault();
        setHoveredNode(node);
      },

      hoverOut: (e: MouseEvent<HTMLDivElement>, node: CustomElement) => {
        if (node.id === hoveredNode?.id || isNodeSettingsOpen) return e.preventDefault();
        setHoveredNode(null);
      },

      changeHoveredNode: (hoverProps: HoveredNode) => setHoveredNode(hoverProps),

      triggerPlusButton: (onFocusCallback: any) => {
        Editor.withoutNormalizing(editor, () => {
          if (!hoveredNode) return;

          const path = getNodePath(editor, hoveredNode);
          const currentNode: any = editor.children[path[0]];
          const after = Editor.after(editor, path);

          const isEmptyNode = Editor.string(editor, path).trim().length === 0;
          const isVoidNode = Editor.isVoid(editor, currentNode);

          const afterPath = getRootLevelNextNodePath(path, after);

          setHoveredNode(null);

          if (!isEmptyNode || isVoidNode) {
            const lineParagraph: any = {
              id: v4(),
              type: ELEMENT_TYPES_MAP.paragraph,
              isVoid: false,
              children: [{ text: '' }],
            };

            Transforms.insertNodes(editor, lineParagraph, {
              at: afterPath,
              match: (n) => SlateElement.isElement(n),
            });
          }

          const focusTimeout = setTimeout(() => {
            Transforms.select(editor, isEmptyNode && !isVoidNode ? path : afterPath);
            ReactEditor.focus(editor);

            const selectionTimeout = setTimeout(() => {
              onFocusCallback();
              clearTimeout(selectionTimeout);
            }, 0);

            clearTimeout(focusTimeout);
          }, 0);
        });
      },

      openNodeSettings: (dragRef, node) => {
        disableScroll();
        setNodeSettingsOpen(true);

        const path = getNodePath(editor, node);
        Transforms.setSelection(editor, { anchor: { path, offset: 0 }, focus: { path, offset: 0 } });

        if (dragRef.current) {
          const dragRect = dragRef.current!.getBoundingClientRect();
          setNodeSettingsPos({ left: dragRect.left + dragRect.width + 10, top: dragRect.top });
        }
      },

      closeNodeSettings: () => {
        enableScroll();
        setNodeSettingsOpen(false);
        setNodeSettingsPos(undefined);
      },

      deleteNode: () => {
        if (!hoveredNode) return;

        const path = ReactEditor.findPath(editor, hoveredNode);
        Transforms.removeNodes(editor, {
          at: [path[0], 0], // remove the whole node including inline nodes
          match: (node) => Editor.isEditor(editor) && SlateElement.isElement(node),
        });

        setHoveredNode(null);
        handlers.closeNodeSettings();
      },

      duplicateNode: () => {
        Editor.withoutNormalizing(editor, () => {
          if (!hoveredNode) return;
          const path = getNodePath(editor, hoveredNode);

          const currentNode = Array.from(
            Editor.nodes(editor, {
              match: (node) => Editor.isEditor(editor) && SlateElement.isElement(node),
              at: path,
            }),
          )[0]?.[0];

          if (currentNode) {
            const duplicatedNode = { ...currentNode, id: v4() };

            Transforms.insertNodes(editor, duplicatedNode, {
              at: { offset: 0, path },
              match: (node) => Editor.isEditor(editor) && SlateElement.isElement(node),
              select: true,
            });

            const focusTimeout = setTimeout(() => {
              Transforms.select(editor, { path, offset: editor.selection?.anchor.offset || 0 });
              ReactEditor.focus(editor);

              clearTimeout(focusTimeout);
            }, 0);
          }

          setHoveredNode(null);
          handlers.closeNodeSettings();
        });
      },

      copyLinkNode: () => {
        copy(`${window.location.href}#${hoveredNode?.id}`);
        handlers.closeNodeSettings();
      },

      ...dragHandlers,
    }),
    [hoveredNode, isNodeSettingsOpen, dragValues],
  );

  const contextValue = useMemo<NodeSettingsContextType>(
    () => [values, handlers],
    [hoveredNode, isNodeSettingsOpen, dragValues, editor.selection],
  );

  return <NodeSettingsContext.Provider value={contextValue}>{children}</NodeSettingsContext.Provider>;
};

const useNodeSettingsContext = () => useContext<NodeSettingsContextType>(NodeSettingsContext);

export { NodeSettingsProvider, useNodeSettingsContext };

import { Editor, Transforms, Element as SlateElement, Point, Path } from 'slate';
import copy from 'copy-to-clipboard';
import React, { CSSProperties, MouseEvent, useContext, useMemo, useState } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { CustomElement } from '../../components/Editor/types';
import { ELEMENT_TYPES_MAP, LIST_TYPES } from '../../components/Editor/constants';
import { useDragDrop, DragDropValues, DragDropHandlers } from '../../hooks/useDragDrop';
import { getNodeByCurrentPath, getNodePath, getDefaultParagraphLine } from '../../components/Editor/utils';
import { getNodeByPath } from '../../utils/nodes';
import { generateId } from '../../utils/generateId';

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
  dndState: { fromPath: null, toPath: null },
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
const getRootLevelNextNodePath = (currentPath: Path, nextPoint: Point | undefined): Point => {
  if (!nextPoint) return { path: [currentPath[0] + 1], offset: 0 };

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

      // [TODO] - write function to get path: [10], [10, 1], [12, 3, 4]
      triggerPlusButton: (onFocusCallback: any) => {
        Editor.withoutNormalizing(editor, () => {
          if (!hoveredNode) return;

          const path = getNodePath(editor, hoveredNode);

          // [TOOD] - getNodeByCurrentPath remove
          const currentNode: any = getNodeByCurrentPath(editor);
          const after = Editor.after(editor, path);
          const nextNode: any = getNodeByPath(editor, after?.path, 'highest');

          const isEmptyNode = Editor.string(editor, path).trim().length === 0;
          const isVoidNode = Editor.isVoid(editor, currentNode);
          const isListItemNode = hoveredNode.type === ELEMENT_TYPES_MAP['list-item'];
          const isNextListNode = LIST_TYPES.includes(nextNode.type);

          // if after node is empty we need add to root [path], overwise add [path1, path2]
          const shouldAddToRoot =
            !after || (!!after?.path[1] && after?.path[1] > 0) || isListItemNode || isNextListNode;
          const afterPath = shouldAddToRoot ? [path[0] + 1] : getRootLevelNextNodePath(path, after);

          setHoveredNode(null);

          if (!isEmptyNode || isVoidNode) {
            const lineParagraph = getDefaultParagraphLine();

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
        // disableScroll();
        setNodeSettingsOpen(true);

        const path = getNodePath(editor, node);
        Transforms.setSelection(editor, { anchor: { path, offset: 0 }, focus: { path, offset: 0 } });

        if (dragRef.current) {
          const dragRect = dragRef.current!.getBoundingClientRect();
          setNodeSettingsPos({ left: dragRect.left + dragRect.width + 10, top: dragRect.top });
        }
      },

      closeNodeSettings: () => {
        // enableScroll();
        setNodeSettingsOpen(false);
        setNodeSettingsPos(undefined);
      },

      deleteNode: () => {
        const isLastDeleted = editor.children.length === 1;
        if (!hoveredNode) return;
        const path = getNodePath(editor, hoveredNode);

        Editor.withoutNormalizing(editor, () => {
          if (isLastDeleted) {
            const lineParagraph = getDefaultParagraphLine();

            Transforms.unwrapNodes(editor, {
              match: (n) => Editor.isEditor(editor) && SlateElement.isElement(n) && n.type === 'list-item',
            });

            Transforms.setNodes(editor, lineParagraph, {
              mode: 'lowest',
              at: [0, 0],
              match: (n) => Editor.isEditor(editor) && SlateElement.isElement(n),
            });

            // [TODO] - delete text
            // Transforms.delete(editor, {
            //   at: [0, 0],
            //   unit: 'line',
            // });

            const focusTimeout = setTimeout(() => {
              Transforms.select(editor, { path: [0, 0], offset: 0 });
              ReactEditor.focus(editor);

              clearTimeout(focusTimeout);
            }, 0);
          } else {
            Transforms.removeNodes(editor, {
              at: path, // remove the whole node including inline nodes
              match: (node) => Editor.isEditor(editor) && SlateElement.isElement(node),
              mode: 'lowest',
            });
          }

          // libOptions.nodeSettings?.onDelete?.();

          setHoveredNode(null);
          handlers.closeNodeSettings();
        });
      },

      duplicateNode: () => {
        Editor.withoutNormalizing(editor, () => {
          if (!hoveredNode) return;
          const path = getNodePath(editor, hoveredNode);
          const currentNode = getNodeByPath(editor);

          if (currentNode) {
            const duplicatedNode = structuredClone(currentNode);
            duplicatedNode.id = generateId();

            Transforms.insertNodes(editor, duplicatedNode, {
              at: { offset: 0, path },
              match: (node) => Editor.isEditor(editor) && SlateElement.isElement(node),
            });

            const after = Editor.after(editor, path);

            const focusTimeout = setTimeout(() => {
              Transforms.select(editor, { path: after?.path || path, offset: 0 });
              ReactEditor.focus(editor);

              clearTimeout(focusTimeout);
            }, 0);
          }

          // libOptions.nodeSettings?.onDuplicate?.();

          setHoveredNode(null);
          handlers.closeNodeSettings();
        });
      },

      copyLinkNode: () => {
        // console.log('libOptions.nodeSettings?.onCopy', libOptions.nodeSettings?.onCopy);
        console.log('`${window.location.href}#${hoveredNode?.id}`', `${window.location.href}#${hoveredNode?.id}`);

        // if (typeof libOptions.nodeSettings?.onCopy === 'function') {
        //   libOptions.nodeSettings?.onCopy?.(hoveredNode?.id || '');
        // } else {
        //   copy(`${window.location.href}#${hoveredNode?.id}`);
        // }

        handlers.closeNodeSettings();
      },

      ...dragHandlers,
    }),
    [hoveredNode, isNodeSettingsOpen, dragValues, editor.children],
  );

  const contextValue = useMemo<NodeSettingsContextType>(
    () => [values, handlers],
    [hoveredNode, isNodeSettingsOpen, dragValues, editor.selection, editor.children],
  );

  return <NodeSettingsContext.Provider value={contextValue}>{children}</NodeSettingsContext.Provider>;
};

const useNodeSettingsContext = () => useContext<NodeSettingsContextType>(NodeSettingsContext);

export { NodeSettingsProvider, useNodeSettingsContext };

import { Editor, Transforms, Element as SlateElement, Point, Path } from 'slate';
import React, { CSSProperties, MouseEvent, useContext, useMemo, useState } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { YoptaBaseElement } from '../../types';
import { ELEMENT_TYPES_MAP, LIST_TYPES } from '../../components/Editor/constants';
import { useDragDrop, DragDropValues, DragDropHandlers, DEFAULT_DRAG_STATE } from '../../hooks/useDragDrop';
import { getDefaultParagraphLine, getNodeByCurrentPath } from '../../components/Editor/utils';
import { getElementByPath } from '../../utils/nodes';
import { generateId } from '../../utils/generateId';
import { deepClone } from '../../utils/deepClone';

export type HoveredNode = YoptaBaseElement<string> | null;

export type NodeSettingsContextValues = DragDropValues & {
  hoveredNode: HoveredNode;
  isNodeSettingsOpen: boolean;
  nodeSettingsPos?: CSSProperties;
};

export type NodeSettingsContextHandlers = DragDropHandlers & {
  openNodeSettings: (_dragRef: any, _node: HoveredNode) => void;
  closeNodeSettings: () => void;
  hoverIn: (_e: MouseEvent<HTMLDivElement>, _node: YoptaBaseElement<string>) => void;
  hoverOut: (_e: MouseEvent<HTMLDivElement>, _node: YoptaBaseElement<string>) => void;
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
  dndState: DEFAULT_DRAG_STATE,
  disableWhileDrag: false,
  DRAG_MAP: new Map(),
};

const NodeSettingsContext = React.createContext<NodeSettingsContextType>([
  defaultValues,
  {
    openNodeSettings: (_dragRef: any, _node?: HoveredNode) => {},
    closeNodeSettings: () => {},
    hoverIn: (_e: MouseEvent<HTMLDivElement>, _node: YoptaBaseElement<string>) => {},
    hoverOut: (_e: MouseEvent<HTMLDivElement>, _node: YoptaBaseElement<string>) => {},
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
    const node = children[0] as YoptaBaseElement<string>;
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

  const events = useMemo<NodeSettingsContextHandlers>(
    () => ({
      hoverIn: (e: MouseEvent<HTMLDivElement>, node: YoptaBaseElement<string>) => {
        if (isNodeSettingsOpen) return e.preventDefault();

        const pathNode = ReactEditor.findPath(editor, node);
        const parentEntry = Editor.parent(editor, pathNode);
        const parentNode = parentEntry[0];

        // [TODO] - add draggable props to element
        if (!!node?.data?.depth) return;

        setHoveredNode(node);
      },

      hoverOut: (e: MouseEvent<HTMLDivElement>, node: YoptaBaseElement<string>) => {
        if (node.id === hoveredNode?.id || isNodeSettingsOpen) return e.preventDefault();
        setHoveredNode(null);
      },

      changeHoveredNode: (hoverProps: HoveredNode) => setHoveredNode(hoverProps),

      // [TODO] - write function to get path: [10], [10, 1], [12, 3, 4]
      triggerPlusButton: (onFocusCallback: any) => {
        Editor.withoutNormalizing(editor, () => {
          if (!hoveredNode) return;

          const path = [];

          // [TOOD] - getNodeByCurrentPath remove
          const currentNode: any = getNodeByCurrentPath(editor);
          const after = Editor.after(editor, path);
          const nextNode: any = getElementByPath(editor, after?.path, 'highest');

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

        const path = [];
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
        const path = [];

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
          events.closeNodeSettings();
        });
      },

      duplicateNode: () => {
        Editor.withoutNormalizing(editor, () => {
          if (!hoveredNode) return;
          const path = [];
          const currentNode = getElementByPath(editor);

          if (currentNode) {
            const duplicatedNode = deepClone(currentNode);
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
          events.closeNodeSettings();
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

        events.closeNodeSettings();
      },

      ...dragHandlers,
    }),
    [hoveredNode, isNodeSettingsOpen, dragValues, editor.children],
  );

  const contextValue = useMemo<NodeSettingsContextType>(
    () => [values, events],
    [hoveredNode, isNodeSettingsOpen, dragValues, editor.selection, editor.children],
  );

  return <NodeSettingsContext.Provider value={contextValue}>{children}</NodeSettingsContext.Provider>;
};

const useNodeSettingsContext = () => useContext<NodeSettingsContextType>(NodeSettingsContext);

export { NodeSettingsProvider, useNodeSettingsContext };

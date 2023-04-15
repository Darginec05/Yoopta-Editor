import { Editor, Transforms, Path, Element } from 'slate';
import React, { CSSProperties, MouseEvent, useContext, useMemo, useState } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { YoptaBaseElement } from '../../types';
import { useDragDrop, DragDropValues, DragDropHandlers, DEFAULT_DRAG_STATE } from '../../hooks/useDragDrop';
import { generateId } from '../../utils/generateId';
import { deepClone } from '../../utils/deepClone';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import copy from 'copy-to-clipboard';

export type HoveredElement = YoptaBaseElement<string> | null;

export type NodeSettingsContextValues = DragDropValues & {
  hoveredElement: HoveredElement;
  isElementOptionsOpen: boolean;
  nodeSettingsPos?: CSSProperties | null;
};

export type NodeSettingsContextHandlers = DragDropHandlers & {
  openNodeSettings: (_dragRef: any, _node: HoveredElement) => void;
  closeNodeSettings: () => void;
  hoverIn: (_e: MouseEvent<HTMLDivElement>, _node: YoptaBaseElement<string>) => void;
  hoverOut: (_e: MouseEvent<HTMLDivElement>, _node: YoptaBaseElement<string>) => void;
  triggerPlusButton: (_onFocusCallback: () => void) => void;
  deleteNode: () => void;
  duplicateNode: () => void;
  copyLinkNode: () => void;
  changeHoveredNode: (_hoveredProps: HoveredElement) => void;
};

export type NodeSettingsContextType = [NodeSettingsContextValues, NodeSettingsContextHandlers];

const defaultValues: NodeSettingsContextValues = {
  hoveredElement: null,
  isElementOptionsOpen: false,
  nodeSettingsPos: null,
  dndState: DEFAULT_DRAG_STATE,
  disableWhileDrag: false,
  DRAG_MAP: new Map(),
};

const NodeSettingsContext = React.createContext<NodeSettingsContextType>([
  defaultValues,
  {
    openNodeSettings: (_dragRef: any, _node?: HoveredElement) => {},
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
    changeHoveredNode: (_hoveredProps: HoveredElement) => {},
  },
]);

const getInitialState = ({ children }: Editor): HoveredElement => {
  if (children.length === 1) {
    const node = children[0] as YoptaBaseElement<string>;
    return node;
  }

  return null;
};

const NodeSettingsProvider = ({ children }) => {
  const editor = useSlate();
  const [dragValues, dragHandlers] = useDragDrop(editor);

  const [nodeSettingsPos, setNodeSettingsPos] = useState<CSSProperties | null>(null);
  const [hoveredElement, setHoveredElement] = useState<HoveredElement>(() => getInitialState(editor));
  const [isElementOptionsOpen, setNodeSettingsOpen] = useState<boolean>(false);

  const values: NodeSettingsContextValues = {
    hoveredElement,
    isElementOptionsOpen,
    nodeSettingsPos,
    ...dragValues,
  };

  const events = useMemo<NodeSettingsContextHandlers>(
    () => ({
      hoverIn: (e: MouseEvent<HTMLDivElement>, node: YoptaBaseElement<string>) => {
        if (isElementOptionsOpen) return e.preventDefault();

        const pathNode = ReactEditor.findPath(editor, node);
        const parentEntry = Editor.parent(editor, pathNode);
        const parentNode = parentEntry[0];

        // [TODO] - add draggable props to element
        if (!!node?.data?.depth) return;

        setHoveredElement(node);
      },

      hoverOut: (e: MouseEvent<HTMLDivElement>, node: YoptaBaseElement<string>) => {
        if (node.id === hoveredElement?.id || isElementOptionsOpen) return e.preventDefault();
        setHoveredElement(null);
      },

      changeHoveredNode: (hoverProps: HoveredElement) => setHoveredElement(hoverProps),

      // [TODO] - write function to get path: [10], [10, 1], [12, 3, 4]
      triggerPlusButton: (onFocusCallback: any) => {
        Editor.withoutNormalizing(editor, () => {
          if (!hoveredElement) return;

          // const path = [];

          // // [TOOD] - getNodeByCurrentPath remove
          // const currentNode: any = getNodeByCurrentPath(editor);
          // const after = Editor.after(editor, path);
          // const nextNode: any = getElementByPath(editor, after?.path, 'highest');

          // const isEmptyNode = Editor.string(editor, path).trim().length === 0;
          // const isVoidNode = Editor.isVoid(editor, currentNode);
          // const isListItemNode = hoveredElement.type === ELEMENT_TYPES_MAP['list-item'];
          // const isNextListNode = LIST_TYPES.includes(nextNode.type);

          // // if after node is empty we need add to root [path], overwise add [path1, path2]
          // const shouldAddToRoot =
          //   !after || (!!after?.path[1] && after?.path[1] > 0) || isListItemNode || isNextListNode;
          // const afterPath = shouldAddToRoot ? [path[0] + 1] : getRootLevelNextNodePath(path, after);

          // setHoveredElement(null);

          // if (!isEmptyNode || isVoidNode) {
          //   const lineParagraph = getDefaultParagraphLine(generateId());

          //   Transforms.insertNodes(editor, lineParagraph, {
          //     at: afterPath,
          //     match: (n) => SlateElement.isElement(n),
          //   });
          // }

          // const focusTimeout = setTimeout(() => {
          //   Transforms.select(editor, isEmptyNode && !isVoidNode ? path : afterPath);
          //   ReactEditor.focus(editor);

          //   const selectionTimeout = setTimeout(() => {
          //     onFocusCallback();
          //     clearTimeout(selectionTimeout);
          //   }, 0);

          //   clearTimeout(focusTimeout);
          // }, 0);
        });
      },

      openNodeSettings: (dragRef, element) => {
        disableBodyScroll(document.body, { reserveScrollBarGap: true });
        setNodeSettingsOpen(true);

        const elementPath = ReactEditor.findPath(editor, element!);

        // console.log('element?.children', element?.children);

        // console.log('elementPath', elementPath);
        // console.log(
        //   'editro node',
        //   Editor.above(editor, {
        //     at: elementPath,
        //   }),
        // );

        // console.log('dragRef, element', dragRef, element);

        // Transforms.setSelection(editor, {
        //   anchor: { path: elementPath.concat(0), offset: 0 },
        //   focus: { path: elementPath.concat(0), offset: 0 },
        // });

        if (dragRef.current) {
          const dragRect = dragRef.current!.getBoundingClientRect();
          setNodeSettingsPos({ left: dragRect.left + dragRect.width + 10, top: dragRect.top });
        }
      },

      closeNodeSettings: () => {
        enableBodyScroll(document.body);
        setNodeSettingsOpen(false);
        setNodeSettingsPos(null);
      },

      deleteNode: () => {
        if (!hoveredElement) return;

        try {
          Editor.withoutNormalizing(editor, () => {
            const path = ReactEditor.findPath(editor, hoveredElement);
            const [parentNode, parentNodePath] = Editor.parent(editor, path);

            if (!path) return;

            let mode: 'highest' | 'lowest' | undefined = 'highest';

            if (Element.isElement(parentNode)) {
              if (parentNode.children.length === 1 && Element.isElement(parentNode.children[0])) {
                Transforms.removeNodes(editor, {
                  at: parentNodePath,
                  match: (node) => Element.isElement(node) && node.id === parentNode.id,
                  mode: 'highest',
                });

                setHoveredElement(null);
                events.closeNodeSettings();
                return;
              }

              if (parentNode.data?.depth > 0) {
                mode = 'lowest';
              }
            }

            console.log('parent of hoveredElement', Editor.parent(editor, path));
            console.log({ path, mode });

            Transforms.removeNodes(editor, {
              at: path, // remove the whole node including inline nodes
              match: (node) => Element.isElement(node),
              mode: mode,
            });

            setHoveredElement(null);
            events.closeNodeSettings();
          });
        } catch (error) {
          console.log({ error });
        }
      },

      duplicateNode: () => {
        Editor.withoutNormalizing(editor, () => {
          if (!hoveredElement) return;

          const path = ReactEditor.findPath(editor, hoveredElement!);
          const afterPath = Path.next(path);

          const duplicatedNode = deepClone(hoveredElement);
          duplicatedNode.id = generateId();

          Transforms.insertNodes(editor, duplicatedNode, {
            at: afterPath,
            match: (n) => Element.isElement(n),
            mode: 'highest',
            select: true,
          });

          ReactEditor.focus(editor);

          setHoveredElement(null);
          events.closeNodeSettings();
        });
      },

      copyLinkNode: () => {
        if (window.location.hash.length === 0) {
          copy(`${window.location.href}#${hoveredElement?.id}`);
        } else {
          copy(`${window.location.href.split('#')[0]}#${hoveredElement?.id}`);
        }

        events.closeNodeSettings();
      },

      ...dragHandlers,
    }),
    [hoveredElement, isElementOptionsOpen, dragValues, editor.children],
  );

  const contextValue = useMemo<NodeSettingsContextType>(
    () => [values, events],
    [hoveredElement, isElementOptionsOpen, dragValues, editor.selection, editor.children],
  );

  return <NodeSettingsContext.Provider value={contextValue}>{children}</NodeSettingsContext.Provider>;
};

const useElementSettings = () => useContext<NodeSettingsContextType>(NodeSettingsContext);

export { NodeSettingsProvider, useElementSettings };

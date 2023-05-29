import { Editor, Transforms, Path, Element, Node } from 'slate';
import React, { CSSProperties, MouseEvent, ReactNode, useContext, useMemo, useState } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { YooptaBaseElement } from '../../types';
import { useDragDrop, DragDropValues, DragDropHandlers, DEFAULT_DRAG_STATE } from '../../hooks/useDragDrop';
import { generateId } from '../../utils/generateId';
import { deepClone } from '../../utils/deepClone';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import copy from 'copy-to-clipboard';
import { getDefaultParagraphLine } from '../../components/Editor/utils';

export type HoveredElement = YooptaBaseElement<string> | null;
export type SelectedNodeElement = YooptaBaseElement<string> | null;

export type NodeSettingsContextValues = DragDropValues & {
  hoveredElement: HoveredElement;
  isElementOptionsOpen: boolean;
  nodeSettingsPos?: CSSProperties | null;
  selectedNodeElement: SelectedNodeElement;
};

export type NodeSettingsContextHandlers = DragDropHandlers & {
  openNodeSettings: (_dragRef: any, _node: HoveredElement) => void;
  closeNodeSettings: () => void;
  hoverIn: (_e: MouseEvent<HTMLDivElement>, _node: YooptaBaseElement<string>) => void;
  triggerPlusButton: (_node: HoveredElement) => void;
  deleteNode: () => void;
  duplicateNode: () => void;
  copyLinkNode: () => void;
  changeHoveredNode: (_hoveredProps: HoveredElement) => void;
  changeSelectedNodeElement: (_node: SelectedNodeElement) => void;
};

export type NodeSettingsContextType = [NodeSettingsContextValues, NodeSettingsContextHandlers];

const defaultValues: NodeSettingsContextValues = {
  hoveredElement: null,
  isElementOptionsOpen: false,
  nodeSettingsPos: null,
  dndState: DEFAULT_DRAG_STATE,
  disableWhileDrag: false,
  DRAG_MAP: new Map(),
  selectedNodeElement: null,
};

const NodeSettingsContext = React.createContext<NodeSettingsContextType>([
  defaultValues,
  {
    openNodeSettings: (_dragRef: any, _node?: HoveredElement) => {},
    closeNodeSettings: () => {},
    hoverIn: (_e: MouseEvent<HTMLDivElement>, _node: YooptaBaseElement<string>) => {},
    triggerPlusButton: (_node: HoveredElement) => {},
    deleteNode: () => {},
    duplicateNode: () => {},
    copyLinkNode: () => {},
    onDrop: (_e) => {},
    onDragEnd: (_e) => {},
    onDragEnter: (_e) => {},
    onDragStart: (_e) => {},
    changeHoveredNode: (_hoveredProps: HoveredElement) => {},
    changeSelectedNodeElement: (_node: HoveredElement) => {},
  },
]);

const getInitialState = ({ children }: Editor): HoveredElement => {
  if (children.length === 1) {
    const node = children[0] as YooptaBaseElement<string>;
    return node;
  }

  return null;
};

type NodeSettingsProps = {
  children: ReactNode;
};

const NodeSettingsProvider = ({ children }: NodeSettingsProps) => {
  const editor = useSlate();
  const [dragValues, dragHandlers] = useDragDrop(editor);

  const [nodeSettingsPos, setNodeSettingsPos] = useState<CSSProperties | null>(null);
  const [hoveredElement, setHoveredElement] = useState<HoveredElement>(() => getInitialState(editor));
  const [selectedNodeElement, setSelectedNodeElement] = useState<SelectedNodeElement>(null);
  const [isElementOptionsOpen, setNodeSettingsOpen] = useState<boolean>(false);

  const values: NodeSettingsContextValues = {
    hoveredElement,
    isElementOptionsOpen,
    nodeSettingsPos,
    selectedNodeElement,
    ...dragValues,
  };

  const events = useMemo<NodeSettingsContextHandlers>(
    () => ({
      hoverIn: (e: MouseEvent<HTMLDivElement>, node: YooptaBaseElement<string>) => {
        if (isElementOptionsOpen) return e.preventDefault();
        if (!!node?.data?.skipSettings) return;
        setHoveredElement(node);
      },

      changeSelectedNodeElement: (node: SelectedNodeElement) => {
        console.log('changeSelectedNodeElement node ', node);

        setSelectedNodeElement(node);
      },

      changeHoveredNode: (hoverElement: HoveredElement) => setHoveredElement(hoverElement),

      // [TODO] - research UX and make it sexy
      triggerPlusButton: (elementNode) => {
        Editor.withoutNormalizing(editor, () => {
          if (!editor.selection || !elementNode) return;

          const elementPath = ReactEditor.findPath(editor, elementNode!);
          const nextTopLevelPath = Path.next([elementPath[0]]);
          const defaultNode = getDefaultParagraphLine(generateId());

          Transforms.insertNodes(editor, defaultNode, {
            at: nextTopLevelPath,
            select: true,
          });

          setHoveredElement(defaultNode);
        });
      },

      openNodeSettings: (dragRef, element) => {
        disableBodyScroll(document.body, { reserveScrollBarGap: true });
        setNodeSettingsOpen(true);
        setSelectedNodeElement(element);

        const elementPath = ReactEditor.findPath(editor, element!);

        let selectionPath = elementPath.concat(0);

        if (Element.isElement(element?.children[0])) {
          selectionPath = selectionPath.concat(0);
        }

        Transforms.select(editor, { path: selectionPath, offset: 0 });
        setHoveredElement(element);

        if (dragRef.current) {
          const dragRect = dragRef.current!.getBoundingClientRect();
          setNodeSettingsPos({ left: dragRect.left + dragRect.width + 10, top: dragRect.top });
        }
      },

      closeNodeSettings: () => {
        enableBodyScroll(document.body);
        setNodeSettingsOpen(false);
        setNodeSettingsPos(null);
        setSelectedNodeElement(null);
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

const useNodeElementSettings = () => useContext<NodeSettingsContextType>(NodeSettingsContext);

export { NodeSettingsProvider, useNodeElementSettings };

import { Editor, Transforms, Element as SlateElement, Path } from 'slate';
import copy from 'copy-to-clipboard';
import { v4 } from 'uuid';
import React, { CSSProperties, MouseEvent, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ReactEditor, useSlateStatic } from 'slate-react';
import { CustomElement } from '../../components/Editor/types';
import { ELEMENT_TYPES_MAP } from '../../components/Editor/constants';
import { useActionMenuContext } from '../ActionMenuContext/ActionMenuContext';
import { useScrollContext } from '../ScrollContext/ScrollContext';
import { useDragDrop } from '../../hooks/useDragDrop';

type Hovered = {
  style?: CSSProperties;
  path: Path;
  node: CustomElement | null;
};

type NodeSettingsContextValue = {
  hovered: Hovered;
  dragRef?: any;
  isNodeSettingsOpen: boolean;
  nodeSettingsPos?: CSSProperties;
};

type NodeSettingsContextHandlers = {
  openNodeSettings: (_path: Path) => void;
  closeNodeSettings: () => void;
  hoverIn: (_e: MouseEvent<HTMLDivElement>, _node: CustomElement) => void;
  hoverOut: (_e: MouseEvent<HTMLDivElement>, _node: CustomElement) => void;
  triggerPlusButton: (_element: CustomElement) => void;
  deleteNode: () => void;
  duplicateNode: () => void;
  copyLinkNode: () => void;
};

type NodeSettingsContextType = [NodeSettingsContextValue, NodeSettingsContextHandlers];

const defaultValues = {
  hovered: { node: null, style: undefined, path: [0, 0] },
  isNodeSettingsOpen: false,
  nodeSettingsPos: undefined,
};

const NodeSettingsContext = React.createContext<NodeSettingsContextType>([
  defaultValues,
  {
    openNodeSettings: (_path: Path) => {},
    closeNodeSettings: () => {},
    hoverIn: (_e: MouseEvent<HTMLDivElement>, _node: CustomElement) => {},
    hoverOut: (_e: MouseEvent<HTMLDivElement>, _node: CustomElement) => {},
    triggerPlusButton: (_element) => {},
    deleteNode: () => {},
    duplicateNode: () => {},
    copyLinkNode: () => {},
  },
]);

const getInitialState = ({ children }: Editor): Hovered => {
  if (children.length === 1) {
    const node = children[0] as CustomElement;
    return { node, path: [] };
  }

  return { node: null, path: [] };
};

const NodeSettingsProvider = ({ children }) => {
  const editor = useSlateStatic();
  const { showSuggestionList } = useActionMenuContext();
  const { disableScroll, enableScroll } = useScrollContext();

  const [nodeSettingsPos, setNodeSettingsPos] = useState<CSSProperties>();
  const [hovered, setHovered] = useState<Hovered>(() => getInitialState(editor));
  const [isNodeSettingsOpen, setNodeSettingsOpen] = useState<boolean>(false);
  const dragRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reset = () => setHovered({ node: null, path: [] });

    document.addEventListener('scroll', reset);
    return () => {
      document.removeEventListener('scroll', reset);
    };
  }, []);

  const values: NodeSettingsContextValue = {
    hovered,
    isNodeSettingsOpen,
    dragRef,
    nodeSettingsPos,
  };

  console.log(hovered.node);

  const handlers = useMemo<NodeSettingsContextHandlers>(
    () => ({
      hoverIn: (e: MouseEvent<HTMLDivElement>, node: CustomElement) => {
        if (isNodeSettingsOpen) return e.preventDefault();
        const { left, top } = e.currentTarget.getBoundingClientRect();
        setHovered({ node, style: { left: left - 46 - 20 + 64, top: top + 3 }, path: [] });
      },

      hoverOut: (e: MouseEvent<HTMLDivElement>, node: CustomElement) => {
        // if (node.id === hovered.node?.id || isNodeSettingsOpen) return e.preventDefault();
        // setHovered({ node: null, path: [] });
      },

      triggerPlusButton: () => {
        Editor.withoutNormalizing(editor, () => {
          if (!hovered.node) return;

          const path = ReactEditor.findPath(editor, hovered.node);
          const currentNode: any = editor.children[path[0]];
          const after = Editor.after(editor, path);

          const isEmptyNode = Editor.string(editor, path).trim().length === 0;
          const isVoidNode = Editor.isVoid(editor, currentNode);
          const afterPath = after || [path[0] + 1];

          setHovered({ node: null, path });

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
              showSuggestionList(undefined, { triggeredBySuggestion: true });
              clearTimeout(selectionTimeout);
            }, 0);

            clearTimeout(focusTimeout);
          }, 0);
        });
      },

      openNodeSettings: (path) => {
        const nodePath = [path[0], 0];

        disableScroll();
        setNodeSettingsOpen(true);
        setHovered((prev) => ({ ...prev, path: nodePath }));

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
        Transforms.removeNodes(editor, {
          at: hovered.path,
          match: (node) => Editor.isEditor(editor) && SlateElement.isElement(node),
        });

        setHovered({ node: null, path: [] });
        handlers.closeNodeSettings();
      },

      duplicateNode: () => {
        Editor.withoutNormalizing(editor, () => {
          const currentNode = Array.from(
            Editor.nodes(editor, {
              match: (node) => Editor.isEditor(editor) && SlateElement.isElement(node),
              at: hovered.path,
            }),
          )[0]?.[0];

          if (currentNode) {
            const duplicatedNode = { ...currentNode, id: v4() };

            Transforms.insertNodes(editor, duplicatedNode, {
              at: { offset: 0, path: [hovered.path[0], 0] },
              match: (node) => Editor.isEditor(editor) && SlateElement.isElement(node),
            });

            const focusTimeout = setTimeout(() => {
              Transforms.select(editor, { offset: 0, path: [hovered.path[0] + 1, 0] });
              ReactEditor.focus(editor);

              clearTimeout(focusTimeout);
            }, 0);
          }

          setHovered({ node: null, path: [] });
          handlers.closeNodeSettings();
        });
      },

      copyLinkNode: () => {
        copy(`${window.location.origin}#${hovered.node?.id}`);
        handlers.closeNodeSettings();
      },
    }),
    [hovered.node, isNodeSettingsOpen],
  );

  const contextValue = useMemo<NodeSettingsContextType>(() => [values, handlers], [hovered.node, isNodeSettingsOpen]);

  return <NodeSettingsContext.Provider value={contextValue}>{children}</NodeSettingsContext.Provider>;
};

const useNodeSettingsContext = () => useContext<NodeSettingsContextType>(NodeSettingsContext);

export { NodeSettingsProvider, useNodeSettingsContext };

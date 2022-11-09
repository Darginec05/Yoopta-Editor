import { Editor, Transforms, Element as SlateElement } from 'slate';
import { v4 } from 'uuid';
import React, { useContext, useMemo, useState } from 'react';
import { ReactEditor, useSlateStatic } from 'slate-react';
import { CustomNode } from '../../components/Editor/types';
import { ELEMENT_TYPES_MAP } from '../../components/Editor/constants';
import { useActionMenuContext } from '../ActionMenuContext/ActionMenuContext';

const NodeSettings = React.createContext({
  onHoverOut: () => {},
  onHover: (_id: string) => {},
  onChangeHoveredNodeId: (_id: string) => {},
  onPlusButtonClick: (_element) => {},
  hoveredNodeId: '',
});

const getInitialState = ({ children }: Editor) => {
  if (children.length === 1) {
    const node = children[0] as CustomNode;
    return node.id;
  }

  return '';
};

const NodeSettingsProvider = ({ children }) => {
  const editor = useSlateStatic();
  const { showSuggestionList } = useActionMenuContext();
  const [hoveredNodeId, setHoveredNodeId] = useState<string>(() => getInitialState(editor));
  // const [stayFocused, setStayFocused] = useState<boolean>(false);

  const onPlusButtonClick = (element) => {
    const path = ReactEditor.findPath(editor, element);
    const currentNode: any = editor.children[path[0]];
    const after = Editor.after(editor, path);
    // showSuggestionList(undefined, { triggeredBySuggestion: true });

    const isEmptyNode = Editor.string(editor, path).trim().length === 0;
    const isVoidNode = Editor.isVoid(editor, currentNode);
    const afterPath = after || [path[0] + 1];

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

      setHoveredNodeId(lineParagraph.id);
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
  };

  const onChangeHoveredNodeId = (id: string) => setHoveredNodeId(id);

  const onHover = (id: string) => onChangeHoveredNodeId(id);
  const onHoverOut = () => setHoveredNodeId('');

  const value = useMemo(
    () => ({ onHoverOut, onHover, hoveredNodeId, onPlusButtonClick, onChangeHoveredNodeId }),
    [hoveredNodeId],
  );

  return <NodeSettings.Provider value={value}>{children}</NodeSettings.Provider>;
};

const useNodeSettingsContext = () => useContext(NodeSettings);

export { NodeSettingsProvider, useNodeSettingsContext };

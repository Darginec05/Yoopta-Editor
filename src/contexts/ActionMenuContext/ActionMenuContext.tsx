import React, {
  CSSProperties,
  MutableRefObject,
  ReactNode,
  Ref,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Editor, Range } from 'slate';
import { useSlate } from 'slate-react';
import { ELEMENT_TYPES_MAP, TEXT_ELEMENTS_LIST } from '../../components/Editor/constants';
import { ELEMENT_TYPES } from '../../components/Editor/ElementsListDropdown/ElementsListDropdown';
import { getAbsPositionBySelection, getRectByCurrentSelection, isBlockActive } from '../../components/Editor/utils';
import { useScrollContext } from '../ScrollContext/ScrollContext';

type Block = {
  type: string;
  name: string;
  icon: ReactNode;
};

const defaultBlock: Block = {
  name: 'Text',
  type: ELEMENT_TYPES_MAP.paragraph,
  icon: null,
};

type ActionMenuContextType = {
  onChangeSuggestionFilterText: (_v: string) => void;
  hideSuggestionList: () => void;
  showSuggestionList: (_style?: CSSProperties) => void;
  filterSuggestionList: (_elem: Block) => void;
  updateToolbarView: (_style?: CSSProperties) => void;
  isSuggesstionListOpen: boolean;
  suggesstionListStyle?: CSSProperties;
  toolbarStyle?: CSSProperties;
  isToolbarActionOpen: boolean;
  selectedElement: Block;
  suggestionListRef: MutableRefObject<HTMLDivElement | undefined>;
  toolbarRef: MutableRefObject<HTMLDivElement | undefined>;
};

const ActionMenuContext = React.createContext<ActionMenuContextType>({
  onChangeSuggestionFilterText: (_v) => {},
  hideSuggestionList: () => {},
  showSuggestionList: (_style) => {},
  filterSuggestionList: (_elem: {}) => {},
  updateToolbarView: (_style) => {},
  isSuggesstionListOpen: false,
  suggesstionListStyle: {},
  toolbarStyle: {},
  isToolbarActionOpen: false,
  selectedElement: defaultBlock,
  suggestionListRef: null,
  toolbarRef: null,
});

type ActionMenu = { open: boolean; style?: CSSProperties };

export const SUGGESTION_TRIGGER = '/';

const ActionMenuProvider = ({ children }) => {
  const editor = useSlate();
  const { enableScroll, disableScroll } = useScrollContext();

  const [suggestionFilterText, setSuggestionFilterText] = useState('');
  const [selectedElement, setSelectedElement] = useState<Block>(defaultBlock);
  const [suggestionListProps, setSuggestionListProps] = useState<ActionMenu>({ open: false });
  const [toolbarProps, setToolbarProps] = useState<ActionMenu>({ open: false });
  const suggestionListRef = useRef<HTMLDivElement>();
  const toolbarRef = useRef<HTMLDivElement>();

  const isToolbarActionOpen = toolbarProps.open;
  const isSuggesstionListOpen = suggestionListProps.open;

  const showSuggestionList = (style?: CSSProperties) => {
    const selectionRect = getRectByCurrentSelection();
    const suggesstionListRect = suggestionListRef.current?.getBoundingClientRect();
    if (!selectionRect) return;

    const isOutViewport = selectionRect.top + suggesstionListRect!.height > window.innerHeight;
    const top = isOutViewport ? 'auto' : selectionRect.top + selectionRect.height + 10;
    const bottom = isOutViewport ? window.innerHeight - selectionRect.bottom + selectionRect!.height + 10 : 'auto';

    setSuggestionListProps({ open: true, style: style || { left: selectionRect.left, top, bottom, opacity: 1 } });
    disableScroll();
  };

  const hideSuggestionList = () => {
    setSuggestionListProps({ open: false });
    setSuggestionFilterText('');

    enableScroll();
  };

  const updateToolbarView = (style?: CSSProperties) => {
    const { top, left } = getAbsPositionBySelection(toolbarRef.current);
    setToolbarProps({ open: true, style: style || { top, left, opacity: 1 } });
  };

  const showToolbar = () => updateToolbarView();

  const hideToolbar = () => {
    // setElementListProps({ open: false });
    hideSuggestionList();
    setSelectedElement(defaultBlock);
    setToolbarProps({ open: false });
  };

  const setCurrentBlock = () => {
    const current = ELEMENT_TYPES.find((elem) => isBlockActive(editor, elem.type));
    setSelectedElement(current || defaultBlock);
  };

  useEffect(() => {
    if (!editor.selection) return hideToolbar();

    const isExpanded = Range.isExpanded(editor.selection) && Editor.string(editor, editor.selection).trim() !== '';
    if (!isExpanded) return hideToolbar();

    updateToolbarView();
    setCurrentBlock();

    window.addEventListener('scroll', showToolbar);
    return () => window.removeEventListener('scroll', showToolbar);
  }, [editor.selection, editor.children]);

  const onChangeSuggestionFilterText = (value: string) => setSuggestionFilterText(value);

  const filterSuggestionList = useCallback(
    (elementItem) => {
      if (isToolbarActionOpen) return TEXT_ELEMENTS_LIST.includes(elementItem.type);

      const filterText = suggestionFilterText.replace(SUGGESTION_TRIGGER, '');
      return (
        elementItem.name.toLowerCase().indexOf(filterText) > -1 ||
        elementItem.type.toLowerCase().indexOf(filterText) > -1
      );
    },
    [suggestionFilterText, isToolbarActionOpen],
  );

  const value = {
    onChangeSuggestionFilterText,
    hideSuggestionList,
    showSuggestionList,
    filterSuggestionList,
    isSuggesstionListOpen,
    selectedElement,
    suggesstionListStyle: suggestionListProps.style,
    toolbarStyle: toolbarProps.style,
    isToolbarActionOpen,
    suggestionListRef,
    toolbarRef,
    updateToolbarView,
  };

  return <ActionMenuContext.Provider value={value}>{children}</ActionMenuContext.Provider>;
};

const useActionMenuContext = () => useContext(ActionMenuContext);

export { ActionMenuProvider, useActionMenuContext };

import React, { CSSProperties, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Editor, Range } from 'slate';
import { useSlate } from 'slate-react';
import { ELEMENT_TYPES_MAP, TEXT_ELEMENTS_LIST } from '../../components/Editor/constants';
import { ELEMENT_TYPES } from '../../components/Editor/SuggestionElementList/SuggestionElementList';
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

type ActionMenu = {
  open: boolean;
  style?: CSSProperties;
  triggeredBySuggestion?: boolean;
  shouldShowTextNodes?: boolean;
};

type ShowSuggestionOptions = {
  triggeredBySuggestion?: ActionMenu['triggeredBySuggestion'];
  shouldShowTextNodes?: ActionMenu['shouldShowTextNodes'];
};

type ActionMenuContextType = {
  onChangeSuggestionFilterText: (_v: string) => void;
  hideSuggestionList: () => void;
  hideToolbarTools: () => void;
  showSuggestionList: (_style?: CSSProperties, _options?: ShowSuggestionOptions) => void;
  filterSuggestionList: (_elem: Block) => void;
  updateToolbarView: (_style?: CSSProperties) => void;
  isSuggesstionListOpen: boolean;
  suggesstionListStyle?: CSSProperties;
  toolbarStyle?: CSSProperties;
  isToolbarActionOpen: boolean;
  selectedElement: Block | null;
  suggestionListRef: any;
  toolbarRef: any;
};

const ActionMenuContext = React.createContext<ActionMenuContextType>({
  onChangeSuggestionFilterText: (_v) => {},
  hideSuggestionList: () => {},
  hideToolbarTools: () => {},
  showSuggestionList: (_style, _options) => {},
  filterSuggestionList: (_elem: {}) => {},
  updateToolbarView: (_style) => {},
  isSuggesstionListOpen: false,
  suggesstionListStyle: {},
  toolbarStyle: {},
  isToolbarActionOpen: false,
  selectedElement: null,
  suggestionListRef: null,
  toolbarRef: null,
});

export const SUGGESTION_TRIGGER = '/';

const ActionMenuProvider = ({ children }) => {
  const editor = useSlate();
  const { enableScroll, disableScroll } = useScrollContext();

  const [suggestionFilterText, setSuggestionFilterText] = useState('');
  const [selectedElement, setSelectedElement] = useState<Block | null>(null);
  const [suggestionListProps, setSuggestionListProps] = useState<ActionMenu>({ open: false });
  const [toolbarProps, setToolbarProps] = useState<ActionMenu>({ open: false });
  const suggestionListRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  const isToolbarActionOpen = toolbarProps.open;
  const isSuggesstionListOpen = suggestionListProps.open;

  const showSuggestionList = (style?: CSSProperties, options?: ShowSuggestionOptions) => {
    const selectionRect = getRectByCurrentSelection();
    const suggesstionListRect = suggestionListRef.current?.getBoundingClientRect();
    if (!selectionRect) return;

    const isOutViewport = selectionRect.top + suggesstionListRect!.height > window.innerHeight;
    const top = isOutViewport ? 'auto' : selectionRect.top + selectionRect.height + 10;
    const bottom = isOutViewport ? window.innerHeight - selectionRect.bottom + selectionRect!.height + 10 : 'auto';

    setSuggestionListProps({
      open: true,
      style: style || { left: selectionRect.left, top, bottom, opacity: 1 },
      ...options,
    });
    disableScroll();
  };

  const hideSuggestionList = () => {
    setSuggestionListProps({ open: false });
    setSuggestionFilterText('');

    enableScroll();
  };

  const setCurrentBlock = () => {
    const current = ELEMENT_TYPES.find((elem) => isBlockActive(editor, elem.type));
    setSelectedElement(current || defaultBlock);
  };

  const updateToolbarView = (style?: CSSProperties) => {
    const { top, left } = getAbsPositionBySelection(toolbarRef.current);
    console.log({ w: toolbarRef.current?.offsetWidth });
    setCurrentBlock();
    setToolbarProps({ open: true, style: style || { top, left, opacity: 1 } });
  };

  const showToolbarTools = () => updateToolbarView();

  const hideToolbarTools = () => {
    if (!isToolbarActionOpen) return;

    hideSuggestionList();
    setSelectedElement(null);
    setToolbarProps({ open: false });
  };

  useEffect(() => {
    if (suggestionListProps.triggeredBySuggestion) return;
    setCurrentBlock();

    if (!editor.selection) return hideToolbarTools();

    const isExpanded = Range.isExpanded(editor.selection) && Editor.string(editor, editor.selection).trim() !== '';

    if (!isExpanded) return hideToolbarTools();

    updateToolbarView();

    window.addEventListener('scroll', showToolbarTools);
    return () => window.removeEventListener('scroll', showToolbarTools);
  }, [editor.selection, editor.children, suggestionListProps.triggeredBySuggestion]);

  const onChangeSuggestionFilterText = (value: string) => setSuggestionFilterText(value);

  const filterSuggestionList = useCallback(
    (elementItem) => {
      if (isToolbarActionOpen || suggestionListProps.shouldShowTextNodes) {
        return TEXT_ELEMENTS_LIST.includes(elementItem.type);
      }

      const filterText = suggestionFilterText.replace(SUGGESTION_TRIGGER, '');
      return (
        elementItem.name.toLowerCase().indexOf(filterText) > -1 ||
        elementItem.type.toLowerCase().indexOf(filterText) > -1
      );
    },
    [suggestionFilterText, suggestionListProps.shouldShowTextNodes, isToolbarActionOpen],
  );

  const value = useMemo(
    () => ({
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
      hideToolbarTools,
      updateToolbarView,
    }),
    [
      toolbarProps,
      suggestionListProps,
      toolbarRef.current,
      suggestionListRef.current,
      suggestionFilterText,
      selectedElement,
    ],
  );

  return <ActionMenuContext.Provider value={value}>{children}</ActionMenuContext.Provider>;
};

const useActionMenuContext = () => useContext(ActionMenuContext);

export { ActionMenuProvider, useActionMenuContext };

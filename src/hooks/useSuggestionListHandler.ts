import { CSSProperties, useCallback, useRef, useState } from 'react';
import { getRectByCurrentSelection } from '../components/Editor/utils';
import { useScrollContext } from '../contexts/ScrollContext/ScrollContext';

type ActionMenu = { open: boolean; style: CSSProperties | null };

export const SUGGESTION_TRIGGER = '/';

export const useSuggestionListHanler = () => {
  const { enableScroll, disableScroll } = useScrollContext();
  const [suggestionFilterText, setSuggestionFilterText] = useState('');
  const [suggestionList, setSuggestionList] = useState<ActionMenu>({ open: false, style: {} });
  const suggestionListRef = useRef<HTMLDivElement>(null);

  const showSuggestionList = () => {
    const selectionRect = getRectByCurrentSelection();
    const suggesstionListRect = suggestionListRef.current?.getBoundingClientRect();
    const isOutViewport = selectionRect.top + suggesstionListRect!.height > window.innerHeight;
    const top = isOutViewport ? 'auto' : selectionRect.top + selectionRect.height + 10;

    const bottom = isOutViewport ? window.innerHeight - selectionRect.bottom + selectionRect!.height + 10 : 'auto';

    setSuggestionList({ open: true, style: { left: selectionRect.left, top, bottom, opacity: 1 } });
    disableScroll();
  };

  const hideSuggestionList = () => {
    setSuggestionList({ open: false, style: {} });
    setSuggestionFilterText('');

    enableScroll();
  };

  const onChangeSuggestionFilterText = (value) => setSuggestionFilterText(value);

  const filterSuggestionList = useCallback(
    (elementItem) => {
      const filterText = suggestionFilterText.replace(SUGGESTION_TRIGGER, '');
      return (
        elementItem.name.toLowerCase().indexOf(filterText) > -1 ||
        elementItem.type.toLowerCase().indexOf(filterText) > -1
      );
    },
    [suggestionFilterText],
  );

  return {
    onChangeSuggestionFilterText,
    hideSuggestionList,
    showSuggestionList,
    filterSuggestionList,
    isSuggesstionListOpen: suggestionList.open,
    suggesstionListStyle: suggestionList.style,
    suggestionListRef,
  };
};

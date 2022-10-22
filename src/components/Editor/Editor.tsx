import { Editor, Transforms, Element as SlateElement, Range } from 'slate';
import { useCallback, KeyboardEvent, MouseEvent } from 'react';
import { Editable, ReactEditor } from 'slate-react';
import { v4 } from 'uuid';
import { TextLeaf } from './TextLeaf';
import { RenderElement } from './RenderElement/RenderElement';
import { Toolbar } from './Toolbar/Toolbar';
import { ParagraphElement, CustomNode } from './types';
import { LIST_TYPES, toggleBlock } from './utils';
import { ELEMENT_TYPES_MAP, IGNORED_SOFT_BREAK_ELEMS } from './constants';
import { SuggestionElementList } from './SuggestionElementList/SuggestionElementList';
import { useDragDrop } from '../../hooks/useDragDrop';
import { useScrollToElement } from '../../hooks/useScrollToElement';
import { useActionMenuContext, SUGGESTION_TRIGGER } from '../../contexts/ActionMenuContext/ActionMenuContext';
import { OutsideClick } from '../OutsideClick';
import s from './Editor.module.scss';

type YoptaProps = { editor: Editor };

const YoptaEditor = ({ editor }: YoptaProps) => {
  useScrollToElement();

  const { onDrop, dndState, onDragEnd, onDragStart, isDisableByDrag } = useDragDrop({ editor });
  const {
    toolbarRef,
    toolbarStyle,
    selectedElement,
    hideToolbarTools,
    suggestionListRef,
    showSuggestionList,
    hideSuggestionList,
    filterSuggestionList,
    suggesstionListStyle,
    isSuggesstionListOpen,
    onChangeSuggestionFilterText,
  } = useActionMenuContext();

  const isReadOnly = isDisableByDrag;

  const onPlusButtonClick = (element) => {
    const path = ReactEditor.findPath(editor, element);
    const after = Editor.after(editor, path);
    showSuggestionList(undefined, true);

    const node: CustomNode = {
      id: v4(),
      type: ELEMENT_TYPES_MAP.paragraph,
      isVoid: false,
      children: [{ text: '' }],
    };

    Transforms.insertNodes(editor, node, {
      at: after,
      match: (n) => SlateElement.isElement(n),
    });

    const focusTimeout = setTimeout(() => {
      Transforms.select(editor, after!);
      ReactEditor.focus(editor);

      const selectionTimeout = setTimeout(() => {
        showSuggestionList(undefined, true);
        clearTimeout(selectionTimeout);
      }, 0);

      clearTimeout(focusTimeout);
    }, 0);
  };

  const renderLeaf = useCallback((leafProps) => <TextLeaf {...leafProps} />, []);

  const renderElement = useCallback(
    (elemProps) => (
      <RenderElement
        onPlusButtonClick={onPlusButtonClick}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDrop={onDrop}
        dndState={dndState}
        {...elemProps}
      />
    ),
    [dndState],
  );

  const onKeyUp = useCallback(
    (event) => {
      if (!editor.selection) return;

      const text = Editor.string(editor, editor.selection.anchor.path);

      // [TODO] - make trigger not only empty paragraph
      if (!isSuggesstionListOpen && event.key === SUGGESTION_TRIGGER && text === SUGGESTION_TRIGGER) {
        showSuggestionList(undefined, true);
      }

      if (isSuggesstionListOpen) {
        onChangeSuggestionFilterText(text);
      }
    },
    [isSuggesstionListOpen],
  );

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    const { selection } = editor;
    if (!selection) return;

    const node: any = editor.children[selection?.anchor.path[0] || 0];
    const text = Editor.string(editor, selection.anchor.path);
    const isEnterKey = event.key === 'Enter';

    if (event.key === 'Backspace' && (text.length === 0 || text === SUGGESTION_TRIGGER)) {
      hideSuggestionList();
    }

    if (isEnterKey) {
      const newLine: ParagraphElement = {
        id: v4(),
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
      };

      const isListBlock = Editor.above(editor, {
        match: (n) => {
          return Editor.isBlock(editor, n) && n.type === ELEMENT_TYPES_MAP['list-item'];
        },
      });

      if (isListBlock && text.trim() === '') {
        event.preventDefault();

        Transforms.unwrapNodes(editor, {
          match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
          split: true,
        });

        return Transforms.setNodes(editor, newLine);
      }

      if (event.shiftKey) {
        event.preventDefault();
        editor.insertText('\n');
      }

      if (!event.shiftKey && !IGNORED_SOFT_BREAK_ELEMS.includes(node.type)) {
        event.preventDefault();
        Transforms.insertNodes(editor, newLine);
      }
    }
  }, []);

  const handleBlockClick = (e: MouseEvent<HTMLButtonElement>, type?: string) => {
    e.preventDefault();
    if (!type) return;

    toggleBlock(editor, type, { isVoid: false, children: [{ text: '' }] }, 'toggle');
    hideSuggestionList();
  };

  const decorate = ([node, path]) => {
    if (editor.selection) {
      if (
        !Editor.isEditor(node) &&
        Editor.string(editor, [path[0]]) === '' &&
        Range.includes(editor.selection, path) &&
        Range.isCollapsed(editor.selection)
      ) {
        return [
          {
            ...editor.selection,
            placeholder: true,
          },
        ];
      }
    }
    return [];
  };

  return (
    <main className={s.editorContainer}>
      <div className={s.editorContent}>
        <OutsideClick onClose={hideToolbarTools}>
          <Toolbar toolbarRef={toolbarRef} toolbarStyle={toolbarStyle} editor={editor} />
          <SuggestionElementList
            filterListCallback={filterSuggestionList}
            handleBlockClick={handleBlockClick}
            style={suggesstionListStyle}
            onClose={hideSuggestionList}
            selectedElementType={selectedElement?.type}
            isOpen={isSuggesstionListOpen}
            ref={suggestionListRef}
          />
        </OutsideClick>
        <Editable
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          readOnly={isReadOnly}
          spellCheck
          decorate={decorate}
        />
      </div>
    </main>
  );
};

export { YoptaEditor };

import { createEditor, Descendant, Editor, Transforms, Element as SlateElement, Point } from 'slate';
import { useCallback, useState, KeyboardEvent, MouseEvent } from 'react';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';
import { v4 } from 'uuid';
// import Prism from 'prismjs';
import { TextLeaf } from './TextLeaf';
import { RenderElement } from './RenderElement/RenderElement';
import { withShortcuts, withInlines, withVoidNodes, withCorrectVoidBehavior, withFixDeleteFragment } from './plugins';
import { Toolbar } from './Toolbar/Toolbar';
import { ParagraphElement, CustomNode } from './types';
import { DEFAULT_STATE, LIST_TYPES, toggleBlock } from './utils';
import { ELEMENT_TYPES_MAP, IGNORED_SOFT_BREAK_ELEMS } from './constants';
import { ElementsListDropdown } from './ElementsListDropdown/ElementsListDropdown';
import { OutsideClick } from '../OutsideClick';
import { useDragDrop } from '../../hooks/useDragDrop';
import { useScrollToElement } from '../../hooks/useScrollToElement';
import { useSuggestionListHanler, SUGGESTION_TRIGGER } from '../../hooks/useSuggestionListHandler';
import s from './Editor.module.scss';

const getInitialData = () => {
  if (typeof window === 'undefined') return [];

  const content = localStorage.getItem('content');

  return content ? JSON.parse(content) : JSON.parse(DEFAULT_STATE);
};

const SlateEditor = () => {
  const [value, setValue] = useState<Descendant[]>(() => getInitialData());

  const [editor] = useState(() => withFixDeleteFragment(
    withHistory(withCorrectVoidBehavior(withVoidNodes(withInlines(withShortcuts(withReact(createEditor())))))),
  ));

  useScrollToElement();
  const { onDrop, dndState, onDragEnd, onDragStart, isDisableByDrag } = useDragDrop({ editor });
  const {
    showSuggestionList,
    hideSuggestionList,
    filterSuggestionList,
    onChangeSuggestionFilterText,
    isSuggesstionListOpen,
    suggesstionListStyle,
    suggestionListRef,
  } = useSuggestionListHanler();

  const isReadOnly = isDisableByDrag;

  const onPlusButtonClick = (element) => {
    const path = ReactEditor.findPath(editor, element);
    const after = Editor.after(editor, path);

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
        showSuggestionList();
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
      const text = Editor.string(editor, editor.selection!.anchor.path);

      if (!isSuggesstionListOpen && event.key === SUGGESTION_TRIGGER) {
        showSuggestionList();
      }

      if (isSuggesstionListOpen) {
        onChangeSuggestionFilterText(text);
      }
    },
    [isSuggesstionListOpen],
  );

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    const { selection } = editor;
    const node: any = editor.children[selection?.anchor.path[0] || 0];
    const text = Editor.string(editor, editor.selection!.anchor.path);
    const isEnterKey = event.key === 'Enter';

    // [TODO] - will be removed after making dropdown accessibility
    if (
      (event.key === 'Backspace' && (text.length === 0 || text === SUGGESTION_TRIGGER)) ||
      isEnterKey ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'Meta'
    ) {
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

  const handleBlockClick = (e: MouseEvent<HTMLButtonElement>, type: string) => {
    e.preventDefault();
    toggleBlock(editor, type, { isVoid: false, children: [{ text: '' }] });
    hideSuggestionList();
  };

  const onChange = useCallback((newValue) => {
    setValue(newValue);
    const isASTChanged = editor.operations.some((op) => op.type !== 'set_selection');

    if (isASTChanged) {
      try {
        const content = JSON.stringify(newValue);
        localStorage.setItem('content', content);
      } catch (error) {
        // [TODO] - don't store base64 src in image node
        console.log(error);
      }
    }
  }, []);

  return (
    <main className={s.editorContainer}>
      <Slate editor={editor} value={value} onChange={onChange}>
        <div className={s.editorContent}>
          <OutsideClick onClose={hideSuggestionList}>
            <ElementsListDropdown
              filterListCallback={filterSuggestionList}
              handleBlockClick={handleBlockClick}
              // selectedElementType={ELEMENT_TYPES_MAP.paragraph}
              style={suggesstionListStyle}
              onClose={hideSuggestionList}
              ref={suggestionListRef}
            />
          </OutsideClick>
          <Toolbar />
          <Editable
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            readOnly={isReadOnly}
            // onInput={console.log}
            // onDOMBeforeInput={(event) => console.log(event.AT_TARGET)}
            spellCheck
          />
        </div>
      </Slate>
    </main>
  );
};

export { SlateEditor };

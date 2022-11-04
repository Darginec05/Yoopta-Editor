import { Editor, Transforms, Element as SlateElement, Range } from 'slate';
import { useCallback, KeyboardEvent, MouseEvent } from 'react';
import cx from 'classnames';
import { Editable, ReactEditor } from 'slate-react';
import { v4 } from 'uuid';
import { TextLeaf } from './TextLeaf';
import { RenderElement } from './RenderElement/RenderElement';
import { Toolbar } from './Toolbar/Toolbar';
import { toggleBlock } from './utils';
import { ELEMENT_TYPES_MAP } from './constants';
import { SuggestionElementList } from './SuggestionElementList/SuggestionElementList';
import { useDragDrop } from '../../hooks/useDragDrop';
import { useScrollToElement } from '../../hooks/useScrollToElement';
import { useActionMenuContext, SUGGESTION_TRIGGER } from '../../contexts/ActionMenuContext/ActionMenuContext';
import { OutsideClick } from '../OutsideClick';
import { useSettings } from '../../contexts/SettingsContext/SettingsContext';
import s from './Editor.module.scss';
import { ParagraphElement } from './types';

type YoptaProps = { editor: Editor };

const YoptaEditor = ({ editor }: YoptaProps) => {
  const { options } = useSettings();

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
    const currentNode: any = editor.children[path[0]];
    const after = Editor.after(editor, path);
    showSuggestionList(undefined, { triggeredBySuggestion: true });

    const node: any = {
      id: v4(),
      type: ELEMENT_TYPES_MAP.paragraph,
      isVoid: false,
      children: [{ text: '' }],
    };

    const isEmptyNode = Editor.string(editor, path).trim().length === 0;
    const isVoidNode = Editor.isVoid(editor, currentNode);
    const afterPath = after || [path[0] + 1];

    if (!isEmptyNode || isVoidNode) {
      Transforms.insertNodes(editor, node, {
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
  };

  const renderLeaf = useCallback((leafProps) => <TextLeaf isEdit {...leafProps} />, []);

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
        showSuggestionList(undefined, { triggeredBySuggestion: true });
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

    const text = Editor.string(editor, selection.anchor.path);
    const isEnter = event.key === 'Enter';

    if (event.key === 'Meta' || (event.key === 'Backspace' && (text.length === 0 || text === SUGGESTION_TRIGGER))) {
      hideSuggestionList();
    }

    if (isEnter) {
      const isListBlock = Editor.above(editor, {
        match: (n) => {
          return Editor.isBlock(editor, n) && n.type === ELEMENT_TYPES_MAP['list-item'];
        },
      });

      if (isListBlock && text.trim() === '') {
        event.preventDefault();
        toggleBlock(editor, 'paragraph');
        return;
      }

      if (event.shiftKey) {
        event.preventDefault();
        editor.insertText('\n');
      }

      if (!event.shiftKey) {
        const newLine: ParagraphElement = {
          id: v4(),
          type: 'paragraph',
          children: [
            {
              text: '',
            },
          ],
        };

        event.preventDefault();
        // [TODO] - check for void elements
        Transforms.insertNodes(editor, newLine);
      }
    }
  }, []);

  const handleBlockClick = (e: MouseEvent<HTMLButtonElement>, type?: string) => {
    e.preventDefault();
    if (!type) return;

    if (editor.selection) {
      const { offset, path } = editor.selection.anchor;
      const text = Editor.string(editor, path);

      if (Range.isCollapsed(editor.selection) && text.length > 0) {
        Transforms.delete(editor, {
          at: {
            anchor: { path, offset: 0 },
            focus: { path, offset },
          },
        });
      }
    }

    toggleBlock(editor, type, { isVoid: false, children: [{ text: '' }] });
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

  const onCloseTools = () => {
    hideToolbarTools();
    hideSuggestionList();
  };

  const handleEmptyZoneClick = (e: MouseEvent<HTMLDivElement>) => {
    console.log({
      'e.currentTarget': e.currentTarget,
      'e.target': e.target,
      child: editor.children,
      path: editor.selection?.anchor.path,
    });

    // if (e.currentTarget === e.target) {
    //   const newLine: ParagraphElement = {
    //     id: v4(),
    //     type: 'paragraph',
    //     children: [
    //       {
    //         text: '',
    //       },
    //     ],
    //   };

    //   console.log(editor.selection);

    //   Transforms.insertNodes(editor, newLine, {
    //     at: { offset: 0, path: [editor.children.length, 0] },
    //     match: (node) => {
    //       if (Editor.isEditor(editor) && SlateElement.isElement(node)) return true;
    //       return false;
    //     },
    //   });

    //   ReactEditor.focus(editor);
    // }
  };

  return (
    <main className={cx(s.editorContainer, options.wrapCls, 'yopta-editor')}>
      <div
        role="button"
        tabIndex={0}
        className={cx(s.editorContent, options.contentCls)}
        onClick={handleEmptyZoneClick}
      >
        <OutsideClick onClose={onCloseTools}>
          {/* @ts-ignore */}
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
          autoFocus
        />
      </div>
    </main>
  );
};

export { YoptaEditor };

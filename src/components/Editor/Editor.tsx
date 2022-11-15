import { Editor, Transforms, Range } from 'slate';
import { useCallback, KeyboardEvent, MouseEvent } from 'react';
import cx from 'classnames';
import { Editable, ReactEditor } from 'slate-react';
import { v4 } from 'uuid';
import { TextLeaf } from './TextLeaf';
import { RenderElement } from './RenderElement/RenderElement';
import { Toolbar } from './Toolbar/Toolbar';
import { LIST_TYPES, toggleBlock } from './utils';
import { TEXT_ELEMENTS_LIST, VOID_ELEMENTS } from './constants';
import { SuggestionElementList } from './SuggestionElementList/SuggestionElementList';
import { useScrollToElement } from '../../hooks/useScrollToElement';
import { useActionMenuContext, SUGGESTION_TRIGGER } from '../../contexts/ActionMenuContext/ActionMenuContext';
import { useSettings } from '../../contexts/SettingsContext/SettingsContext';
import { ParagraphElement } from './types';
import { useNodeSettingsContext } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { OutsideClick } from '../OutsideClick';
import s from './Editor.module.scss';

type YoptaProps = { editor: Editor };

const YoptaEditor = ({ editor }: YoptaProps) => {
  const { options } = useSettings();
  useScrollToElement();
  const [{ disableWhileDrag }, { changeHoveredNode }] = useNodeSettingsContext();

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
    changeNodeType,
  } = useActionMenuContext();

  const isReadOnly = disableWhileDrag;

  const renderLeaf = useCallback((leafProps) => <TextLeaf isEdit {...leafProps} />, []);
  const renderElement = useCallback((elemProps) => <RenderElement {...elemProps} />, []);

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

    const currentNode: any = editor.children[editor.selection?.anchor.path[0] || 0];
    const text = Editor.string(editor, selection.anchor.path);
    const isEnter = event.key === 'Enter';

    if (event.key === 'Meta' || (event.key === 'Backspace' && (text.length === 0 || text === SUGGESTION_TRIGGER))) {
      hideSuggestionList();
    }

    if (isEnter) {
      const isListNode = LIST_TYPES.includes(currentNode.type);
      const isVoidNode = VOID_ELEMENTS.includes(currentNode.type);
      const isTextNode = TEXT_ELEMENTS_LIST.includes(currentNode.type);

      if (isListNode && text.trim() === '') {
        event.preventDefault();
        toggleBlock(editor, 'paragraph');
        return;
      }

      if (event.shiftKey) {
        event.preventDefault();
        editor.insertText('\n');
      }

      const lineParagraph: ParagraphElement = {
        id: v4(),
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
      };

      if (!event.shiftKey && !isListNode) {
        // change next element to paragraph
        if (isTextNode) {
          event.preventDefault();
          Transforms.splitNodes(editor, { always: true });
          Transforms.setNodes(editor, lineParagraph);
          // add new line in case of void element (e.g. image)
        } else if (isVoidNode) {
          event.preventDefault();
          Transforms.insertNodes(editor, lineParagraph);
        }

        changeHoveredNode(lineParagraph);
      }
    }
  }, []);

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

  const handleEmptyZoneClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.currentTarget !== e.target || !editor.selection) return;

    Editor.withoutNormalizing(editor, () => {
      const location = {
        anchor: { path: [editor.children.length - 1, 0], offset: 0 },
        focus: { path: [editor.children.length - 1, 0], offset: 0 },
      };

      const after = Editor.after(editor, location, {
        unit: 'block',
      });

      Transforms.select(editor, {
        path: after?.path || location.anchor.path,
        offset: after?.offset || 0,
      });

      const lineParagraph: ParagraphElement = {
        id: v4(),
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
      };

      changeHoveredNode(lineParagraph);
      Editor.insertNode(editor, lineParagraph);
      ReactEditor.focus(editor);
    });
  };

  const stopPropagation = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  return (
    <main
      id="yopta-editor"
      aria-hidden
      className={cx(s.editorContainer, options.wrapCls)}
      onMouseDown={handleEmptyZoneClick}
    >
      <div
        className={cx(s.editorContent, options.contentCls)}
        aria-hidden
        onMouseDown={stopPropagation}
      >
        <OutsideClick onClose={hideToolbarTools}>
          {/* @ts-ignore */}
          <Toolbar toolbarRef={toolbarRef} toolbarStyle={toolbarStyle} editor={editor} />
        </OutsideClick>
        <SuggestionElementList
          filterListCallback={filterSuggestionList}
          style={suggesstionListStyle}
          onClose={hideSuggestionList}
          selectedElementType={selectedElement?.type}
          isOpen={isSuggesstionListOpen}
          changeNodeType={changeNodeType}
          ref={suggestionListRef}
        />
        <Editable
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          readOnly={isReadOnly}
          spellCheck
          decorate={decorate}
          autoFocus
          id="yopta-contenteditable"
        />
      </div>
    </main>
  );
};

export { YoptaEditor };

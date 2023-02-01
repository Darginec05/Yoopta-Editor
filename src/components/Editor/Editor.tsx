import { Editor, Transforms, Range, Element } from 'slate';
import { useCallback, KeyboardEvent, MouseEvent, useMemo } from 'react';
import cx from 'classnames';
import { Editable, ReactEditor } from 'slate-react';
import { TextLeaf } from './TextLeaf/TextLeaf';
import { RenderElement } from './RenderElement/RenderElement';
import { Toolbar } from './Toolbar/Toolbar';
import { capitalizeFirstLetter, getDefaultParagraphLine, getNodeByPath, removeMarks } from './utils';
import { ELEMENT_TYPES_MAP, TEXT_ELEMENTS_LIST } from './constants';
import { SuggestionElementList } from './SuggestionElementList/SuggestionElementList';
import { useScrollToElement } from '../../hooks/useScrollToElement';
import { useActionMenuContext, SUGGESTION_TRIGGER } from '../../contexts/ActionMenuContext/ActionMenuContext';
import { LibOptions, useSettings } from '../../contexts/SettingsContext/SettingsContext';
import { useNodeSettingsContext } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { OutsideClick } from '../OutsideClick';
import { codeDecorator } from '../Elements/Code/decorator';
import { createListPlugin } from '../../plugins/list';
import { createLinkPlugin } from '../../plugins/link';
import { onCopyYoptaNodes } from '../../utils';
import s from './Editor.module.scss';

type YoptaProps = { editor: Editor; placeholder: LibOptions['placeholder'] };

const EditorYopta = ({ editor, placeholder }: YoptaProps) => {
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

  const renderElement = useCallback((elemProps) => <RenderElement {...elemProps} />, []);
  const renderLeaf = useCallback((leafProps) => {
    const nodePlaceholder =
      leafProps.children.props?.parent.type === ELEMENT_TYPES_MAP.paragraph
        ? placeholder || ' Type / to open menu'
        : ` ${capitalizeFirstLetter(leafProps.children.props?.parent.type)}`;

    return <TextLeaf placeholder={nodePlaceholder} {...leafProps} />;
  }, []);

  const { ListPlugin, LinkPlugin } = useMemo(
    () => ({
      ListPlugin: createListPlugin(editor),
      LinkPlugin: createLinkPlugin(editor),
    }),
    [],
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

    const currentNode: any = getNodeByPath(editor);
    const isListItemNode = currentNode.type === ELEMENT_TYPES_MAP['list-item'];
    const isLastDeleted = editor.children.length === 1;

    const isVoidNode = Editor.isVoid(editor, currentNode);
    const isTextNode = TEXT_ELEMENTS_LIST.includes(currentNode.type);

    const text = Editor.string(editor, selection.anchor.path);
    const isEnter = event.key === 'Enter';
    const isBackspace = event.key === 'Backspace';
    const isSpace = event.code === 'Space';

    if (event.key === 'Meta' || (event.key === 'Backspace' && (text.length === 0 || text === SUGGESTION_TRIGGER))) {
      hideSuggestionList();
    }

    if (isBackspace && isVoidNode && isLastDeleted) {
      event.preventDefault();
      const lineParagraph = getDefaultParagraphLine();

      Transforms.setNodes(editor, lineParagraph, {
        mode: 'lowest',
        at: [0, 0],
        match: (n) => Editor.isEditor(editor) && Element.isElement(n),
      });

      const focusTimeout = setTimeout(() => {
        Transforms.select(editor, { path: [0, 0], offset: 0 });
        ReactEditor.focus(editor);

        clearTimeout(focusTimeout);
      }, 0);

      return;
    }

    if (isEnter && currentNode.type === ELEMENT_TYPES_MAP.link) {
      LinkPlugin.handlers.onEnter(event);
      return;
    }

    if (isSpace && currentNode.type === ELEMENT_TYPES_MAP.link) {
      LinkPlugin.handlers.onSpace(event);
      return;
    }

    if (isBackspace && isListItemNode) {
      ListPlugin.handlers.onBackspace(event);
      return;
    }

    if (isEnter && isListItemNode) {
      ListPlugin.handlers.onEnter(event);
      return;
    }

    if (isEnter) {
      const lineParagraph = getDefaultParagraphLine();

      if (event.shiftKey) {
        if (currentNode.type === ELEMENT_TYPES_MAP.code) {
          event.preventDefault();

          Transforms.splitNodes(editor, { always: true });
          Transforms.setNodes(editor, lineParagraph);
          return;
        }

        event.preventDefault();
        editor.insertText('\n');
      }

      if (!event.shiftKey) {
        if (currentNode.type === ELEMENT_TYPES_MAP.code) {
          event.preventDefault();
          editor.insertText('\n');
        } else if (isTextNode) {
          // [TODO] - change next element to paragraph
          event.preventDefault();

          Transforms.splitNodes(editor, { always: true });
          Transforms.setNodes(editor, lineParagraph);
          removeMarks(editor);
          // [TODO] - add new line in case of void element (e.g. image)
        } else if (isVoidNode) {
          event.preventDefault();
          Transforms.insertNodes(editor, lineParagraph);
        }

        changeHoveredNode(lineParagraph);
      }
    }
  }, []);

  const decorate = useCallback(([node, path]) => {
    if (node.type === 'code') return codeDecorator([node, path]);

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
  }, []);

  const handleEmptyZoneClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.currentTarget !== e.target || !editor.selection) return;

    Editor.withoutNormalizing(editor, () => {
      const lastPath = [editor.children.length - 1, 0];
      const lastNode: any = getNodeByPath(editor, lastPath, 'highest');
      const lastNodeText = Editor.string(editor, lastPath);

      const location = {
        anchor: { path: lastPath, offset: 0 },
        focus: { path: lastPath, offset: 0 },
      };

      if (lastNode.type === ELEMENT_TYPES_MAP.paragraph && lastNodeText.length === 0) {
        Transforms.select(editor, {
          path: location.anchor.path,
          offset: 0,
        });

        changeHoveredNode(lastNode);
        return ReactEditor.focus(editor);
      }

      const lineParagraph = getDefaultParagraphLine();
      changeHoveredNode(lineParagraph);

      Transforms.insertNodes(editor, lineParagraph, {
        at: [editor.children.length],
        select: true,
      });
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
      className={cx(s.editorContainer, options.className)}
      onMouseDown={handleEmptyZoneClick}
    >
      <div id="yopta-editor-content" className={s.editorContent} aria-hidden onMouseDown={stopPropagation}>
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
          onCopy={onCopyYoptaNodes}
        />
      </div>
    </main>
  );
};

export { EditorYopta };

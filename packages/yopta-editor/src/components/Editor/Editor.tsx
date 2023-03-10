import { Editor, Transforms, Range, Element, NodeEntry } from 'slate';
import { useCallback, MouseEvent, useMemo } from 'react';
import cx from 'classnames';
import uniqWith from 'lodash.uniqwith';
import { DefaultElement, Editable, ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';
import { TextLeaf } from './TextLeaf/TextLeaf';
import { Toolbar } from './Toolbar/Toolbar';
import { getDefaultParagraphLine } from './utils';
import { ELEMENT_TYPES_MAP } from './constants';
import { SuggestionElementList } from './SuggestionElementList/SuggestionElementList';
import { useScrollToElement } from '../../hooks/useScrollToElement';
import { useActionMenuContext, SUGGESTION_TRIGGER } from '../../contexts/ActionMenuContext/ActionMenuContext';
import { LibOptions, useSettings } from '../../contexts/SettingsContext/SettingsContext';
import { useNodeSettingsContext } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { OutsideClick } from '../OutsideClick';
import { onCopyYoptaNodes } from '../../utils/copy';
import { ElementWrapper } from '../ElementWrapper/ElementWrapper';
import { HOTKEYS } from '../../utils/hotkeys';
import { YoptaComponent, YoptaComponentType } from '../../utils/component';
import { getNodeByPath } from '../../utils/nodes';
import { EditorEventHandlers } from '../../types/eventHandlers';
import s from './Editor.module.scss';

type YoptaProps = { editor: Editor; placeholder: LibOptions['placeholder']; components: YoptaComponent[] };

const EditorYopta = ({ editor, placeholder, components }: YoptaProps) => {
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

  const yoptaComponents = useMemo(() => {
    const yoptaComponents: Omit<YoptaComponentType, 'children'>[] = components
      .map((instance) => {
        const component = instance.getProps;
        const { children, ...restComponentProps } = component;
        return children ? [restComponentProps, children.getProps] : component;
      })
      .flat();

    const uniqueComponents = uniqWith(yoptaComponents, (a, b) => a.type === b.type);
    return uniqueComponents;
  }, [components, editor]);

  const renderElement = useMemo(() => {
    return (props: RenderElementProps) => {
      for (let i = 0; i < yoptaComponents.length; i++) {
        const component = yoptaComponents[i];

        const renderFn = component.renderer(editor);
        // [TODO] - add strong checker for renderFn
        if (props.element.type === component.type) {
          return (
            <ElementWrapper
              element={props.element}
              attributes={props.attributes}
              component={component}
              render={renderFn}
            >
              {props.children}
            </ElementWrapper>
          );
        }
      }
      return <DefaultElement {...props} />;
    };
  }, [yoptaComponents, editor]);

  const decorate = useMemo(() => {
    return (nodeEntry: NodeEntry) => {
      const ranges: Range[] = [];
      const [node] = nodeEntry;

      yoptaComponents.forEach((component) => {
        const decoratorFn = component.decorator;

        if (typeof decoratorFn === 'function' && Element.isElement(node) && node.type === component.type) {
          ranges.push(...decoratorFn(editor)(nodeEntry));
        }
      });

      return ranges;
    };
  }, [yoptaComponents, editor]);

  const renderLeaf = useMemo(() => {
    return (leafProps: RenderLeafProps) => {
      const props = { ...leafProps };

      yoptaComponents.forEach((component) => {
        if (component.leaf) {
          const leafChildren = component.leaf(editor)(props);
          if (leafChildren) props.children = leafChildren;
        }
      });

      return <TextLeaf {...props} />;
    };
  }, [yoptaComponents, editor]);

  const eventHandlers = useMemo<EditorEventHandlers>(() => {
    const events = yoptaComponents
      .map((component) => Object.keys(component.handlers || {}))
      .flat()
      .filter((event, i, self) => self.indexOf(event) === i);

    const eventHandlersMap = {};

    // [TODO] - defaultComponent move to common event handler to avoid repeated id's
    const handlersOptions = { hotkeys: HOTKEYS, defaultComponent: getDefaultParagraphLine() };

    events.forEach((eventType) => {
      eventHandlersMap[eventType] = function handler(event) {
        yoptaComponents.forEach((component) => {
          if (!!component.handlers && Object.keys(component.handlers).length > 0) {
            const eventHandler = component.handlers[eventType](editor, handlersOptions);
            eventHandler(event);
          }
        });
      };
    });

    return eventHandlersMap;
  }, [yoptaComponents, editor]);

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

  // const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
  //   const { selection } = editor;
  //   if (!selection) return;

  //   const currentNode: any = getNodeByPath(editor);
  //   const isListItemNode = currentNode.type === ELEMENT_TYPES_MAP['list-item'];
  //   const isLastDeleted = editor.children.length === 1;

  //   const isVoidNode = Editor.isVoid(editor, currentNode);
  //   const isTextNode = TEXT_ELEMENTS_LIST.includes(currentNode.type);

  //   const text = Editor.string(editor, selection.anchor.path);
  //   const isEnter = event.key === 'Enter';
  //   const isBackspace = event.key === 'Backspace';
  //   const isSpace = event.code === 'Space';

  //   if (event.key === 'Meta' || (event.key === 'Backspace' && (text.length === 0 || text === SUGGESTION_TRIGGER))) {
  //     hideSuggestionList();
  //   }

  //   if (isBackspace && isVoidNode && isLastDeleted) {
  //     event.preventDefault();
  //     const lineParagraph = getDefaultParagraphLine();

  //     Transforms.setNodes(editor, lineParagraph, {
  //       mode: 'lowest',
  //       at: [0, 0],
  //       match: (n) => Editor.isEditor(editor) && Element.isElement(n),
  //     });

  //     const focusTimeout = setTimeout(() => {
  //       Transforms.select(editor, { path: [0, 0], offset: 0 });
  //       ReactEditor.focus(editor);

  //       clearTimeout(focusTimeout);
  //     }, 0);

  //     return;
  //   }

  //   if (isBackspace && isListItemNode) {
  //     ListPlugin.handlers.onBackspace(event);
  //     return;
  //   }

  //   if (isEnter && isListItemNode) {
  //     ListPlugin.handlers.onEnter(event);
  //     return;
  //   }

  //   if (isEnter) {
  //     const lineParagraph = getDefaultParagraphLine();

  //     if (event.shiftKey) {
  //       event.preventDefault();
  //       editor.insertText('\n');
  //     }

  //     if (!event.shiftKey) {
  //       if (isTextNode) {
  //         // [TODO] - change next element to paragraph
  //         event.preventDefault();

  //         Transforms.splitNodes(editor, { always: true });
  //         Transforms.setNodes(editor, lineParagraph);
  //         removeMarks(editor);
  //         // [TODO] - add new line in case of void element (e.g. image)
  //       } else if (isVoidNode) {
  //         event.preventDefault();
  //         Transforms.insertNodes(editor, lineParagraph);
  //       }

  //       changeHoveredNode(lineParagraph);
  //     }
  //   }
  // }, []);

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
          onKeyUp={onKeyUp}
          readOnly={isReadOnly}
          spellCheck
          decorate={decorate}
          autoFocus
          id="yopta-contenteditable"
          onCopy={onCopyYoptaNodes}
          // onKeyDown={onKeyDown}
          {...eventHandlers}
        />
      </div>
    </main>
  );
};

export { EditorYopta };

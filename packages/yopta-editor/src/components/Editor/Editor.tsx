import { Editor, Transforms, Range, Element, NodeEntry, Path } from 'slate';
import React, { useCallback, MouseEvent, useMemo, KeyboardEvent, ReactNode, useRef } from 'react';
import { DefaultElement, Editable, ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';
import { TextLeaf } from './TextLeaf/TextLeaf';
import {
  deserializeHTML,
  getDefaultParagraphLine,
  getRenderFunctionFactory,
  isElementHasText,
  toggleMark,
} from './utils';
import { useScrollToElement } from '../../hooks/useScrollToElement';
import { useElementSettings } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { onCopyYoptaNodes } from '../../utils/copy';
import { ElementWrapper } from '../ElementWrapper/ElementWrapper';
import { HOTKEYS } from '../../utils/hotkeys';
import { ParentYoptaPlugin, YoptaPluginType } from '../../utils/plugins';
import { getElementByPath } from '../../utils/nodes';
import { EditorEventHandlers } from '../../types/eventHandlers';
import { generateId } from '../../utils/generateId';
import { YoptaMark } from '../../utils/marks';
import { YoEditor, YoptaBaseElement } from '../../types';
import { deepClone } from '../../utils/deepClone';
import { isKeyHotkey } from 'is-hotkey';

type YoptaProps = {
  editor: YoEditor;
  placeholder?: string;
  readOnly?: boolean;
  plugins: ParentYoptaPlugin[];
  children: ReactNode | ReactNode[];
  marks: YoptaMark[];
  PLUGINS_MAP: Record<YoptaBaseElement<string>['type'], YoptaPluginType<any, YoptaBaseElement<string>>>;
};

// [TODO] - defaultNode move to common event handler to avoid repeated id's
const eventHandlersOptions = { hotkeys: HOTKEYS, defaultNode: getDefaultParagraphLine(generateId()) };

const EditorYopta = ({ editor, placeholder, marks, readOnly, children, plugins, PLUGINS_MAP }: YoptaProps) => {
  useScrollToElement();
  const editorRef = useRef<HTMLDivElement>(null);
  const [{ disableWhileDrag }, { changeHoveredNode }] = useElementSettings();

  const isReadOnly = disableWhileDrag || readOnly;

  const renderElement = useMemo(() => {
    return (props: RenderElementProps) => {
      for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i];
        const renderFn = getRenderFunctionFactory(plugin)(editor, plugin);

        // [TODO] - add strong checker for renderFn
        if (props.element.type === plugin.type) {
          return (
            <ElementWrapper
              element={props.element}
              attributes={props.attributes}
              nodeType={props.element.nodeType}
              render={renderFn}
            >
              {props.children}
            </ElementWrapper>
          );
        }
      }
      return <DefaultElement {...props} />;
    };
  }, [plugins, editor]);

  const decorate = useMemo(() => {
    return (nodeEntry: NodeEntry) => {
      // [TODO] - fix types
      const ranges: any[] = [];
      const [node, path] = nodeEntry;

      plugins.forEach((plugin) => {
        const decoratorFn = plugin.decorator;

        if (typeof decoratorFn === 'function' && Element.isElement(node) && node.type === plugin.type) {
          ranges.push(...decoratorFn(editor)(nodeEntry));
        }
      });

      if (editor.selection) {
        if (
          !Editor.isEditor(node) &&
          Editor.string(editor, [path[0]]) === '' &&
          Range.includes(editor.selection, path) &&
          Range.isCollapsed(editor.selection)
        ) {
          ranges.push({
            ...editor.selection,
            withPlaceholder: true,
          });
        }
      }

      return ranges;
    };
  }, [plugins, editor]);

  const renderLeaf = useMemo(() => {
    return (leafProps: RenderLeafProps) => {
      const props = { ...leafProps };

      plugins.forEach((plugin) => {
        if (plugin.leaf) {
          const leafChildren = plugin.leaf(editor)(props);
          if (leafChildren) props.children = leafChildren;
        }
      });

      marks.forEach((mark) => {
        // console.log('props.leaf', props.leaf);

        if (props.leaf[mark.type]) {
          props.children = mark.render(props);
        }
      });

      let textPlaceholder: YoptaPluginType['placeholder'];
      const parentElement = props.children.props?.parent;

      if (!isElementHasText(parentElement)) {
        const parentPlugin = PLUGINS_MAP[parentElement?.type];
        textPlaceholder = parentPlugin?.placeholder === null ? null : parentPlugin?.placeholder || placeholder;
      }

      return <TextLeaf {...props} placeholder={textPlaceholder} />;
    };
  }, [plugins, editor]);

  const eventHandlers = useMemo<EditorEventHandlers>(() => {
    const events = plugins
      .map((plugin) => Object.keys(plugin.events || {}))
      .flat()
      .filter((event, i, self) => self.indexOf(event) === i);

    const eventHandlersMap = {};

    events.forEach((eventType) => {
      eventHandlersMap[eventType] = function handler(event) {
        plugins.forEach((plugin) => {
          if (plugin.events?.[eventType]) {
            const eventHandler = plugin.events[eventType](editor, eventHandlersOptions);
            eventHandler(event);
          }
        });
      };
    });

    return eventHandlersMap;
  }, [plugins, editor]);

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    Editor.withoutNormalizing(editor, () => {
      if (!editor.selection) return;
      const defaultNode = getDefaultParagraphLine(generateId());

      // // Check if all selected nodes should be deleted
      // if (HOTKEYS.isBackspace(event)) {
      //   const [, firstElementPath] = Editor.first(editor, [0]);
      //   const [, lastElementPath] = Editor.last(editor, [editor.children.length - 1]);

      //   const fullRange = Editor.range(editor, firstElementPath, lastElementPath);
      //   const isAllNodesSelected = Range.equals(editor.selection, fullRange);

      //   if (isAllNodesSelected) {
      //     event.preventDefault();
      //     // Editor.deleteFragment(editor);
      //     return;
      //   }
      // }

      marks?.forEach((mark) => {
        if (mark.hotkey && isKeyHotkey(mark.hotkey)(event)) {
          event.preventDefault();
          toggleMark(editor, mark.type, false);
        }
      });

      eventHandlers.onKeyDown?.(event);

      const nodeEntry = Editor.above<YoptaBaseElement<string>>(editor, {
        match: (n) => !Editor.isEditor(n),
        mode: 'lowest',
      });

      if (HOTKEYS.isEnter(event)) {
        if (event.isDefaultPrevented()) return;
        event.preventDefault();

        const marks = Object.keys(Editor.marks(editor) || {});

        if (marks.length > 0) marks.forEach((mark) => Editor.removeMark(editor, mark));

        const parentPath = Path.parent(editor.selection.anchor.path);

        const text = Editor.string(editor, parentPath);
        const isDefaultNode = nodeEntry && nodeEntry[0].type !== defaultNode.type;

        if (isDefaultNode && text.length === 0) {
          Transforms.setNodes(editor, defaultNode, {
            at: parentPath,
          });

          return;
        }

        const isStart = Editor.isStart(editor, editor.selection.anchor, editor.selection.anchor.path);

        if (isStart && isDefaultNode) {
          const [currentNode] = nodeEntry;

          Transforms.setNodes(editor, defaultNode, { at: parentPath });
          Transforms.delete(editor, { unit: 'block' });
          Transforms.insertNodes(editor, deepClone(currentNode), { at: Path.next(parentPath) });

          Transforms.select(editor, { path: [Path.next(editor.selection.anchor.path)[0] + 1, 0], offset: 0 });
          return;
        }

        Transforms.splitNodes(editor, { always: true });
        Transforms.setNodes(editor, defaultNode);
        changeHoveredNode(defaultNode);

        return;
      }

      if (HOTKEYS.isShiftEnter(event)) {
        if (event.isDefaultPrevented()) return;

        event.preventDefault();
        editor.insertText('\n');
      }

      if (HOTKEYS.isSelect(event)) {
        if (event.isDefaultPrevented()) return;
        event.preventDefault();

        const nodeEntry = Editor.above(editor, {
          at: editor.selection.anchor.path,
          match: (n) => !Editor.isEditor(n) && Element.isElement(n),
        });

        if (!nodeEntry) return;

        const text = Editor.string(editor, nodeEntry[1]);
        if (Range.isExpanded(editor.selection) || text.length === 0) {
          Transforms.select(editor, []);
          return;
        }

        Transforms.select(editor, nodeEntry[1]);
        return;
      }
    });
  }, []);

  const handleEmptyZoneClick = (e: MouseEvent<HTMLDivElement>) => {
    if (readOnly) return;

    e.preventDefault();

    if (e.currentTarget !== e.target || !editor.selection) return;

    Editor.withoutNormalizing(editor, () => {
      const lastPath = [editor.children.length - 1, 0];
      const lastNode: any = getElementByPath(editor, lastPath, 'highest');
      const lastNodeText = Editor.string(editor, lastPath);

      console.log('lastNode', lastNode);
      console.log('lastNodeText', lastNodeText);

      const location = {
        anchor: { path: lastPath, offset: 0 },
        focus: { path: lastPath, offset: 0 },
      };

      if (lastNode.type === 'paragraph' && lastNodeText.length === 0) {
        Transforms.select(editor, {
          path: location.anchor.path,
          offset: 0,
        });

        changeHoveredNode(lastNode);
        return ReactEditor.focus(editor);
      }

      const lineParagraph: YoptaBaseElement<'paragraph'> = getDefaultParagraphLine(generateId());
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

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    eventHandlers.onMouseDown?.(e);
    stopPropagation(e);
  };

  const childs = useMemo(() => {
    const hasEditorChildren = React.Children.count(children) > 0;
    if (!hasEditorChildren) return null;

    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return null;

      return React.cloneElement(child, {
        ...child.props,
        plugins,
        marks: marks.map((mark) => mark.type),
        editorRef,
        PLUGINS_MAP,
      });
    });
  }, [plugins, marks, editorRef.current]);

  return (
    <div id="yopta-editor" ref={editorRef} onMouseDown={handleEmptyZoneClick}>
      {childs}
      <Editable
        id="yopta-contenteditable"
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        readOnly={isReadOnly}
        decorate={decorate}
        // onCopy={onCopyYoptaNodes}
        autoFocus
        spellCheck
        {...eventHandlers}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        // onPaste={(event: any) => {
        //   event.preventDefault();
        //   const data = event.clipboardData;
        //   const html = data.getData('text/html');
        //   const parsed = new DOMParser().parseFromString(html, 'text/html');

        //   console.log('parsed', parsed);

        //   const fragment = deserializeHTML(parsed.body, editor.plugins);
        //   Transforms.insertFragment(editor, fragment);
        //   console.log('fragment', fragment);
        // }}
      />
    </div>
  );
};

export { EditorYopta };

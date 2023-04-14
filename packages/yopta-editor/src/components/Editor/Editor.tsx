import { Editor, Transforms, Range, Element, NodeEntry, Path } from 'slate';
import React, { useCallback, MouseEvent, useMemo, KeyboardEvent, ReactNode, useRef, useEffect } from 'react';
import { DefaultElement, Editable, ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';
import { TextLeaf } from './TextLeaf/TextLeaf';
import { getDefaultParagraphLine, getRenderFunctionFactory } from './utils';
import { ELEMENT_TYPES_MAP } from './constants';
import { useScrollToElement } from '../../hooks/useScrollToElement';
import { useElementSettings } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { onCopyYoptaNodes } from '../../utils/copy';
import { ElementWrapper } from '../ElementWrapper/ElementWrapper';
import { HOTKEYS } from '../../utils/hotkeys';
import { ParentYoptaPlugin } from '../../utils/plugins';
import { getElementByPath } from '../../utils/nodes';
import { EditorEventHandlers } from '../../types/eventHandlers';
import { generateId } from '../../utils/generateId';
import { YoptaMark } from '../../utils/marks';
import { YoEditor, YoptaBaseElement } from '../../types';
import { deepClone } from '../../utils/deepClone';

type YoptaProps = {
  editor: YoEditor;
  placeholder?: string;
  readOnly?: boolean;
  plugins: ParentYoptaPlugin[];
  children: ReactNode | ReactNode[];
  marks: YoptaMark[];
};

// [TODO] - defaultNode move to common event handler to avoid repeated id's
const handlersOptions = { hotkeys: HOTKEYS, defaultNode: getDefaultParagraphLine() };

const EditorYopta = ({ editor, placeholder, marks, readOnly, children, plugins }: YoptaProps) => {
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
      const ranges: Range[] = [];
      const [node] = nodeEntry;

      plugins.forEach((plugin) => {
        const decoratorFn = plugin.decorator;

        if (typeof decoratorFn === 'function' && Element.isElement(node) && node.type === plugin.type) {
          ranges.push(...decoratorFn(editor)(nodeEntry));
        }
      });

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
        if (props.leaf[mark.type]) {
          props.children = mark.render(props);
        }
      });

      return <TextLeaf {...props} />;
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
            const eventHandler = plugin.events[eventType](editor, handlersOptions);
            eventHandler(event);
          }
        });
      };
    });

    return eventHandlersMap;
  }, [plugins, editor]);

  const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    Editor.withoutNormalizing(editor, () => {
      eventHandlers.onKeyDown?.(event);

      if (!editor.selection) return;

      const defaultNode = { ...getDefaultParagraphLine(), id: generateId() };
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

      const lineParagraph: YoptaBaseElement<'paragraph'> = getDefaultParagraphLine();
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

  const hasEditorChildren = React.Children.count(children) > 0;

  return (
    <div id="yopta-editor" ref={editorRef} onMouseDown={handleEmptyZoneClick}>
      {hasEditorChildren &&
        React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return null;

          return React.cloneElement(child, {
            ...child.props,
            plugins,
            marks: marks.map((mark) => mark.type),
            editorRef,
          });
        })}
      <Editable
        id="yopta-contenteditable"
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        readOnly={isReadOnly}
        decorate={decorate}
        onCopy={onCopyYoptaNodes}
        autoFocus
        spellCheck
        {...eventHandlers}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
      />
    </div>
  );
};

export { EditorYopta };

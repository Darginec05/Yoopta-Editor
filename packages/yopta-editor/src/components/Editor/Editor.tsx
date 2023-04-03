import { Editor, Transforms, Range, Element, NodeEntry, Path } from 'slate';
import React, { useCallback, MouseEvent, useMemo, KeyboardEvent, MouseEventHandler, ReactNode, useEffect } from 'react';
import { DefaultElement, Editable, ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';
import { TextLeaf } from './TextLeaf/TextLeaf';
import { getDefaultParagraphLine } from './utils';
import { ELEMENT_TYPES_MAP } from './constants';
import { useScrollToElement } from '../../hooks/useScrollToElement';
import { useNodeSettingsContext } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { onCopyYoptaNodes } from '../../utils/copy';
import { ElementWrapper } from '../ElementWrapper/ElementWrapper';
import { HOTKEYS } from '../../utils/hotkeys';
import { ParentYoptaPlugin, YoptaPluginType, YoptaRenderElementFunc } from '../../utils/plugins';
import { getNodeByPath } from '../../utils/nodes';
import { EditorEventHandlers } from '../../types/eventHandlers';
import { generateId } from '../../utils/generateId';
import { YoptaMark } from '../../utils/marks';

type YoptaProps = {
  editor: Editor;
  placeholder?: string;
  readOnly?: boolean;
  plugins: ParentYoptaPlugin[];
  children: ReactNode | ReactNode[];
  marks: YoptaMark[];
};

const getRenderFunctionFactory = (plugin: YoptaPluginType, readOnly?: boolean): YoptaRenderElementFunc => {
  if (typeof plugin.renderer === 'function') {
    return plugin.renderer;
  }

  if (readOnly) {
    return plugin.renderer.render || plugin.renderer.editor;
  }

  return plugin.renderer.editor;
};

// [TODO] - defaultNode move to common event handler to avoid repeated id's
const handlersOptions = { hotkeys: HOTKEYS, defaultNode: getDefaultParagraphLine() };

const EditorYopta = ({ editor, placeholder, marks, readOnly, children, plugins }: YoptaProps) => {
  useScrollToElement();
  const [{ disableWhileDrag }, { changeHoveredNode }] = useNodeSettingsContext();
  const isReadOnly = disableWhileDrag || readOnly;

  const renderElement = useMemo(() => {
    return (props: RenderElementProps) => {
      for (let i = 0; i < plugins.length; i++) {
        const plugin = plugins[i];
        const { type, options } = plugin;

        const renderFn = getRenderFunctionFactory(plugin, readOnly)(editor, { type, options });

        // [TODO] - add strong checker for renderFn
        if (props.element.type === plugin.type) {
          return (
            <ElementWrapper
              element={props.element}
              attributes={props.attributes}
              type={plugin.element?.type}
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
      .map((plugin) => Object.keys(plugin.handlers || {}))
      .flat()
      .filter((event, i, self) => self.indexOf(event) === i);

    const eventHandlersMap = {};

    events.forEach((eventType) => {
      eventHandlersMap[eventType] = function handler(event) {
        plugins.forEach((plugin) => {
          if (plugin.handlers?.[eventType]) {
            const eventHandler = plugin.handlers[eventType](editor, handlersOptions);
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
      const nodeEntry = Editor.above(editor, {
        match: (n) => !Editor.isEditor(n),
        mode: 'lowest',
      });

      if (HOTKEYS.isEnter(event)) {
        if (event.isDefaultPrevented()) return;
        event.preventDefault();

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
          Transforms.insertNodes(editor, structuredClone(currentNode), { at: Path.next(parentPath) });

          Transforms.select(editor, { path: [Path.next(editor.selection.anchor.path)[0] + 1, 0], offset: 0 });
          return;
        }

        Transforms.splitNodes(editor, { always: true });
        Transforms.setNodes(editor, defaultNode);

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

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    eventHandlers.onMouseDown?.(e);
    stopPropagation(e);
  };

  const hasEditorChildren = React.Children.count(children) > 0;

  return (
    <div id="yopta-editor" onMouseDown={handleEmptyZoneClick}>
      {/* <OutsideClick onClose={hideToolbarTools}>
        <Toolbar toolbarRef={toolbarRef} toolbarStyle={toolbarStyle} editor={editor} />
      </OutsideClick> */}
      {hasEditorChildren &&
        React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return null;

          return React.cloneElement(child, {
            ...child.props,
            plugins,
            marks: marks.map((mark) => mark.type),
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

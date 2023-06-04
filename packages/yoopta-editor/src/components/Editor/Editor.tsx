import { Editor, Transforms, Range, Element, NodeEntry, Path } from 'slate';
import React, { useCallback, MouseEvent, useMemo, KeyboardEvent, ReactNode, useRef, ClipboardEvent } from 'react';
import { Editable, ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react';
import { TextLeaf } from './TextLeaf/TextLeaf';
import { getDefaultParagraphLine, getRenderFunctionFactory, isElementHasText, toggleMark } from './utils';
import { useScrollToElement } from '../../hooks/useScrollToElement';
import { useNodeElementSettings } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { ElementWrapper } from '../ElementWrapper/ElementWrapper';
import { HOTKEYS } from '../../utils/hotkeys';
import { ParentYooptaPlugin, YooptaPluginType } from '../../utils/plugins';
import { getElementByPath } from '../../utils/nodes';
import { EditorEventHandlers } from '../../types/eventHandlers';
import { generateId } from '../../utils/generateId';
import { YooptaMark } from '../../utils/marks';
import { YooEditor, YooptaBaseElement } from '../../types';
import { deepClone } from '../../utils/deepClone';
import { isKeyHotkey } from 'is-hotkey';
import { serializeHtml } from '../../utils/serializeHTML';
import { YooptaTools } from '../YooptaEditor/YooptaEditor';

type YooptaProps = {
  editor: YooEditor;
  placeholder?: string;
  readOnly?: boolean;
  plugins: ParentYooptaPlugin[];
  marks?: YooptaMark[];
  PLUGINS_MAP: Record<YooptaBaseElement<string>['type'], YooptaPluginType<any, YooptaBaseElement<string>>>;
  className?: string;
  tools?: YooptaTools;
};

// [TODO] - defaultNode move to common event handler to avoid repeated id's
const eventHandlersOptions = { hotkeys: HOTKEYS, defaultNode: getDefaultParagraphLine(generateId()) };

const EditorYoopta = ({
  editor,
  placeholder,
  marks,
  readOnly,
  plugins,
  className,
  PLUGINS_MAP,
  tools,
}: YooptaProps) => {
  useScrollToElement();
  const editorRef = useRef<HTMLDivElement>(null);
  const [{ disableWhileDrag, selectedNodeElement }, { changeHoveredNode }] = useNodeElementSettings();

  const isReadOnly = disableWhileDrag || readOnly;

  const renderElement = useMemo(() => {
    return (props: RenderElementProps) => {
      const plugin = PLUGINS_MAP[props.element.type];

      if (!plugin) return null;
      const renderFn = getRenderFunctionFactory(plugin)(editor, plugin);

      return (
        <ElementWrapper
          element={props.element}
          attributes={props.attributes}
          nodeType={props.element.nodeType}
          render={renderFn}
          HTMLAttributes={plugin.options?.HTMLAttributes}
        >
          {props.children}
        </ElementWrapper>
      );
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

      marks?.forEach((mark) => {
        if (props.leaf[mark.type]) {
          props.children = mark.render(props);
        }
      });

      let textPlaceholder: YooptaPluginType['placeholder'];
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

      const nodeEntry = Editor.above<YooptaBaseElement<string>>(editor, {
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

        // [TODO] - check if is inline node
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

      if (lastNode.type === 'paragraph' && lastNodeText.length === 0) {
        Transforms.select(editor, {
          path: location.anchor.path,
          offset: 0,
        });

        changeHoveredNode(lastNode);
        return ReactEditor.focus(editor);
      }

      const lineParagraph: YooptaBaseElement<'paragraph'> = getDefaultParagraphLine(generateId());
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

  const yooptaTools = useMemo(() => {
    if (!tools) return null;
    const hasEditorChildren = Object.keys(tools).length > 0;
    if (!hasEditorChildren) return null;

    return Object.keys(tools).map((toolkey) => {
      const tool = tools[toolkey] as ReactNode;
      const asChildren = typeof tool?.props?.asChildren === 'boolean' ? typeof tool?.props?.asChildren : true;

      const shouldRenderAsChildren = asChildren === true;
      if (!React.isValidElement(tool) || !shouldRenderAsChildren) return null;

      return React.cloneElement(tool, {
        key: toolkey,
        plugins,
        ...tool?.props,
      });
    });
  }, [tools]);

  const onCopy = (event: ClipboardEvent) => {
    if (!editor.selection) return;

    const selectedFragment = Editor.fragment(editor, editor.selection);
    const parsedHTML = serializeHtml(selectedFragment, editor.plugins);

    event.clipboardData.setData('text/html', parsedHTML);
    return event.clipboardData;
  };

  return (
    <div id="yoopta-editor" className={className} ref={editorRef} onMouseDown={handleEmptyZoneClick}>
      {yooptaTools}
      <Editable
        id="yoopta-contenteditable"
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        readOnly={isReadOnly}
        decorate={decorate}
        onCopy={onCopy}
        autoFocus
        spellCheck
        {...eventHandlers}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
      />
    </div>
  );
};

export { EditorYoopta };

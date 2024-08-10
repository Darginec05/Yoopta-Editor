import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { DefaultElement, Editable, ReactEditor, RenderElementProps, Slate } from 'slate-react';
import { useYooptaEditor, useBlockData } from '../contexts/YooptaContext/YooptaContext';
import { EVENT_HANDLERS } from '../handlers';
import { YooptaMark } from '../marks';

import { ExtendedLeafProps, PluginCustomEditorRenderProps, PluginEventHandlerOptions, Plugin } from './types';
import { EditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS } from '../utils/hotkeys';
import { Editor, Element, Node, NodeEntry, Path, Range, Transforms } from 'slate';
import { TextLeaf } from '../components/TextLeaf/TextLeaf';

import { generateId } from '../utils/generateId';
import { buildBlockData } from '../components/Editor/utils';

// [TODO] - test
import { withInlines } from './extenstions/withInlines';
import { IS_FOCUSED_EDITOR } from '../utils/weakMaps';
import { deserializeHTML } from '../parsers/deserializeHTML';
import { getRootBlockElementType } from '../utils/blockElements';
import { Elements } from '../editor/elements';

type Props<TKeys extends string, TProps, TOptions> = Plugin<TKeys, TProps, TOptions> & {
  id: string;
  marks?: YooptaMark<any>[];
  options: Plugin<TKeys, TProps, TOptions>['options'];
  placeholder?: string;
};

const getMappedElements = (elements) => {
  const mappedElements = {};
  Object.keys(elements).forEach((type) => (mappedElements[type] = elements[type].render));
  return mappedElements;
};

const getMappedMarks = (marks?: YooptaMark<any>[]) => {
  const mappedMarks = {};
  if (!marks) return mappedMarks;

  marks.forEach((mark) => (mappedMarks[mark.type] = mark));
  return mappedMarks;
};

const SlateEditorComponent = <TKeys extends string, TProps, TOptions>({
  id,
  customEditor,
  elements,
  marks,
  events,
  options,
  placeholder = `Type '/' for commands`,
}: Props<TKeys, TProps, TOptions>) => {
  const editor = useYooptaEditor();
  const block = useBlockData(id);
  const initialValue = useRef(block.value).current;

  const ELEMENTS_MAP = useMemo(() => getMappedElements(elements), [elements]);
  const MARKS_MAP = useMemo(() => getMappedMarks(marks), [marks]);

  const slate = useMemo(() => {
    let slateEditor = editor.blockEditorsMap[id];
    const { normalizeNode } = slateEditor;
    const elementTypes = Object.keys(elements);

    elementTypes.forEach((elementType) => {
      const nodeType = elements[elementType].props?.nodeType;

      const isInline = nodeType === 'inline';
      const isVoid = nodeType === 'void';
      const isInlineVoid = nodeType === 'inlineVoid';

      if (isInlineVoid) {
        slateEditor.markableVoid = (element) => element.type === elementType;
      }

      if (isVoid || isInlineVoid) {
        slateEditor.isVoid = (element) => element.type === elementType;
      }

      if (isInline || isInlineVoid) {
        slateEditor.isInline = (element) => element.type === elementType;

        // [TODO] - as test
        // [TODO] - should extend all slate editors for every block
        slateEditor = withInlines(editor, slateEditor);
      }
    });

    // This normalization is needed to validate the elements structure
    slateEditor.normalizeNode = (entry) => {
      const [node, path] = entry;
      const blockElements = editor.blocks[block.type].elements;

      // Normalize only `simple` block elements.
      // Simple elements are elements that have only one defined block element type.
      // [TODO] - handle validation for complex block elements
      if (Object.keys(blockElements).length > 1) {
        return normalizeNode(entry);
      }

      if (Element.isElement(node)) {
        const { type } = node;
        const rootElementType = getRootBlockElementType(blockElements);

        if (!elementTypes.includes(type)) {
          Transforms.setNodes(slateEditor, { type: rootElementType, props: { ...node.props } }, { at: path });
          return;
        }

        if (node.type === rootElementType) {
          for (const [child, childPath] of Node.children(slateEditor, path)) {
            if (Element.isElement(child) && !slateEditor.isInline(child)) {
              Transforms.unwrapNodes(slateEditor, { at: childPath });
              return;
            }
          }
        }
      }

      normalizeNode(entry);
    };

    return slateEditor;
  }, [elements, id]);

  const eventHandlers = useMemo<EditorEventHandlers>(() => {
    if (!events || editor.readOnly) return {};

    const eventHandlersOptions: PluginEventHandlerOptions = {
      hotkeys: HOTKEYS,
      currentBlock: block,
      defaultBlock: buildBlockData({ id: generateId() }),
    };
    const eventHandlersMap = {};

    Object.keys(events).forEach((eventType) => {
      eventHandlersMap[eventType] = function handler(event) {
        if (events[eventType]) {
          const handler = events[eventType](editor, slate, eventHandlersOptions);
          handler(event);
        }
      };
    });

    return eventHandlersMap;
  }, [events, editor, block]);

  const onChange = useCallback((value) => editor.updateBlock(id, { value }), [id]);

  const renderElement = useCallback(
    (elementProps: RenderElementProps) => {
      const ElementComponent = ELEMENTS_MAP[elementProps.element.type];
      const { attributes, ...props } = elementProps;
      attributes['data-element-type'] = props.element.type;

      let path;

      try {
        path = ReactEditor.findPath(slate, elementProps.element);
      } catch (error) {
        path = [];
      }

      if (!ElementComponent) return <DefaultElement {...props} attributes={attributes} />;

      return (
        <ElementComponent
          {...props}
          path={path}
          attributes={attributes}
          blockId={id}
          HTMLAttributes={options?.HTMLAttributes}
        />
      );
    },
    [elements, slate.children],
  );

  const renderLeaf = useCallback(
    (props: ExtendedLeafProps<any, any>) => {
      let { children, leaf, attributes } = props;
      const { text, ...formats } = leaf;

      const isBlockSelected = editor.selection?.[0] === block.meta.order;

      if (formats) {
        Object.keys(formats).forEach((format) => {
          const mark = MARKS_MAP[format];
          if (mark) children = mark.render({ children, leaf });
        });
      }

      const isParentElementVoid = props.children?.props?.parent?.props?.nodeType === 'void';
      const showPlaceholder = !isParentElementVoid && isBlockSelected && leaf.withPlaceholder;

      return (
        <TextLeaf attributes={attributes} placeholder={showPlaceholder ? placeholder : undefined}>
          {children}
        </TextLeaf>
      );
    },
    [marks],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (editor.readOnly) return;

      eventHandlers.onKeyDown?.(event);
      EVENT_HANDLERS.onKeyDown(editor)(event);
    },
    [eventHandlers.onKeyDown, editor.readOnly, editor.selection?.[0], block.meta.order],
  );

  const onKeyUp = useCallback(
    (event: React.KeyboardEvent) => {
      if (editor.readOnly) return;

      eventHandlers?.onKeyUp?.(event);
    },
    [eventHandlers.onKeyUp, editor.readOnly],
  );

  const onMouseDown = useCallback(
    (event: React.MouseEvent) => {
      if (editor.readOnly) return;

      if (editor.selection?.[0] !== block.meta.order) {
        editor.setSelection([block.meta.order]);
      }
      eventHandlers?.onMouseDown?.(event);
    },
    [eventHandlers.onMouseDown, editor.readOnly, editor.selection?.[0], block.meta.order],
  );

  const onBlur = useCallback(
    (event: React.FocusEvent) => {
      if (editor.readOnly) return;

      event.preventDefault();
      eventHandlers?.onBlur?.(event);
    },
    [eventHandlers.onBlur, editor.readOnly],
  );

  const onFocus = useCallback(
    (event: React.FocusEvent) => {
      if (editor.readOnly) return;

      if (!editor.isFocused()) {
        IS_FOCUSED_EDITOR.set(editor, true);
        // [TODO] - as test
        editor.emit('focus', true);
      }
      eventHandlers?.onFocus?.(event);
    },
    [eventHandlers.onFocus, editor.readOnly],
  );

  const onPaste = useCallback(
    (event: React.ClipboardEvent) => {
      if (editor.readOnly) return;

      eventHandlers?.onPaste?.(event);

      const data = event.clipboardData;
      const html = data.getData('text/html');

      const parsedHTML = new DOMParser().parseFromString(html, 'text/html');

      if (parsedHTML.body.childNodes.length > 0) {
        const blocks = deserializeHTML(editor, parsedHTML.body);

        // If no blocks from HTML, then paste as plain text using default behavior from Slate
        if (blocks.length > 0) {
          event.preventDefault();
          editor.insertBlocks(blocks, { at: editor.selection, focus: true });
          return;
        }
      }
    },
    [eventHandlers.onPaste, editor.readOnly],
  );

  const decorate = useCallback(
    (nodeEntry: NodeEntry) => {
      const ranges = [] as NodeEntry[] & { withPlaceholder?: boolean }[];
      if (editor.readOnly) return ranges;

      const [node, path] = nodeEntry;
      const isCurrent = editor.selection?.[0] === block.meta.order;

      if (slate.selection && isCurrent) {
        if (
          !Editor.isEditor(node) &&
          Editor.string(slate, [path[0]]) === '' &&
          Range.includes(slate.selection, path) &&
          Range.isCollapsed(slate.selection)
        ) {
          ranges.push({
            ...slate.selection,
            withPlaceholder: true,
          });
        }
      }

      return ranges;
    },
    [editor.readOnly, editor.selection?.[0], block.meta.order],
  );

  return (
    <SlateEditorInstance
      id={id}
      slate={slate}
      initialValue={initialValue}
      onChange={onChange}
      decorate={decorate}
      renderLeaf={renderLeaf}
      renderElement={renderElement}
      eventHandlers={eventHandlers}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onFocus={onFocus}
      onMouseDown={onMouseDown}
      onBlur={onBlur}
      customEditor={customEditor}
      readOnly={editor.readOnly}
      onPaste={onPaste}
    />
  );
};

type SlateEditorInstanceProps = {
  id: string;
  slate: any;
  readOnly: boolean;
  initialValue: any;
  onChange: (value: any) => void;
  renderLeaf: (props: ExtendedLeafProps<any, any>) => JSX.Element;
  renderElement: (props: RenderElementProps) => JSX.Element;
  eventHandlers: EditorEventHandlers;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onKeyUp: (event: React.KeyboardEvent) => void;
  onFocus: (event: React.FocusEvent) => void;
  onMouseDown: (event: React.MouseEvent) => void;
  onBlur: (event: React.FocusEvent) => void;
  onPaste: (event: React.ClipboardEvent) => void;
  customEditor?: (props: PluginCustomEditorRenderProps) => JSX.Element;
  decorate: (nodeEntry: NodeEntry) => any[];
};

// [TODO] - no need memo
const SlateEditorInstance = memo<SlateEditorInstanceProps>(
  ({
    id,
    slate,
    initialValue,
    onChange,
    renderLeaf,
    renderElement,
    eventHandlers,
    onKeyDown,
    onKeyUp,
    onFocus,
    onMouseDown,
    onBlur,
    onPaste,
    customEditor,
    decorate,
    readOnly,
  }) => {
    if (typeof customEditor === 'function') {
      return customEditor({ blockId: id });
    }

    return (
      <Slate key={`slate-${id}`} editor={slate} initialValue={initialValue} onChange={onChange}>
        <Editable
          key={`editable-${id}`}
          id={`yoopta-slate-editor-${id}`}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className="yoopta-slate"
          spellCheck
          {...eventHandlers}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onFocus={onFocus}
          onMouseDown={onMouseDown}
          decorate={decorate}
          // [TODO] - carefully check onBlur, e.x. transforms using functions, e.x. highlight update
          onBlur={onBlur}
          readOnly={readOnly}
          onPaste={onPaste}
        />
      </Slate>
    );
  },
);

SlateEditorInstance.displayName = 'SlateEditorInstance';

export { SlateEditorComponent };

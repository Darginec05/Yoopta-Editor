import React, { memo, useMemo, useRef } from 'react';
import { Editable, RenderElementProps, Slate } from 'slate-react';
import { useYooptaEditor, useBlockData } from '../contexts/YooptaContext/YooptaContext';
import { EVENT_HANDLERS } from '../handlers';
import { YooptaMark } from '../marks';

import { ExtendedLeafProps, PluginCustomEditorRenderProps, PluginEventHandlerOptions, Plugin } from './types';
import { EditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS } from '../utils/hotkeys';
import { Editor, NodeEntry, Range } from 'slate';
import { TextLeaf } from '../components/TextLeaf/TextLeaf';

import { generateId } from '../utils/generateId';
import { buildBlockData } from '../components/Editor/utils';

// [TODO] - test
import { withInlines } from './extenstions/withInlines';
import { parsers } from '../parsers';

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
  const type = block.type;

  const ELEMENTS_MAP = useMemo(() => getMappedElements(elements), [elements]);
  const MARKS_MAP = useMemo(() => getMappedMarks(marks), [marks]);

  const slate = useMemo(() => {
    let slateEditor = editor.blockEditorsMap[id];
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
        slateEditor = withInlines(slateEditor);
      }
    });

    return slateEditor;
  }, []);

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

  const onChange = (value) => editor.updateBlock(id, { value });

  const renderElement = (props: RenderElementProps) => {
    const ElementComponent = ELEMENTS_MAP[props.element.type];

    if (!ElementComponent) return <></>;
    return <ElementComponent {...props} blockId={id} options={options} />;
  };

  const renderLeaf = (props: ExtendedLeafProps<any, any>) => {
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
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (editor.readOnly) return;

    eventHandlers.onKeyDown?.(event);
    EVENT_HANDLERS.onKeyDown(editor)(event);
  };

  const onKeyUp = (event: React.KeyboardEvent) => {
    if (editor.readOnly) return;

    eventHandlers?.onKeyUp?.(event);
  };

  const onClick = (event: React.MouseEvent) => {
    if (editor.readOnly) return;

    if (editor.selection?.[0] !== block.meta.order) {
      editor.setSelection([block.meta.order]);
    }
    eventHandlers?.onClick?.(event);
  };

  const onBlur = (event: React.FocusEvent) => {
    if (editor.readOnly) return;

    event.preventDefault();
    eventHandlers?.onBlur?.(event);
  };

  const onFocus = (event: React.FocusEvent) => {
    if (editor.readOnly) return;

    eventHandlers?.onFocus?.(event);
  };

  const onPaste = (event: React.ClipboardEvent) => {
    if (editor.readOnly) return;

    eventHandlers?.onPaste?.(event);

    const data = event.clipboardData;
    // const text = data.getData('text/plain');

    const html = data.getData('text/html');
    const parsedHTML = new DOMParser().parseFromString(html, 'text/html');

    if (parsedHTML.body.childNodes.length > 0) {
      event.preventDefault();
      const blocks = parsers.html.deserialize(editor, parsedHTML.body);

      if (blocks.length > 0) {
        editor.insertBlocks(blocks, { at: editor.selection, focus: true });
        return;
      }
    }
  };

  const onCopy = (event: React.ClipboardEvent) => {
    if (editor.readOnly) return;

    eventHandlers?.onCopy?.(event);
  };

  const decorate = (nodeEntry: NodeEntry) => {
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
  };

  return (
    <div data-plugin-id={id} data-plugin-type={type}>
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
        onClick={onClick}
        onBlur={onBlur}
        customEditor={customEditor}
        readOnly={editor.readOnly}
        onPaste={onPaste}
        onCopy={onCopy}
      />
    </div>
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
  onClick: (event: React.MouseEvent) => void;
  onBlur: (event: React.FocusEvent) => void;
  onPaste: (event: React.ClipboardEvent) => void;
  onCopy: (event: React.ClipboardEvent) => void;
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
    onClick,
    onBlur,
    onPaste,
    customEditor,
    decorate,
    readOnly,
  }) => {
    if (typeof customEditor === 'function') {
      return customEditor({
        blockId: id,
      });
    }

    return (
      <Slate key={`slate-${id}`} editor={slate} initialValue={initialValue} onChange={onChange}>
        <Editable
          key={`editable-${id}`}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          className="focus-visible:outline-none focus:outline-none"
          spellCheck
          {...eventHandlers}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onFocus={onFocus}
          onClick={onClick}
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

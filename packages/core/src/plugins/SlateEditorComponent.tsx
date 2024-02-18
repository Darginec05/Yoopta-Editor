import { useCallback, useMemo, useRef } from 'react';
import { Editable, ReactEditor, RenderElementProps, Slate } from 'slate-react';
import { useYooptaEditor, useYooptaPlugin } from '../contexts/UltraYooptaContext/UltraYooptaContext';
import { EVENT_HANDLERS } from '../handlers';
import { YooptaMark } from '../textFormatters/createYooptaMark';
import { withInlines } from './extenstions/withInlines';
import { ExtendedLeafProps, PluginParams } from './types';
import { EditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS } from '../utils/hotkeys';
import { useTools } from '../contexts/UltraYooptaContext/ToolsContext';

type Props<T> = PluginParams<T> & { id: string; marks?: YooptaMark<any>[] };

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

const SlateEditorComponent = <T,>({ id, customEditor, elements, marks, events }: Props<T>) => {
  const editor = useYooptaEditor();
  const plugin = useYooptaPlugin(id);
  const initialValue = useRef(plugin.value).current;
  const type = plugin.type;

  const { tools } = useTools();

  const ELEMENTS_MAP = useMemo(() => getMappedElements(elements), [elements]);
  const MARKS_MAP = useMemo(() => getMappedMarks(marks), [marks]);

  const slate = useMemo(() => {
    let slateEditor = editor.blockEditorsMap[id];
    const elementTypes = Object.keys(elements);

    elementTypes.forEach((elementType) => {
      const nodeType = elements[elementType].options?.nodeType;

      const isInline = nodeType === 'inline';
      const isVoid = nodeType === 'void';
      const isInlineVoid = Array.isArray(nodeType) && nodeType.includes('inline') && nodeType.includes('void');

      if (isInlineVoid) {
        slateEditor.markableVoid = (element) => element.type === elementType;
      }

      if (isVoid || isInlineVoid) slateEditor.isVoid = (element) => element.type === elementType;
      if (isInline || isInlineVoid) {
        slateEditor.isInline = (element) => element.type === elementType;

        // [TODO] - as test
        slateEditor = withInlines(slateEditor);
      }
    });

    return slateEditor;
  }, []);

  const eventHandlers = useMemo<EditorEventHandlers>(() => {
    if (!events) return {};

    const eventHandlersOptions = { hotkeys: HOTKEYS };
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
  }, [events, editor]);

  const onChange = useCallback((data) => {
    editor.updateBlock(id, data);
  }, []);

  if (typeof customEditor === 'function') {
    return customEditor({
      id,
      type,
      editor: slate,
    });
  }

  const renderElement = (props: RenderElementProps) => {
    const ElementComponent = ELEMENTS_MAP[props.element.type];

    if (!ElementComponent) return <></>;
    return <ElementComponent {...props} />;
  };

  const renderLeaf = (props: ExtendedLeafProps<any, any>) => {
    let { children, leaf, attributes } = props;
    const { text, ...formats } = leaf;

    if (formats) {
      Object.keys(formats).forEach((format) => {
        const mark = MARKS_MAP[format];
        if (mark) children = mark.render({ children, leaf });
      });
    }

    return <span {...attributes}>{children}</span>;
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const { events, ...options } = tools.actionMenu;
    events.onKeyDown(editor, slate, options)(event);
    eventHandlers.onKeyDown?.(event);
    EVENT_HANDLERS.onKeyDown(editor, slate)(event);
  };

  const onKeyUp = (event: React.KeyboardEvent) => {
    const { events, ...options } = tools.actionMenu;
    events.onKeyUp(editor, slate, options)(event);
  };

  const onBlur = () => {
    ReactEditor.deselect(slate);
    ReactEditor.blur(slate);
  };

  const onFocus = (event: React.FocusEvent) => {
    editor.setSelection([plugin.meta.order]);
  };

  return (
    <div data-plugin-id={id} data-plugin-type={type}>
      <Slate editor={slate} initialValue={initialValue} onChange={onChange}>
        <Editable
          renderElement={renderElement}
          // placeholder="Enter some rich text…"
          renderLeaf={renderLeaf}
          className="focus-visible:outline-none"
          spellCheck
          {...eventHandlers}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          // [TODO] - carefully check onBlur, e.x. transforms using functions, e.x. highlight update
          // onBlur={onBlur}
          onFocus={onFocus}
        />
      </Slate>
    </div>
  );
};

export { SlateEditorComponent };

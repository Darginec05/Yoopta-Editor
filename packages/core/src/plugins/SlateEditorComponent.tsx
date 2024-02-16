import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Editable, ReactEditor, RenderElementProps, Slate } from 'slate-react';
import { useYooptaEditor, useYooptaPlugin } from '../contexts/UltraYooptaContext/UltraYooptaContext';
import { EVENT_HANDLERS } from '../handlers';
import { YooptaMark } from '../textFormatters/createYooptaMark';
import { withInlines } from './extenstions/withInlines';
import { ExtendedLeafProps, PluginParams } from './types';
import { EditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS } from '../utils/hotkeys';
import { ActionMenuList } from '../tools/ActionMenuList';

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
  const [menuList, setMenuList] = useState<{ open: boolean; style: CSSProperties } | null>(null);

  const yooEditor = useYooptaEditor();
  const plugin = useYooptaPlugin(id);
  const initialValue = useRef(plugin.value).current;
  const type = plugin.type;

  const ELEMENTS_MAP = useMemo(() => getMappedElements(elements), [elements]);
  const MARKS_MAP = useMemo(() => getMappedMarks(marks), [marks]);

  const slate = useMemo(() => {
    let slateEditor = yooEditor.blockEditorsMap[id];
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
          const handler = events[eventType](yooEditor, slate, eventHandlersOptions);
          handler(event);
        }
      };
    });

    return eventHandlersMap;
  }, [events, yooEditor]);

  const onChange = useCallback((data) => {
    yooEditor.updateBlock(id, data);
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
    if (event.key === '/') {
      const domSelection = window.getSelection();
      if (!domSelection) return;

      const range = domSelection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const style = {
        top: `${rect.top + window.scrollY + rect.height + 5}px`,
        left: `${rect.left + window.scrollX}px`,
      };

      // event.preventDefault();
      setMenuList((prev) => ({
        open: !prev?.open,
        style,
      }));
    }

    if (event.key === 'Escape') setMenuList(null);

    eventHandlers.onKeyDown?.(event);
    EVENT_HANDLERS.onKeyDown(yooEditor, slate)(event);
  };

  const onBlur = () => {
    ReactEditor.deselect(slate);
    ReactEditor.blur(slate);
  };

  const onFocus = (event: React.FocusEvent) => {
    yooEditor.setSelection([plugin.meta.order]);
  };

  return (
    <div data-plugin-id={id} data-plugin-type={type}>
      <Slate editor={slate} initialValue={initialValue} onChange={onChange}>
        <Editable
          renderElement={renderElement}
          // onKeyUp={(event) => console.log('onKEYUP', event.key)}
          // placeholder="Enter some rich text…"
          renderLeaf={renderLeaf}
          className="focus-visible:outline-none"
          spellCheck
          {...eventHandlers}
          onKeyDown={onKeyDown}
          // [TODO] - carefully check onBlur, e.x. transforms using functions, e.x. highlight update
          // onBlur={onBlur}
          onFocus={onFocus}
        />
        <ActionMenuList style={menuList?.style} isOpen={menuList?.open} onChangeOpen={() => setMenuList(null)} />
      </Slate>
    </div>
  );
};

export { SlateEditorComponent };

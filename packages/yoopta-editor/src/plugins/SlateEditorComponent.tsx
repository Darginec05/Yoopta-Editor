import { useCallback, useMemo, useRef } from 'react';
import { DefaultLeaf, Editable, RenderElementProps, RenderLeafProps, Slate } from 'slate-react';
import { useYooptaEditor, useYooptaPlugin } from '../contexts/UltraYooptaContext/UltraYooptaContext';
import { EVENT_HANDLERS } from '../handlers';
import { YooptaMark } from '../textFormatters/createYooptaMark';
import { withInlines } from './extensions';
import { ExtendedLeafProps, PluginParams } from './types';

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

const SlateEditorComponent = <T,>({ id, customEditor, elements, marks }: Props<T>) => {
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
      const isInline = elements[elementType].options?.isInline;
      const isVoid = elements[elementType].options?.isVoid;
      if (isVoid) slateEditor.isVoid = (element) => element.type === elementType;
      if (isInline) {
        slateEditor.isInline = (element) => element.type === elementType;
        // [TODO] - as test
        slateEditor = withInlines(slateEditor);
      }
    });

    return slateEditor;
  }, []);

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

  return (
    <div data-plugin-id={id} data-plugin-type={type}>
      <Slate editor={slate} initialValue={initialValue} onChange={onChange}>
        <Editable
          renderElement={renderElement}
          onKeyDown={EVENT_HANDLERS.onKeyDown(yooEditor, slate)}
          placeholder="Enter some rich text…"
          renderLeaf={renderLeaf}
        />
      </Slate>
    </div>
  );
};

export { SlateEditorComponent };

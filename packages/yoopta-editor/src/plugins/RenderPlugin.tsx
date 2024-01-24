import { useCallback, useMemo, useRef } from 'react';
import { Editable, RenderElementProps, Slate } from 'slate-react';
import { useYooptaEditor, useYooptaPlugin } from '../contexts/UltraYooptaContext/UltraYooptaContext';
import { EVENT_HANDLERS } from '../handlers';
import { withInlines } from './extensions';
import { PluginParams } from './types';

type Props<T> = PluginParams<T> & { id: string };

const getMappedElements = (elements) => {
  const mappedElements = {};
  Object.keys(elements).forEach((type) => (mappedElements[type] = elements[type].component));
  return mappedElements;
};

const RenderPlugin = <T,>({ id, render, customEditor, elements }: Props<T>) => {
  const yooEditor = useYooptaEditor();
  const plugin = useYooptaPlugin(id);
  const initialValue = useRef(plugin.value).current;
  const type = plugin.type;

  const ELEMENTS_MAP = useMemo(() => getMappedElements(elements), [elements]);

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

  return (
    <div data-plugin-id={id} data-plugin-type={type}>
      <Slate editor={slate} initialValue={initialValue} onChange={onChange}>
        <Editable
          renderElement={renderElement}
          onKeyDown={EVENT_HANDLERS.onKeyDown(yooEditor, slate)}
          placeholder="Enter some rich text…"
        />
      </Slate>
    </div>
  );
};

export { RenderPlugin };

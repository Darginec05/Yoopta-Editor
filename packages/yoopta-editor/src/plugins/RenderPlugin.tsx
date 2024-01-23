import { useCallback, useMemo, useRef } from 'react';
import { Editable, RenderElementProps, Slate } from 'slate-react';
import { useYooptaEditor, useYooptaPlugin } from '../contexts/UltraYooptaContext/UltraYooptaContext';
import { EVENT_HANDLERS } from '../handlers';

const RenderPlugin = ({ id, render, customEditor, options }) => {
  const yooEditor = useYooptaEditor();
  const plugin = useYooptaPlugin(id);
  const initialValue = useRef(plugin.value).current;
  const type = plugin.type;

  const slate = useMemo(() => {
    const slateEditor = yooEditor.blockEditorsMap[id];
    if (options?.isVoid) slateEditor.isVoid = (element) => element.type === type;
    if (options?.isInline) slateEditor.isInline = (element) => element.type === type;

    return slateEditor;
  }, []);

  const onChange = useCallback((data) => {
    yooEditor.updateBlock(id, data);
  }, []);

  if (typeof customEditor === 'function') {
    return customEditor({
      id,
      type,
      value: initialValue,
      editor: slate,
      onChange,
    });
  }

  const renderElement = (props: RenderElementProps) => render(props);

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

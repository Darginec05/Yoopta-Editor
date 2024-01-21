import { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, RenderElementProps, Slate, withReact } from 'slate-react';
import { useYooptaEditor, useYooptaPlugin } from './contexts/UltraYooptaContext/UltraYooptaContext';
import { EVENT_HANDLERS } from './handlers';
import { UltraPlugin, UltraPluginBaseParam } from './types';

const RenderPlugin = ({ id, render, customEditor, options }) => {
  const yooEditor = useYooptaEditor();
  const plugin = useYooptaPlugin(id);
  const [value, setValue] = useState(plugin.value);
  const type = plugin.type;

  const slate = useMemo(() => {
    if (yooEditor.blockEditorsMap[id]) return yooEditor.blockEditorsMap[id];

    const editor = withHistory(withReact(createEditor()));
    if (options?.isVoid) {
      editor.isVoid = (element) => element.type === type;
    }
    return editor;
  }, []);

  if (typeof customEditor === 'function') {
    return customEditor({
      id,
      type,
      value,
      editor: slate,
    });
  }

  // [TODO]
  const renderElement = (props: RenderElementProps) => render(props);

  return (
    <div data-plugin-id={id} data-plugin-type={type}>
      <Slate editor={slate} initialValue={value}>
        <Editable
          renderElement={renderElement}
          onKeyDown={EVENT_HANDLERS.onKeyDown(yooEditor, slate)}
          placeholder="Enter some rich text…"
        />
      </Slate>
    </div>
  );
};

export function createUltraPlugin<T>(plugin: UltraPluginBaseParam<T>): UltraPlugin {
  return {
    type: plugin.type,
    renderPlugin: (props) => {
      const { customEditor, render, options } = plugin;

      return (
        <RenderPlugin key={props.id} id={props.id} options={options} customEditor={customEditor} render={render} />
      );
    },
  };
}

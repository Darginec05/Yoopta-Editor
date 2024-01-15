import { useEffect, useMemo, useRef } from 'react';
import { createEditor, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, ReactEditor, RenderElementProps, Slate, withReact } from 'slate-react';
import { useYooptaEditor } from './contexts/UltraYooptaContext/UltraYooptaContext';
import { EVENT_HANDLERS } from './handlers';
import { UltraPlugin, UltraPluginBaseParam } from './types';
import { PLUGIN_EDITOR_TO_ELEMENT } from './utils';

const RenderPlugin = ({ id, value, onChange, type, render, customEditor, options = {}, selection }) => {
  const yooEditor = useYooptaEditor();
  const slateEditor = useMemo(() => {
    const editor = withHistory(withReact(createEditor()));
    if (options.isVoid) {
      editor.isVoid = (element) => element.type === type;
    }

    return editor;
  }, []);

  const handleChange = (updatedValue) => onChange(id, updatedValue);
  const key = `${type}-${id}`;

  if (typeof customEditor === 'function') {
    return customEditor({
      id,
      type,
      value,
      onChange,
      editor: slateEditor,
    });
  }

  // [TODO]
  const renderElement = (props: RenderElementProps) => render(props);

  useEffect(() => {
    if (!yooEditor.pluginsEditorMap[id]) yooEditor.pluginsEditorMap[id] = slateEditor;
  });

  return (
    <div data-plugin-id={id} data-plugin-type={type}>
      <Slate editor={slateEditor} initialValue={value} onChange={handleChange} key={key}>
        <Editable
          key={key}
          renderElement={renderElement}
          onKeyDown={EVENT_HANDLERS.onKeyDown(yooEditor, slateEditor)}
          placeholder="Enter some rich text…"
        />
      </Slate>
    </div>
  );
};

export function createUltraPlugin<T>(plugin: UltraPluginBaseParam<T>): UltraPlugin {
  return {
    type: plugin.type,
    // renderPlugin: ({ id, value, onChange }) => {},
    renderPlugin: (props) => <RenderPlugin {...props} {...plugin} />,
  };
}

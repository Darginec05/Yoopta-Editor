import { useMemo } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, RenderElementProps, Slate, withReact } from 'slate-react';
import { onKeyDown } from './handlers';
import { UltraPlugin, UltraPluginParams } from './types';

export function createUltraPlugin({ type, render, customEditor, options = {} }: UltraPluginParams): UltraPlugin {
  return {
    type,
    renderPlugin: ({ id, value, onChange }) => {
      const editor = useMemo(() => withHistory(withReact(createEditor())), []);
      const handleChange = (updatedValue) => onChange(id, updatedValue);

      const key = `${type}-${id}`;

      if (typeof customEditor === 'function') {
        return customEditor({
          id,
          type,
          value,
          editor,
          onChange,
        });
      }

      // [TODO]
      const renderElement = (props: RenderElementProps) => render(props);

      return (
        <Slate editor={editor} initialValue={value} onChange={handleChange} key={key}>
          <Editable
            key={key}
            data-plugin-id={id}
            data-plugin-type={type}
            renderElement={renderElement}
            onKeyDown={(event) => onKeyDown(event, editor)}
          />
        </Slate>
      );
    },
  };
}

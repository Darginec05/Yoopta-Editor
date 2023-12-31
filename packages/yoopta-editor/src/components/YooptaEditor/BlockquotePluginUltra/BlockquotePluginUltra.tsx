import { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import { YooEditor } from '../../../types';
import { onKeyDown } from '../handlers';
import { UltraPlugin, UltraPluginProps } from '../types';

const BlockquotePluginUltraRender = ({ id, value, onChange }: UltraPluginProps) => {
  // const [blockValue, setBlockValue] = useState(value);

  const editor = useMemo<YooEditor>(() => {
    return withHistory(withReact(createEditor()));
  }, []);

  const renderElement = (props) => {
    return (
      <blockquote data-element-type="BlockquotePluginUltra" {...props.attributes}>
        {props.children}
      </blockquote>
    );
  };

  const handleChange = (updatedValue) => onChange(id, updatedValue);

  return (
    <Slate editor={editor} initialValue={value} onChange={handleChange} key="blockquote">
      <Editable
        key="blockquote-editable"
        renderElement={renderElement}
        onKeyDown={(event) => onKeyDown(event, editor)}
      />
    </Slate>
  );
};

const BlockquotePluginUltra: UltraPlugin = {
  type: 'blockquote',
  render: BlockquotePluginUltraRender,
};

export { BlockquotePluginUltra };

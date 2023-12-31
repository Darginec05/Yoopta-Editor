import { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Editable, Slate, withReact } from 'slate-react';
import { YooEditor } from '../../../types';
import { onKeyDown } from '../handlers';
import { UltraPlugin, UltraPluginProps } from '../types';

const ParagraphPluginUltraRender = ({ id, value, onChange }: UltraPluginProps) => {
  // const [blockValue, setBlockValue] = useState(value);
  const editor = useMemo<YooEditor>(() => withHistory(withReact(createEditor())), []);

  const renderElement = (props) => {
    return (
      <p data-element-type="ParagraphPluginUltra" {...props.attributes}>
        {props.children}
      </p>
    );
  };

  const handleChange = (updateValue) => onChange(id, updateValue);

  return (
    <Slate editor={editor} initialValue={value} onChange={handleChange} key="paragraph">
      <Editable
        key="paragraph-editable"
        renderElement={renderElement}
        onKeyDown={(event) => onKeyDown(event, editor)}
        // className={className}
        // onKeyDown={onKeyDown}
        // style={EDITOR_STYLES}
      />
    </Slate>
  );
};

const ParagraphPluginUltra: UltraPlugin = {
  type: 'paragraph',
  render: ParagraphPluginUltraRender,
};

export { ParagraphPluginUltra };

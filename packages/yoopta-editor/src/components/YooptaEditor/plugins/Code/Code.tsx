import { useCallback, useState } from 'react';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-theme-github';
import { createUltraPlugin } from '../../ultraPlugins';

const Code = createUltraPlugin({
  type: 'code',
  customEditor: ({ id, type, value, editor, onChange }) => {
    const [codeEditorValue, setCodeEditorValue] = useState(value?.[0].children?.[0].text || '');

    const handleChange = useCallback((codeTextValue, viewUpdate) => {
      const updateValue = {
        type,
        children: [{ text: codeTextValue }],
      };

      editor.children = [updateValue];

      onChange(id, [updateValue]);
      setCodeEditorValue(codeTextValue);
    }, []);

    return (
      <div data-element-type="CodePluginUltra">
        <CodeMirror
          value={codeEditorValue}
          height="500px"
          extensions={[javascript({ jsx: true })]}
          onChange={handleChange}
          theme={githubDark}
        />
      </div>
    );
  },
  options: {
    isVoid: true,
  },
});

export { Code };

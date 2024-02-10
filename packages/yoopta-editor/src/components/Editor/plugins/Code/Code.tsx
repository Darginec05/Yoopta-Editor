import { useCallback, useState } from 'react';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-theme-github';
import { useYooptaEditor, useYooptaPlugin } from '../../../../contexts/UltraYooptaContext/UltraYooptaContext';
import { createYooptaPlugin } from '../../../../plugins';
import { CustomEditorProps } from '../../../../plugins/types';

// [TODO] - fix logic with update values
const CodeEditor = ({ id, type }: CustomEditorProps) => {
  const plugin = useYooptaPlugin(id);
  const [codeEditorValue, setCodeEditorValue] = useState(plugin.value?.[0].children?.[0].text || '');
  const yooEditor = useYooptaEditor();

  const handleChange = useCallback((codeTextValue, viewUpdate) => {
    const updateValue = {
      ...plugin.value[0],
      type,
      children: [{ text: codeTextValue }],
    };

    // [TODO] - Fix this
    yooEditor.updateBlock(id, updateValue);
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
};

const Code = createYooptaPlugin({
  type: 'CodePlugin',
  customEditor: CodeEditor,
  elements: {
    code: {
      render: CodeEditor,
      options: {
        nodeType: 'void',
      },
    },
  },
});

export { Code };

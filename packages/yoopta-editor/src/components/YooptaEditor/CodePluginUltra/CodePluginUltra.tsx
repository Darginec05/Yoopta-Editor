import { useCallback, useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { YooEditor } from '../../../types';
import { UltraPlugin, UltraPluginProps } from '../types';

import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-theme-github';

const withVoid = (editor) => {
  editor.isVoid = (element) => {
    return true;
  };

  return editor;
};

const CodePluginUltraRender = ({ value }: UltraPluginProps) => {
  const [blockValue, setBlockValue] = useState(value);
  const [codeEditorValue, setCodeEditorValue] = useState(value?.[0].children?.[0].text || '');

  const editor = useMemo<YooEditor>(() => {
    return withVoid(withHistory(withReact(createEditor())));
  }, []);

  const onChange = useCallback((codeTextValue, viewUpdate) => {
    editor.children[0] = {
      type: 'code',
      children: [{ text: codeTextValue }],
    };
    setCodeEditorValue(codeTextValue);
    setBlockValue(editor.children);
  }, []);

  return (
    <div data-element-type="CodePluginUltra">
      <CodeMirror
        value={codeEditorValue}
        height="400px"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
        theme={githubDark}
      />
    </div>
  );
};

const CodePluginUltra: UltraPlugin = {
  type: 'code',
  render: CodePluginUltraRender,
};

export { CodePluginUltra };

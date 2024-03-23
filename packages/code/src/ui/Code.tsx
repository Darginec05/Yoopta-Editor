import { useBlockData, useYooptaEditor, PluginCustomEditorRenderProps, useYooptaReadOnly } from '@yoopta/editor';
import CodeMirror, { BasicSetupOptions } from '@uiw/react-codemirror/esm/index';

import { useState } from 'react';
import { themes } from '../utils/themes';
import { CodeBlockOptions } from './CodeBlockOptions';
import { LANGUAGES } from '../utils/languages';
import { CodeElement } from '../types';
import { getCodeElement, getCodeElementText } from '../utils/element';

const codeMirrorSetup: BasicSetupOptions = {
  lineNumbers: false,
  autocompletion: false,
  foldGutter: false,
  highlightActiveLineGutter: false,
  highlightActiveLine: false,
};

const CodeEditor = ({ blockId }: PluginCustomEditorRenderProps) => {
  const editor = useYooptaEditor();
  const isReadOnly = useYooptaReadOnly();
  const block = useBlockData(blockId);
  const [code, setCode] = useState(() => getCodeElementText(block) || '');

  const element = getCodeElement(block) as CodeElement;

  const theme = element.props?.theme || 'VSCode';
  const language = element.props?.language || 'JavaScript';

  const onChange = (value: string) => {
    setCode(value);
    editor.updateBlock(blockId, { value: [{ ...element, children: [{ text: value }] }] });
  };

  const onClick = () => {
    if (isReadOnly) return;

    if (editor.selection?.[0] !== block.meta.order) {
      editor.setSelection([block.meta.order]);
    }
  };

  return (
    <div
      data-element-type="Code"
      data-custom-editor
      className="yoo-code-rounded-md yoo-code-mt-2 yoo-code-p-0 yoopta-code"
    >
      <div contentEditable={false}>
        <CodeMirror
          value={code}
          height="auto"
          extensions={[LANGUAGES[language]]}
          onChange={onChange}
          width="100%"
          theme={themes[theme]}
          className="yoopta-code-cm-editor"
          basicSetup={codeMirrorSetup}
          editable={!isReadOnly}
          readOnly={isReadOnly}
          onClick={onClick}
        />
      </div>
      {/* {!isReadOnly && <CodeBlockOptions block={block} editor={editor} element={element} />} */}
    </div>
  );
};

export { CodeEditor };

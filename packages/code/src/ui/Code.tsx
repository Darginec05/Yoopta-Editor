import {
  useBlockData,
  useYooptaEditor,
  PluginCustomEditorRenderProps,
  useYooptaReadOnly,
  buildBlockData,
  generateId,
} from '@yoopta/editor';
import { KeyboardEvent, useRef, useState } from 'react';
import { themes } from '../utils/themes';
import { LANGUAGES } from '../utils/languages';
import { CodeElement } from '../types';
import { getCodeElement, getCodeElementText } from '../utils/element';
import { useCodeMirror } from '../library/hooks';
import { CodeBlockOptions } from './CodeBlockOptions';

const codeMirrorSetup: any = {
  lineNumbers: false,
  autocompletion: false,
  foldGutter: false,
  highlightActiveLineGutter: false,
  highlightActiveLine: false,
};

const ReactCodeMirror = ({ extensions, className, value = '', onChange, ...props }) => {
  const editor = useRef<HTMLDivElement>(null);

  const { state, view, container } = useCodeMirror({
    // root,
    // autoFocus,
    // theme,
    // height,
    // minHeight,
    // maxHeight,
    // width,
    // minWidth,
    // maxWidth,
    // basicSetup,
    // placeholder,
    // indentWithTab,
    // editable,
    // readOnly,
    // selection,
    // onStatistics,
    // onCreateEditor,
    // onUpdate,
    // initialState,
    container: editor.current,
    value,
    onChange,
    extensions,
    ...props,
  });

  console.log('ReactCodeMirror editor', { editor, container, state, view });

  return <div ref={editor} className={className} />;
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
        <ReactCodeMirror
          value={code}
          height="auto"
          width="100%"
          extensions={[LANGUAGES[language]]}
          onChange={onChange}
          theme={themes[theme]}
          className="yoopta-code-cm-editor"
          basicSetup={codeMirrorSetup}
          editable={!isReadOnly}
          readOnly={isReadOnly}
          onClick={onClick}
          onKeyDown={(event: KeyboardEvent) => {
            const isShiftEnter = event.shiftKey && event.keyCode === 13;

            if (isShiftEnter) {
              event.preventDefault();
              const defaultBlock = buildBlockData({ id: generateId() });
              const nextPath = [block.meta.order + 1] as [number];

              editor.insertBlock(defaultBlock, { at: nextPath, focus: true });
            }
          }}
        />
      </div>
      {!isReadOnly && <CodeBlockOptions block={block} editor={editor} element={element} />}
    </div>
  );
};

export { CodeEditor };

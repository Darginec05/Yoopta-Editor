import {
  useBlockData,
  useYooptaEditor,
  PluginCustomEditorRenderProps,
  useYooptaReadOnly,
  buildBlockData,
  generateId,
} from '@yoopta/editor';
import { KeyboardEvent, useRef, useState } from 'react';
// import { themes } from '../utils/themes';
// import { LANGUAGES } from '../utils/languages';
import { CodeElement } from '../types';
import { getCodeElement, getCodeElementText } from '../utils/element';
// import { useCodeMirror } from '../library/hooks';
// import { CodeBlockOptions } from './CodeBlockOptions';
import CodeTextEditor from '@uiw/react-textarea-code-editor';

// const codeMirrorSetup: any = {
//   lineNumbers: false,
//   autocompletion: false,
//   foldGutter: false,
//   highlightActiveLineGutter: false,
//   highlightActiveLine: false,
// };

// const ReactCodeMirror = (props: any) => {
//   const {
//     className,
//     value = '',
//     selection,
//     extensions = [],
//     onChange,
//     onStatistics,
//     onCreateEditor,
//     onUpdate,
//     autoFocus,
//     theme = 'light',
//     height,
//     minHeight,
//     maxHeight,
//     width,
//     minWidth,
//     maxWidth,
//     basicSetup,
//     placeholder,
//     indentWithTab,
//     editable,
//     readOnly,
//     root,
//     initialState,
//     ...other
//   } = props;
//   const codeMirrorRef = useRef<HTMLDivElement>(null);
//   const { state, view, container } = useCodeMirror({
//     container: codeMirrorRef.current,
//     root,
//     value,
//     autoFocus,
//     theme,
//     height,
//     minHeight,
//     maxHeight,
//     width,
//     minWidth,
//     maxWidth,
//     basicSetup,
//     placeholder,
//     indentWithTab,
//     editable,
//     readOnly,
//     selection,
//     onChange,
//     onCreateEditor,
//     onUpdate,
//     extensions,
//     initialState,
//   });

//   // console.log('codeMirrorRef', codeMirrorRef);
//   // console.log('other', other);
//   // console.log({ state, view, container });

//   const defaultClassNames = typeof theme === 'string' ? `cm-theme-${theme}` : 'cm-theme';
//   return <div ref={codeMirrorRef} className={`${defaultClassNames}${className ? ` ${className}` : ''}`} {...other} />;
// };

const CodeEditor = ({ blockId }: PluginCustomEditorRenderProps) => {
  const editor = useYooptaEditor();
  const isReadOnly = useYooptaReadOnly();
  const block = useBlockData(blockId);
  const [code, setCode] = useState(() => getCodeElementText(block) || '');

  const element = getCodeElement(block) as CodeElement;

  const theme = element.props?.theme || 'VSCode';
  const language = element.props?.language || 'JavaScript';

  const onChange = (e) => {
    const value = e.target.value;
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
        <CodeTextEditor
          value={code}
          // height="auto"
          // extensions={[LANGUAGES[language]]}
          onChange={onChange}
          // width="100%"
          // theme={themes[theme]}
          className="yoopta-code-cm-editor"
          // basicSetup={codeMirrorSetup}
          // editable={!isReadOnly}
          readOnly={isReadOnly}
          language="js"
          onClick={onClick}
          style={{
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
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
      {/* {!isReadOnly && <CodeBlockOptions block={block} editor={editor} element={element} />} */}
    </div>
  );
};

export { CodeEditor };

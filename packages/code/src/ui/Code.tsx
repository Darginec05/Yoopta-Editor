import { PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-theme-github';

const CodeEditor = ({ element, blockId, attributes, children }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();

  const onChange = (value: string, viewUpdate: ViewUpdate) => {
    console.log('value', value);
  };

  return (
    <div data-element-type="Code" className="rounded-md mt-2 p-0">
      <CodeMirror
        value={''}
        height="500px"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
        theme={githubDark}
        basicSetup={{
          lineNumbers: false,
        }}
        // ref={console.log}
      />
      {/* {children} */}
    </div>
  );
};

export { CodeEditor };

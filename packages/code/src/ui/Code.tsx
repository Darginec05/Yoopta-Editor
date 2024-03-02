import { useYooptaEditor } from '@yoopta/editor';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-theme-github';

const CodeEditor = (props) => {
  const editor = useYooptaEditor();
  const plugin = editor.children[props.id];

  const onChange = (value: string, viewUpdate: ViewUpdate) => {
    console.log('value', value);
  };

  return (
    <div data-element-type="Code" {...props.attributes} className="rounded-md mt-2 p-0">
      <CodeMirror
        value={''}
        height="500px"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
        theme={githubDark}
        ref={console.log}
      />
      {props.children}
    </div>
  );
};

export { CodeEditor };

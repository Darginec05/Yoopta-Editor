import { useYooptaEditor } from '@yoopta/editor';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubDark } from '@uiw/codemirror-theme-github';

const CodeEditor = (props) => {
  const editor = useYooptaEditor();
  const plugin = editor.children[props.id];

  console.log('props.id', props.id);
  console.log('plugin', plugin);

  // const [codeEditorValue, setCodeEditorValue] = useState(plugin?.value?.[0].children?.[0].text || '');

  const handleChange = () => {};

  return (
    <div data-element-type="Code" {...props.attributes} className="rounded-md mt-2 p-0">
      <CodeMirror
        value={''}
        height="500px"
        extensions={[javascript({ jsx: true })]}
        onChange={handleChange}
        theme={githubDark}
      />
      {props.children}
    </div>
  );
};

export { CodeEditor };

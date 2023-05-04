import NoSSR from './components/NoSsr/NoSsr';
import { YoptaEditor as Editor, YoptaEditorProps } from './components/YoptaEditor/YoptaEditor';

const YoptaEditor = (props: YoptaEditorProps) => {
  return (
    <NoSSR>
      <Editor {...props} value={props.value} onChange={props.onChange} />
    </NoSSR>
  );
};

export { YoptaEditor };

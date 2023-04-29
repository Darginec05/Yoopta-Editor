import NoSSR from './components/NoSsr/NoSsr';
import { YoptaEditor as Editor, YoptaEditorProps } from './components/YoptaEditor/YoptaEditor';

const YoptaEditor = <O, T>(props: YoptaEditorProps<O, T>) => {
  return (
    <NoSSR>
      <Editor {...props} value={props.value} onChange={props.onChange} />
    </NoSSR>
  );
};

export { YoptaEditor };

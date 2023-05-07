import NoSSR from './components/NoSsr/NoSsr';
import { YooptaEditor as Editor, YooptaEditorProps } from './components/YooptaEditor/YooptaEditor';

const YooptaEditor = (props: YooptaEditorProps) => {
  return (
    <NoSSR>
      <Editor {...props} value={props.value} onChange={props.onChange} />
    </NoSSR>
  );
};

export { YooptaEditor };

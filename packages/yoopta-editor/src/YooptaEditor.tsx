import NoSSR from './components/NoSsr/NoSsr';
import { YooptaEditor as Editor, YooptaEditorProps } from './components/YooptaEditor/YooptaEditor';
import { YooptaBaseElement } from './types';

const YooptaEditor = <V extends YooptaBaseElement<string>, >(props: YooptaEditorProps<V>) => {
  return (
    <NoSSR>
      <Editor<V> {...props} value={props.value} onChange={props.onChange} />
    </NoSSR>
  );
};

export { YooptaEditor };

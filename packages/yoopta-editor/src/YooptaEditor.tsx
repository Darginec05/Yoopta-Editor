import NoSSR from './components/NoSsr/NoSsr';
import { UltraYooptaContextProvider } from './components/YooptaEditor/contexts/UltraYooptaContext/UltraYooptaContext';
import { YOOPTA_EDITOR_ULTRA_VALUE } from './components/YooptaEditor/defaultValue';
import { YooptaEditor as Editor, YooptaEditorProps } from './components/YooptaEditor/YooptaEditor';
import { YooptaBaseElement } from './types';

const YooptaEditor = <V extends YooptaBaseElement<string>>(props: YooptaEditorProps<V>) => {
  return (
    <NoSSR>
      <UltraYooptaContextProvider value={YOOPTA_EDITOR_ULTRA_VALUE}>
        <Editor<V> {...props} value={props.value} onChange={props.onChange} />
      </UltraYooptaContextProvider>
    </NoSSR>
  );
};

export { YooptaEditor };

import { PluginElementRenderProps, useYooptaEditor, useYooptaReadOnly } from '@yoopta/editor';
import { CALLOUT_THEME_STYLES } from '../utils';
import { CalloutBlockOptions } from '../components/CalloutBlockOptions';
import { CalloutRenderer } from '../render/CalloutRenderer';

const CalloutEditor = ({ element, attributes, children, blockId, block }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const isReadOnly = useYooptaReadOnly();
  const { theme = 'default' } = element.props || {};
  const style = CALLOUT_THEME_STYLES[theme];

  const attrs = {
    style,
    ...attributes,
  };

  return (
    <CalloutRenderer element={element} attributes={attrs} block={block}>
      {!isReadOnly && <CalloutBlockOptions block={block} editor={editor} props={element.props} />}
      {children}
    </CalloutRenderer>
  );
};

CalloutEditor.displayName = 'Callout';

export { CalloutEditor };

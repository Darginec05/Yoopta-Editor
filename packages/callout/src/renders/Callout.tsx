import { ElementRendererProps, PluginElementRenderProps, useYooptaEditor, useYooptaReadOnly } from '@yoopta/editor';
import { CALLOUT_THEME_STYLES } from '../utils';
import { CalloutBlockOptions } from './CalloutBlockOptions';
import { CalloutDefaultRenderer } from './CalloutRenderer';

const CalloutRender = ({ element, attributes, children, blockId, block }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const isReadOnly = useYooptaReadOnly();
  const { theme = 'default' } = element.props || {};
  const style = CALLOUT_THEME_STYLES[theme];

  const attrs = {
    style,
    ...attributes,
  };

  return (
    <CalloutDefaultRenderer element={element} attributes={attrs} block={block}>
      {!isReadOnly && <CalloutBlockOptions block={block} editor={editor} props={element.props} />}
      {children}
    </CalloutDefaultRenderer>
  );
};

CalloutRender.displayName = 'Callout';

export { CalloutRender };

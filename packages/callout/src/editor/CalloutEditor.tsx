import { PluginElementRenderProps, useYooptaEditor, useYooptaReadOnly } from '@yoopta/editor';
import { CalloutBlockOptions } from '../components/CalloutBlockOptions';
import { CalloutRenderer } from '../render/CalloutRenderer';

const CalloutEditor = ({ element, attributes, children, blockId, block }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const isReadOnly = useYooptaReadOnly();
  const { theme = 'default' } = element.props || {};

  return (
    <CalloutRenderer element={element} attributes={attributes} block={block}>
      {!isReadOnly && <CalloutBlockOptions block={block} editor={editor} props={element.props} />}
      {children}
    </CalloutRenderer>
  );
};

CalloutEditor.displayName = 'Callout';

export { CalloutEditor };

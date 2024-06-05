import { PluginElementRenderProps, useBlockData, useYooptaEditor, useYooptaReadOnly } from '@yoopta/editor';
import { CalloutBlockOptions } from './CalloutBlockOptions';

const CalloutRender = ({ element, attributes, children, blockId, HTMLAttributes = {} }: PluginElementRenderProps) => {
  const { className = '', ...htmlAttrs } = HTMLAttributes;

  const block = useBlockData(blockId);
  const editor = useYooptaEditor();
  const isReadOnly = useYooptaReadOnly();
  const { theme = 'default' } = element.props || {};

  return (
    <div className={`yoopta-callout yoopta-callout-theme-${theme} ${className}`} {...htmlAttrs} {...attributes}>
      {!isReadOnly && <CalloutBlockOptions block={block} editor={editor} props={element.props} />}
      {children}
    </div>
  );
};

CalloutRender.displayName = 'Callout';

export { CalloutRender };

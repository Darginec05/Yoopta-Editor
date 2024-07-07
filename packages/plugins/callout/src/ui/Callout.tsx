import { PluginElementRenderProps, useBlockData, useYooptaEditor, useYooptaReadOnly } from '@yoopta/editor';
import { CalloutBlockOptions } from './CalloutBlockOptions';

const CalloutRender = ({ extendRender, ...props }: PluginElementRenderProps) => {
  const { element, attributes, children, blockId, HTMLAttributes = {} } = props;
  const { className = '', ...htmlAttrs } = HTMLAttributes;

  const block = useBlockData(blockId);
  const editor = useYooptaEditor();
  const isReadOnly = useYooptaReadOnly();
  const { theme = 'default' } = element.props || {};

  if (extendRender) {
    return extendRender(props);
  }

  return (
    <div className={`yoopta-callout yoopta-callout-theme-${theme} ${className}`} {...htmlAttrs} {...attributes}>
      {!isReadOnly && <CalloutBlockOptions block={block} editor={editor} props={element.props} />}
      {children}
    </div>
  );
};

CalloutRender.displayName = 'Callout';

export { CalloutRender };

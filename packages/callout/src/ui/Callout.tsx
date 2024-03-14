import { PluginElementRenderProps, useBlockData, useYooptaEditor } from '@yoopta/editor';
import { CALLOUT_THEME_STYLES } from '../utils';
import { CalloutBlockOptions } from './CalloutBlockOptions';

const CalloutRender = ({ element, attributes, children, blockId }: PluginElementRenderProps) => {
  const block = useBlockData(blockId);
  const editor = useYooptaEditor();
  const { theme = 'default' } = element.props || {};
  const styles = CALLOUT_THEME_STYLES[theme];

  return (
    <div
      data-element-type="Callout"
      {...attributes}
      style={styles}
      className={`yoo-c-rounded-md yoo-c-mt-2 yoo-c-p-2 yoo-c-pl-4 yoo-c-leading-7 yoo-c-bg-info yoo-c-text-info-foreground yoopta-callout yoopta-callout-type-${theme}`}
    >
      <CalloutBlockOptions block={block} editor={editor} props={element.props} />
      {children}
    </div>
  );
};

CalloutRender.displayName = 'Callout';

export { CalloutRender };

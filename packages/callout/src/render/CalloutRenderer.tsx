import { ElementRendererProps } from '@yoopta/editor';
import { CALLOUT_THEME_STYLES } from '../utils';

export const CalloutRenderer = ({ element, attributes, children }: ElementRendererProps) => {
  const { theme = 'default' } = element.props || {};
  const style = CALLOUT_THEME_STYLES[theme];

  return (
    <div
      data-element-type={element.type}
      {...attributes}
      className={`yoo-callout-rounded-md yoo-callout-mt-2 yoo-callout-p-2 yoo-callout-pl-4 yoo-callout-leading-7 yoo-callout-bg-info yoo-callout-text-info-foreground yoo-callout-text-[16px] yoopta-callout-theme-${theme} ${attributes?.className}`}
      style={{ ...attributes.style, ...style }}
    >
      {children}
    </div>
  );
};

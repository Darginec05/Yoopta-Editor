import { ElementRendererProps } from '@yoopta/editor';

export const CalloutDefaultRenderer = ({ element, attributes, children }: ElementRendererProps) => {
  const { theme } = element.props || {};
  const { className, ...attrs } = attributes;

  return (
    <div
      data-element-type={element.type}
      className={`yoo-callout-rounded-md yoo-callout-mt-2 yoo-callout-p-2 yoo-callout-pl-4 yoo-callout-leading-7 yoo-callout-bg-info yoo-callout-text-info-foreground yoo-callout-text-[16px] yoopta-callout-theme-${theme} ${className}`}
      {...attrs}
    >
      {children}
    </div>
  );
};

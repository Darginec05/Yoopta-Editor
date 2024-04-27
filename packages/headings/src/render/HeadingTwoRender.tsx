import { PluginElementRenderProps } from '@yoopta/editor';

const HeadingTwoRender = ({ attributes, children, element }: PluginElementRenderProps) => {
  const { className = '', ...attrs } = attributes;

  return (
    <h2
      id={element.id}
      draggable={false}
      data-element-type={element.type}
      className={`yoo-h-scroll-m-20 yoo-h-mt-4 yoo-h-text-3xl yoo-h-font-semibold yoo-h-tracking-tight ${className}`}
      {...attrs}
    >
      {children}
    </h2>
  );
};

export { HeadingTwoRender };

import { PluginElementRenderProps } from '@yoopta/editor';

const HeadingThreeRender = ({ attributes, children, element }: PluginElementRenderProps) => {
  const { className = '', ...attrs } = attributes;

  return (
    <h3
      id={element.id}
      draggable={false}
      data-element-type={element.type}
      className={`yoo-h-mt-2 yoo-h-scroll-m-20 yoo-h-text-2xl yoo-h-font-semibold yoo-h-tracking-tight ${className}`}
      {...attrs}
    >
      {children}
    </h3>
  );
};

export { HeadingThreeRender };

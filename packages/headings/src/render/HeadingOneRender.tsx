import { PluginElementRenderProps } from '@yoopta/editor';

const HeadingOneRender = ({ attributes, children, element }: PluginElementRenderProps) => {
  const { className = '', ...attrs } = attributes;

  return (
    <h1
      id={element.id}
      draggable={false}
      data-element-type={element.type}
      className={`yoo-h-mt-6 yoo-h-scroll-m-20 yoo-h-text-4xl yoo-h-font-bold yoo-h-tracking-tight yoo-h-lg:text-3x ${className}`}
      {...attrs}
    >
      {children}
    </h1>
  );
};

export { HeadingOneRender };

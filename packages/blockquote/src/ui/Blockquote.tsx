import { PluginElementRenderProps } from '@yoopta/editor';

const BlockquoteRender = (props: PluginElementRenderProps) => {
  const { className, ...htmlAttrs } = props.HTMLAttributes || {};

  return (
    <blockquote
      data-element-type={props.element.type}
      className={`yoo-b-mt-2 yoo-b-border-l-2 yoo-b-pl-6 yoo-b-leading-7 ${className}`}
      {...htmlAttrs}
      {...props.attributes}
    >
      {props.children}
    </blockquote>
  );
};

export { BlockquoteRender };

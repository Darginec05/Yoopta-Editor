import { PluginElementRenderProps } from '@yoopta/editor';

const BlockquoteRender = (props: PluginElementRenderProps) => {
  const { className = '', ...htmlAttrs } = props.HTMLAttributes || {};

  return (
    <blockquote
      data-element-type={props.element.type}
      className={`yoopta-blockquote ${className}`}
      {...htmlAttrs}
      {...props.attributes}
    >
      {props.children}
    </blockquote>
  );
};

export { BlockquoteRender };

import { PluginElementRenderProps } from '@yoopta/editor';

const BlockquoteRender = (props: PluginElementRenderProps) => {
  const { className = '', ...htmlAttrs } = props.HTMLAttributes || {};

  return (
    <blockquote className={`yoopta-blockquote ${className}`} {...htmlAttrs} {...props.attributes}>
      {props.children}
    </blockquote>
  );
};

export { BlockquoteRender };

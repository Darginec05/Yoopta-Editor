import { PluginElementRenderProps } from '@yoopta/editor';

const ParagraphRender = (props: PluginElementRenderProps) => {
  const { className = '', ...htmlAttrs } = props.HTMLAttributes || {};

  return (
    <p
      data-element-type={props.element.type}
      className={`yoopta-paragraph ${className}`}
      {...htmlAttrs}
      {...props.attributes}
    >
      {props.children}
    </p>
  );
};

export { ParagraphRender };

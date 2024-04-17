import { PluginElementRenderProps } from '@yoopta/editor';

const blockquoteStyles = {
  margin: '8px 0 0 0',
  border: 'none',
  borderLeft: '2px solid #e5e7eb',
};

const BlockquoteRender = (props: PluginElementRenderProps) => {
  const { className = '', style, ...htmlAttrs } = props.HTMLAttributes || {};

  return (
    <blockquote
      data-element-type={props.element.type}
      className={`yoo-b-pl-6 yoo-b-leading-7 ${className}`}
      {...htmlAttrs}
      {...props.attributes}
      style={{ ...style, ...blockquoteStyles }}
    >
      {props.children}
    </blockquote>
  );
};

export { BlockquoteRender };

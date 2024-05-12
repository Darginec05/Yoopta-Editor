import { PluginElementRenderProps } from '@yoopta/editor';

// const blockquoteStyles = {
//   margin: '8px 0 0 0',
//   border: 'none',
//   borderLeft: '2px solid #e5e7eb',
// };

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

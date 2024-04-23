import { ElementRendererProps } from '@yoopta/editor';

const blockquoteStyles = {
  margin: '8px 0 0 0',
  border: 'none',
  borderLeft: '2px solid #e5e7eb',
};

const BlockquoteRenderer = (props: ElementRendererProps) => {
  const { className = '', style, ...attrs } = props.attributes || {};

  return (
    <blockquote
      data-element-type={props.element.type}
      className={`yoo-b-pl-6 yoo-b-leading-7 ${className}`}
      style={{ ...style, ...blockquoteStyles }}
      {...attrs}
    >
      {props.children}
    </blockquote>
  );
};

export { BlockquoteRenderer };

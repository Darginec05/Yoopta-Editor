import { ElementRendererProps } from '@yoopta/editor';

const ParagraphRenderer = (props: ElementRendererProps) => {
  const { className = '', ...attributes } = props.attributes || {};

  return (
    <p
      data-element-type={props.element.type}
      className={`yoo-p-leading-7 yoo-p-mt-2 yoo-text-[16px] ${className}`}
      {...attributes}
    >
      {props.children}
    </p>
  );
};

export { ParagraphRenderer };

import { RenderElementProps } from 'slate-react';

const ParagraphRender = (props: RenderElementProps) => {
  return (
    <p data-element-type="Paragraph" className="leading-7 mt-2" {...props.attributes}>
      {props.children}
    </p>
  );
};

export { ParagraphRender };

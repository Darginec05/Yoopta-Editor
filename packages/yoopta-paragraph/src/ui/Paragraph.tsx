import { RenderElementProps } from 'slate-react';
import s from './Paragraph.module.css';

const ParagraphRender = (props: RenderElementProps) => {
  return (
    <p data-element-type="Paragraph" className={s.paragraph} {...props.attributes}>
      {props.children}
    </p>
  );
};

export { ParagraphRender };

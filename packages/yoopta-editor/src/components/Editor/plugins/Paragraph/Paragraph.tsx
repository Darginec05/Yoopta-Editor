import { RenderElementProps } from 'slate-react';
import { createUltraPlugin } from '../../ultraPlugins';
import s from './Paragraph.module.css';

const ParagraphRender = (props: RenderElementProps) => {
  return (
    <p data-element-type="Paragraph" className={s.paragraph} {...props.attributes}>
      {props.children}
    </p>
  );
};

const Paragraph = createUltraPlugin({
  type: 'paragraph',
  render: ParagraphRender,
});

export { Paragraph };

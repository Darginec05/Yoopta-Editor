import { RenderElementProps } from 'slate-react';
import { createPlugin } from '../../../../plugins';
import s from './Paragraph.module.css';

const ParagraphRender = (props: RenderElementProps) => {
  return (
    <p data-element-type="Paragraph" className={s.paragraph} {...props.attributes}>
      {props.children}
    </p>
  );
};

const Paragraph = createPlugin({
  type: 'ParagraphPlugin',
  render: ParagraphRender,
  elements: {
    paragraph: {
      render: ParagraphRender,
    },
  },
});

export { Paragraph };

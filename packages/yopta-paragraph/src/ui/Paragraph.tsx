import { createYoptaComponent } from '@yopta/editor';
import { memo } from 'react';
import s from './Paragraph.module.scss';

const ParagraphRender = memo<any>(({ attributes, children, element }) => {
  return (
    <p draggable={false} className={s.paragraph} {...attributes}>
      {children}
    </p>
  );
});

ParagraphRender.displayName = 'Paragraph';

const Paragraph = createYoptaComponent({
  type: 'paragraph',
  renderer: (editor) => (props) => <ParagraphRender {...props} />,
});

export { Paragraph };

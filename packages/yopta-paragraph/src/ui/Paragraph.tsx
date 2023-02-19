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

const createNode = ({ renderer: Component, shortcut, handlers }) => ({
  render: Component,
  shortcut,
  handlers,
});

const Paragraph = createNode({
  renderer: ParagraphRender,
  shortcut: undefined,
  handlers: { onKeyDown: (event) => console.log(event) },
});

export { Paragraph };

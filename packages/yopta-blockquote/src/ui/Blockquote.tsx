import { memo } from 'react';
import { createYoptaComponent } from '@yopta/editor';
import s from './Blockquote.module.scss';

const BlockquoteRender = memo<any>(({ attributes, children, element }) => {
  return (
    <blockquote draggable={false} className={s.blockquote} {...attributes}>
      {children}
    </blockquote>
  );
});

BlockquoteRender.displayName = 'Blockquote';

const Blockquote = createYoptaComponent({
  type: 'block-quote',
  renderer: (editor) => (props) => <BlockquoteRender {...props} />,
  shortcut: '<',
});

export { Blockquote };

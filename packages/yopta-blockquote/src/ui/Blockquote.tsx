import { memo } from 'react';
import { YoptaComponent } from '@yopta/editor';
import s from './Blockquote.module.scss';
import { RenderElementProps } from 'slate-react';

const BlockquoteRender = memo<RenderElementProps>(({ attributes, children, element }) => {
  return (
    <blockquote draggable={false} className={s.blockquote} {...attributes}>
      {children}
    </blockquote>
  );
});

BlockquoteRender.displayName = 'Blockquote';

const Blockquote = new YoptaComponent({
  type: 'block-quote',
  renderer: (editor) => (props) => <BlockquoteRender {...props} />,
  shortcut: '<',
});

export { Blockquote };

import { RenderElementProps } from 'slate-react';
import { createPlugin } from '../../../../plugins';
import s from './Blockquote.module.css';

const BlockquoteRender = (props: RenderElementProps) => {
  return (
    <blockquote data-element-type="Blockquote" {...props.attributes} className={s.blockquote}>
      {props.children}
    </blockquote>
  );
};

const Blockquote = createPlugin({
  type: 'BlockquotePlugin',
  elements: {
    blockquote: {
      render: BlockquoteRender,
    },
  },
});

export { Blockquote };

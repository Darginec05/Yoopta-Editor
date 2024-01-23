import { RenderElementProps } from 'slate-react';
import { createUltraPlugin } from '../../../../plugins';
import s from './Blockquote.module.css';

const BlockquoteRender = (props: RenderElementProps) => {
  return (
    <blockquote data-element-type="Blockquote" {...props.attributes} className={s.blockquote}>
      {props.children}
    </blockquote>
  );
};

const Blockquote = createUltraPlugin({
  type: 'blockquote',
  render: BlockquoteRender,
});

export { Blockquote };

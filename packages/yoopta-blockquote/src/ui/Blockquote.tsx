import { RenderElementProps } from 'slate-react';
import s from './Blockquote.module.css';

const BlockquoteRender = (props: RenderElementProps) => {
  return (
    <blockquote data-element-type="Blockquote" {...props.attributes} className={s.blockquote}>
      {props.children}
    </blockquote>
  );
};

export { BlockquoteRender };

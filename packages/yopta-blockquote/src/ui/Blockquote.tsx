import { memo } from 'react';
import cx from 'classnames';
import s from './Blockquote.module.scss';

const BlockquoteRender = memo<any>(({ attributes, children, element }) => {
  return (
    <blockquote draggable={false} className={s.blockquote} {...attributes}>
      {children}
    </blockquote>
  );
});

BlockquoteRender.displayName = 'Blockquote';

const createNode = function ({ renderer: Component, shortcut, handlers }) {
  return {
    render: Component,
    shortcut,
    handlers,
  };
};

const Blockquote = createNode({
  renderer: BlockquoteRender,
  shortcut: '<',
  handlers: { onKeyDown: (event) => console.log(event) },
});

export { Blockquote };

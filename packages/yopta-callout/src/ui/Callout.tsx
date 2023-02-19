import { memo } from 'react';
import s from './Callout.module.scss';

const CalloutRender = memo<any>(({ attributes, children, element }) => {
  return (
    <div draggable={false} className={s.callout} {...attributes}>
      {children}
    </div>
  );
});

CalloutRender.displayName = 'Callout';

const createNode = function ({ renderer: Component, shortcut, handlers }) {
  return {
    render: Component,
    shortcut,
    handlers,
  };
};

const Callout = createNode({
  renderer: CalloutRender,
  shortcut: '<',
  handlers: { onKeyDown: (event) => console.log(event) },
});

export { Callout };

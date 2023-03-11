import { memo } from 'react';
import { YoptaComponent } from '@yopta/editor';
import s from './Callout.module.scss';
import { RenderElementProps } from 'slate-react';

const CalloutRender = ({ attributes, children, element }) => {
  return (
    <div draggable={false} className={s.callout} {...attributes}>
      {children}
    </div>
  );
};

CalloutRender.displayName = 'Callout';

const Callout = new YoptaComponent({
  type: 'callout',
  renderer: (editor) => CalloutRender,
  shortcut: '<',
});

export { Callout };

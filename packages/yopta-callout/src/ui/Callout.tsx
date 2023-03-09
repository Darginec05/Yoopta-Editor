import { memo } from 'react';
import { YoptaComponent } from '@yopta/editor';
import s from './Callout.module.scss';

const CalloutRender = memo<any>(({ attributes, children, element }) => {
  return (
    <div draggable={false} className={s.callout} {...attributes}>
      {children}
    </div>
  );
});

CalloutRender.displayName = 'Callout';

const Callout = new YoptaComponent({
  type: 'callout',
  renderer: (editor) => (props) => <CalloutRender {...props} />,
  shortcut: '<',
});

export { Callout };

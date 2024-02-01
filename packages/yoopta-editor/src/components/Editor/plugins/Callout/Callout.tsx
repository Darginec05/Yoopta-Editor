import { RenderElementProps } from 'slate-react';
import { createPlugin } from '../../../../plugins';
import s from './Callout.module.css';

const CalloutRender = (props: RenderElementProps) => {
  return (
    <div data-element-type="Callout" {...props.attributes} className={s.callout}>
      {props.children}
    </div>
  );
};

const Callout = createPlugin({
  type: 'CalloutPlugin',
  elements: {
    callout: {
      render: CalloutRender,
    },
  },
});

export { Callout };

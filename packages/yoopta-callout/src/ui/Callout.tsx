import { RenderElementProps } from 'slate-react';
import s from './Callout.module.css';

const CalloutRender = (props: RenderElementProps) => {
  return (
    <div data-element-type="Callout" {...props.attributes} className={s.callout}>
      {props.children}
    </div>
  );
};

CalloutRender.displayName = 'Callout';

export { CalloutRender };

import { forwardRef } from 'react';
import s from './MediaEditorLayout.module.scss';

const MediaEditorLayout = forwardRef(({ children, ...rest }, ref) => {
  return (
    <div className={s.editor} {...rest} ref={ref}>
      {children}
    </div>
  );
});

MediaEditorLayout.displayName = 'MediaEditorLayout';

export { MediaEditorLayout };

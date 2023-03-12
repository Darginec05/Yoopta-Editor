import { RenderElementProps } from 'slate-react';
import s from './EditorOptions.module.scss';

type Props = {};

const EditorOptions = (props: Props) => {
  return (
    <div className={s.options}>
      <div className={s.modal} />
    </div>
  );
};

export { EditorOptions };

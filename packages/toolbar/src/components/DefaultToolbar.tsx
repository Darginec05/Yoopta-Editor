import { ToolbarProps } from './Toolbar';
import { cx, useMarks } from '@yoopta/editor';
import s from './DefaultToolbar.module.scss';

const DefaultToolbar = ({ getRootProps }: ToolbarProps) => {
  const marks = useMarks();

  return (
    <div {...getRootProps()} className={cx(getRootProps().className, 'yoopta-toolbar')}>
      <div className={s.toolbar}>
        <div className={s.marks}>
          <button
            type="button"
            className={cx(s.mark, { [s.active]: marks.bold.isActive })}
            onClick={() => marks.bold.toggle()}
          >
            <span>
              <b>B</b>
            </span>
          </button>
          <button
            type="button"
            className={cx(s.mark, { [s.active]: marks.italic.isActive })}
            onClick={() => marks.italic.toggle()}
          >
            <span>
              <i>I</i>
            </span>
          </button>
          <button
            type="button"
            className={cx(s.mark, { [s.active]: marks.underline.isActive })}
            onClick={() => marks.underline.toggle()}
          >
            <span>
              <u>U</u>
            </span>
          </button>
          <button
            type="button"
            className={cx(s.mark, { [s.active]: marks.strike.isActive })}
            onClick={() => marks.strike.toggle()}
          >
            <span>
              <s>S</s>
            </span>
          </button>
          <button
            type="button"
            className={cx(s.mark, { [s.active]: marks.code.isActive })}
            onClick={() => marks.code.toggle()}
          >
            <span>
              <span>{'</>'}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export { DefaultToolbar };

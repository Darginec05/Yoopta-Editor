import { ToolbarProps } from '@yoopta/toolbar';
import cx from 'classnames';
import CodeIcon from './icons/notion/code.svg';

import s from './NotionToolbar.module.scss';

const NotionToolbar = (props: ToolbarProps) => {
  const { getRootProps, marks } = props;

  return (
    <div {...getRootProps()}>
      <div className={s.toolbar}>
        <div className={s.group}>
          <button type="button" className={s.item}>
            <span className={s.askGPT}>Ask GPT {`[WIP]`}</span>
          </button>
        </div>
        <div className={s.group}>
          <button
            type="button"
            onClick={() => marks.bold.toggle()}
            className={cx(s.item, { [s.active]: marks.bold.isActive })}
          >
            <span className={s.bold}>B</span>
          </button>
          <button
            type="button"
            onClick={() => marks.italic.toggle()}
            className={cx(s.item, { [s.active]: marks.italic.isActive })}
          >
            <span className={s.italic}>i</span>
          </button>
          <button
            type="button"
            onClick={() => marks.underline.toggle()}
            className={cx(s.item, { [s.active]: marks.underline.isActive })}
          >
            <span className={s.underline}>U</span>
          </button>
          <button
            type="button"
            onClick={() => marks.strike.toggle()}
            className={cx(s.item, { [s.active]: marks.strike.isActive })}
          >
            <span className={s.strike}>S</span>
          </button>
          <button
            type="button"
            onClick={() => marks.code.toggle()}
            className={cx(s.item, { [s.active]: marks.code.isActive })}
          >
            <span className={s.code}>
              <CodeIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export { NotionToolbar };

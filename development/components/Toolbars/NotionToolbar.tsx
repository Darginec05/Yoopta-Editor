import { useMarks, useTools } from '@yoopta/editor';
import { ToolbarProps } from '@yoopta/toolbar';
import cx from 'classnames';
import { useState } from 'react';
import CodeIcon from './icons/notion/code.svg';

import s from './NotionToolbar.module.scss';

const NotionToolbar = (props: ToolbarProps) => {
  const [isChatGPTOpen, setIsChatGPTOpen] = useState(false);
  const { getRootProps } = props;
  const marks = useMarks();
  // const { ChatGPT } = useTools();

  return (
    <div {...getRootProps()}>
      <div className={s.toolbar}>
        <div className={s.group}>
          <button type="button" className={s.item} onClick={() => setIsChatGPTOpen(true)}>
            <span className={s.askGPT}>Ask GPT {`[WIP]`}</span>
            {/* {isChatGPTOpen && <ChatGPT />} */}
            {/* {tools.ActionMenu.show({ style: { marginLeft: '10px' } })} */}
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

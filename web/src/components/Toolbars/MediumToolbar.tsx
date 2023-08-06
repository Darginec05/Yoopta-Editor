import { Range } from 'slate';
import { UI_HELPERS, useElements, useMarks, useTools } from '@yoopta/editor';
import { ToolbarProps } from '@yoopta/toolbar';
import BoldIcon from './icons/medium/Bold.svg';
import BlockquoteIcon from './icons/medium/Blockquote.svg';
import ItalicIcon from './icons/medium/Italic.svg';
import TitleIcon from './icons/medium/Title.svg';
import SubtitleIcon from './icons/medium/Subtitle.svg';
import LinkIcon from './icons/medium/Link.svg';
import s from './MediumToolbar.module.scss';
import { CSSProperties, useRef, useState } from 'react';

const MediumToolbar = (props: ToolbarProps) => {
  const buttonLinkRef = useRef<HTMLButtonElement>(null);
  const [linkToolPosition, setLinkToolPosition] = useState<CSSProperties | null>(null);
  const selectionRef = useRef<Range | null>(null);

  const { getRootProps } = props;
  const marks = useMarks();
  const elements = useElements();
  const tools = useTools();

  const { LinkTool } = tools || {};
  const hastLinkTool = !!LinkTool;

  console.log('hastLinkTool', hastLinkTool);

  const handleOpenLinkTool = () => {
    const buttonEl = buttonLinkRef.current!;
    const buttonRect = buttonEl.getBoundingClientRect();

    setLinkToolPosition({ left: buttonRect.left, top: buttonRect.top });
  };

  const handleCloseLinkTool = () => setLinkToolPosition(null);

  return (
    <div {...getRootProps()}>
      {!!linkToolPosition && hastLinkTool && (
        <UI_HELPERS.Overlay onClose={handleCloseLinkTool}>
          <LinkTool
            style={linkToolPosition}
            selection={selectionRef.current}
            on={{ add: handleCloseLinkTool, delete: handleCloseLinkTool }}
          />
        </UI_HELPERS.Overlay>
      )}
      <div className={s.root}>
        <button type="button" className={s.button} onClick={() => marks.bold.toggle()}>
          <span style={marks.bold.isActive ? { color: '#b5e5a4' } : { color: '#fff' }} className={s.item}>
            <BoldIcon />
          </span>
        </button>
        <button type="button" className={s.button} onClick={() => marks.italic.toggle()}>
          <span style={marks.italic.isActive ? { color: '#b5e5a4' } : { color: '#fff' }} className={s.item}>
            <ItalicIcon />
          </span>
        </button>
        {hastLinkTool && (
          <button type="button" ref={buttonLinkRef} className={s.button} onClick={handleOpenLinkTool}>
            <span style={marks.code.isActive ? { color: '#b5e5a4' } : { color: '#fff' }} className={s.item}>
              <LinkIcon />
            </span>
          </button>
        )}
        <div className={s.separator} />
        <button type="button" className={s.button} onClick={() => elements['heading-one'].toggle()}>
          <span style={{ color: '#fff' }} className={s.item}>
            <TitleIcon />
          </span>
        </button>
        <button type="button" className={s.button} onClick={() => elements['heading-two'].toggle()}>
          <span style={{ color: '#fff' }} className={s.item}>
            <SubtitleIcon />
          </span>
        </button>
        <button type="button" className={s.button} onClick={() => elements.blockquote.toggle()}>
          <span style={{ color: '#fff' }} className={s.item}>
            <BlockquoteIcon />
          </span>
        </button>
      </div>
    </div>
  );
};

export { MediumToolbar };

import { useElements, useMarks } from '@yoopta/editor';
import { ToolbarProps } from '@yoopta/toolbar';
import BoldIcon from './icons/medium/Bold.svg';
import BlockquoteIcon from './icons/medium/Blockquote.svg';
import ItalicIcon from './icons/medium/Italic.svg';
import TitleIcon from './icons/medium/Title.svg';
import SubtitleIcon from './icons/medium/Subtitle.svg';
import LinkIcon from './icons/medium/Link.svg';
import s from './MediumToolbar.module.scss';

const MediumToolbar = (props: ToolbarProps) => {
  const { getRootProps } = props;
  const marks = useMarks();
  const elements = useElements();

  return (
    <div {...getRootProps()}>
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
        {/* <button type="button" className={s.button} onClick={() => marks.bold.toggle()}>
          <span style={marks.bold.isActive ? { color: '#b5e5a4' } : { color: '#fff' }} className={s.item}>
            <LinkIcon />
          </span>
        </button> */}
        <button type="button" className={s.button} onClick={() => marks.code.toggle()}>
          <span style={marks.code.isActive ? { color: '#b5e5a4' } : { color: '#fff' }} className={s.item}>
            <LinkIcon />
          </span>
        </button>
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

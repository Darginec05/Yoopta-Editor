import { ToolbarProps } from '@yoopta/toolbar';
import BoldIcon from './icons/medium/Bold.svg';
import ItalicIcon from './icons/medium/Italic.svg';
import LinkIcon from './icons/medium/Link.svg';
import s from './MediumToolbar.module.scss';

const MediumToolbar = (props: ToolbarProps) => {
  const { getRootProps, marks } = props;

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
        <button type="button" className={s.button} onClick={() => marks.underline.toggle()}>
          <span style={marks.underline.isActive ? { color: '#b5e5a4' } : { color: '#fff' }} className={s.item}>
            <u>U</u>
          </span>
        </button>
        <button type="button" className={s.button} onClick={() => marks.strike.toggle()}>
          <span style={marks.strike.isActive ? { color: '#b5e5a4' } : { color: '#fff' }} className={s.item}>
            <s>S</s>
          </span>
        </button>
        <button type="button" className={s.button} onClick={() => marks.code.toggle()}>
          <span style={marks.code.isActive ? { color: '#b5e5a4' } : { color: '#fff' }} className={s.item}>
            <pre>{'</>'}</pre>
          </span>
        </button>
        {/* <div className={s.separator} />
        <button type="button" className={s.button} onClick={() => marks.bold.toggle()}>
          <span style={marks.bold.isActive ? { color: '#b5e5a4' } : { color: '#fff' }} className={s.item}>
            <ItalicIcon />
          </span>
        </button>
        <button type="button" className={s.button} onClick={() => marks.bold.toggle()}>
          <span style={marks.bold.isActive ? { color: '#b5e5a4' } : { color: '#fff' }} className={s.item}>
            <LinkIcon />
          </span>
        </button> */}
      </div>
    </div>
  );
};

export { MediumToolbar };

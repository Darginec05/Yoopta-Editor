import { Range } from 'slate';
import { UI_HELPERS, useElements, useMarks, useTools } from '@yoopta/editor';
import { ToolbarProps } from '@yoopta/toolbar';
import BoldIcon from './icons/medium/Bold.svg';
import BlockquoteIcon from './icons/medium/Blockquote.svg';
import ItalicIcon from './icons/medium/Italic.svg';
import TitleIcon from './icons/medium/Title.svg';
import SubtitleIcon from './icons/medium/Subtitle.svg';
import LinkIcon from './icons/medium/Link.svg';
import { useRef } from 'react';
import { useLinkTool } from './hooks';
import { useSlate } from 'slate-react';
import s from './MediumToolbar.module.scss';

const MediumToolbar = (props: ToolbarProps) => {
  const selectionRef = useRef<Range | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const editor = useSlate();

  const { getRootProps } = props;
  const marks = useMarks();
  const elements = useElements();
  const tools = useTools();

  const { LinkTool } = tools || {};
  const hasLinkTool = !!LinkTool;

  const { openLinkTool, closeLinkTool, linkToolButtonRef, linkToolProps } = useLinkTool({
    editor,
    selectionRef,
    toolbarRef,
  });

  return (
    <div {...getRootProps()}>
      {!!linkToolProps.open && hasLinkTool && (
        <UI_HELPERS.Overlay onClose={closeLinkTool}>
          <LinkTool
            style={linkToolProps.style}
            selection={selectionRef.current}
            on={{ add: closeLinkTool, delete: closeLinkTool }}
          />
        </UI_HELPERS.Overlay>
      )}
      <div className={s.root} ref={toolbarRef}>
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
        <button type="button" className={s.button} onClick={() => marks.colored.toggle()}>
          <span style={marks.colored.isActive ? { color: '#b5e5a4' } : { color: '#fff' }} className={s.item}>
            <ItalicIcon />
          </span>
        </button>
        {hasLinkTool && (
          <button type="button" ref={linkToolButtonRef} className={s.button} onClick={openLinkTool}>
            <span style={marks.code.isActive ? { color: '#b5e5a4' } : { color: '#fff' }} className={s.item}>
              <LinkIcon />
            </span>
          </button>
        )}
        <div className={s.separator} />
        <button
          type="button"
          style={elements['heading-one'].isActive ? { color: '#b5e5a4' } : { color: '#fff' }}
          className={s.button}
          onClick={() => elements['heading-one'].toggle()}
        >
          <span className={s.item}>
            <TitleIcon />
          </span>
        </button>
        <button
          type="button"
          style={elements['heading-two'].isActive ? { color: '#b5e5a4' } : { color: '#fff' }}
          className={s.button}
          onClick={() => elements['heading-two'].toggle()}
        >
          <span className={s.item}>
            <SubtitleIcon />
          </span>
        </button>
        <button
          type="button"
          className={s.button}
          style={elements.blockquote.isActive ? { color: '#b5e5a4' } : { color: '#fff' }}
          onClick={() => elements.blockquote.toggle()}
        >
          <span className={s.item}>
            <BlockquoteIcon />
          </span>
        </button>
      </div>
    </div>
  );
};

export { MediumToolbar };

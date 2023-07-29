import { YooEditor, YooptaBaseElement } from '@yoopta/editor';
import { useState, ChangeEvent, MouseEvent, useEffect, useRef } from 'react';
import { useSlate } from 'slate-react';
import DoneIcon from './icons/done.svg';
import CloseIcon from './icons/close.svg';
import { addLinkNode, getMatchedLinkNode, removeLinkNode } from '../utils/link';
import s from './LinkTool.module.scss';

declare module 'slate' {
  interface CustomTypes {
    Editor: YooEditor;
    Element: YooptaBaseElement<string>;
  }
}

const LinkTool = ({ asTool, style, selection, on }) => {
  const editor = useSlate() as YooEditor;

  const [url, setUrl] = useState('');
  const [linkNode, setLinkNode] = useState(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);

  const deleteLink = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    removeLinkNode(editor, selection);
    on?.delete?.();
  };

  const addLink = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (url.length === 0) {
      removeLinkNode(editor, selection);
    } else {
      addLinkNode(editor, url, selection);
    }

    on?.add?.();
  };

  useEffect(() => {
    if (asTool) {
      inputRef.current?.focus();
      const [matchedLinkNode] = getMatchedLinkNode(editor, selection) || [];

      if (matchedLinkNode) {
        setUrl(matchedLinkNode.data?.url);
        setLinkNode(linkNode);
      }
    }
  }, [inputRef.current, asTool, selection]);

  return (
    <div className={s.block} style={style}>
      <input
        className={s.input}
        value={url}
        onChange={onChange}
        placeholder="Paste link"
        onPaste={(e) => e.stopPropagation()}
        ref={inputRef}
      />
      {url.length > 0 && (
        <>
          <div className={s.separator} />
          <button type="button" className={s.button} onClick={deleteLink}>
            <CloseIcon width={20} height={20} />
          </button>
        </>
      )}
      <div className={s.separator} />
      <button type="button" className={s.button} onClick={addLink}>
        <DoneIcon />
      </button>
    </div>
  );
};

export { LinkTool };

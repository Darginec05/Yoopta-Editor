import { useState, ChangeEvent, MouseEvent } from 'react';
import isUrl from 'is-url';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';
import { ReactComponent as DoneIcon } from '../../icons/done.svg';
import { removeLinkNode, addLinkNode } from '../Editor/utils';
import s from './LinkInput.module.scss';

const LinkInput = ({ onClose, linkNode, editor }) => {
  const hasLink = !!linkNode;
  const defaultValue = hasLink ? linkNode[0].url : '';
  const [url, setUrl] = useState(defaultValue);
  const isValidURL = isUrl(url);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);

  const onDeleteLink = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUrl('');
    removeLinkNode(editor);
    onClose();
  };

  const onAddLink = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isValidURL) {
      addLinkNode(editor, url);
      onClose();
    }
  };

  return (
    <div className={s.block}>
      <button onMouseDown={onDeleteLink} type="button" className={s.button}>
        <CloseIcon fill="#fff" width={30} height={30} />
      </button>
      <span className={s.line} />
      <input className={s.input} value={url} onChange={onChange} placeholder="type link" />
      <span className={s.line} />
      <button type="button" className={s.button} disabled={!isValidURL} onMouseDown={onAddLink}>
        <DoneIcon stroke={isValidURL ? '#29c059' : 'gray'} />
      </button>
    </div>
  );
};

export { LinkInput };

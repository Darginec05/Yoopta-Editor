import { useState, ChangeEvent, MouseEvent } from 'react';
// import isUrl from 'is-url';
import CloseIcon from '../../icons/close.svg';
import DoneIcon from '../../icons/done.svg';
import s from './LinkInput.module.scss';

const LinkInput = ({ onClose, linkUrl, onRemove, onAdd, placeholder }) => {
  const hasLink = !!linkUrl;
  const [url, setUrl] = useState(hasLink ? linkUrl : '');
  // const isValidURL = isUrl(url);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value);

  const onDeleteLink = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUrl('');
    onRemove();
    onClose();
  };

  const onAddLink = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // if (isValidURL) {
    //   onAdd(url);
    //   onClose();
    // }
  };

  return (
    <div className={s.block} aria-hidden onClick={(e) => e.stopPropagation()}>
      <button onMouseDown={onDeleteLink} type="button" className={s.button}>
        <CloseIcon fill="#fff" width={30} height={30} />
      </button>
      <span className={s.line} />
      <input
        className={s.input}
        value={url}
        onChange={onChange}
        placeholder={placeholder}
        onPaste={(e) => e.stopPropagation()}
      />
      <span className={s.line} />
      {/* <button type="button" className={s.button} disabled={!isValidURL} onMouseDown={onAddLink}>
        <DoneIcon stroke={isValidURL ? '#29c059' : 'gray'} />
      </button> */}
    </div>
  );
};

export { LinkInput };

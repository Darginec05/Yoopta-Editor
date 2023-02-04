import { FC, MouseEvent, useRef, useState } from 'react';
import { OutsideClick } from '../OutsideClick';
import s from './MediaEditorOptions.module.scss';

type Props = {
  handleDelete: () => void;
  // onUploadViaURL: () => void;
  // onAddCaption: () => void;
  handleChangeUrl: () => void;
  hasUrl?: boolean;
};

const MediaEditorOptions: FC<Props> = ({ handleDelete, handleChangeUrl, hasUrl }) => {
  const [isOptionsVisibile, setIsOptionsVisible] = useState(false);
  const handlerRef = useRef<HTMLDivElement>(null);

  const handleOptionsClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsOptionsVisible(!isOptionsVisibile);
  };

  return (
    <div role="button" tabIndex={0} className={s.button} onClick={handleOptionsClick} ref={handlerRef}>
      <div className={s.dots}>
        <div className={s.dot} />
        <div className={s.dot} />
        <div className={s.dot} />
      </div>
      {isOptionsVisibile && (
        <OutsideClick onClose={() => setIsOptionsVisible(false)}>
          <div className={s.modal}>
            <button type="button" onClick={handleChangeUrl}>
              {hasUrl ? 'Change link' : 'Add link'}
            </button>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </OutsideClick>
      )}
    </div>
  );
};

export { MediaEditorOptions };

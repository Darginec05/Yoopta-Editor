import { FC, MouseEvent, useState } from 'react';
import { Fade } from '../Fade';
import { OutsideClick } from '../OutsideClick';
import s from './MediaEditorOptions.module.scss';

type Props = {
  onDelete: () => void;
  onUploadViaURL: () => void;
  onUpload: () => void;
  onAddCaption: () => void;
  isImage?: boolean;
};

const MediaEditorOptions: FC<Props> = ({ onDelete, onUploadViaURL, onUpload, onAddCaption, isImage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionsClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <div aria-hidden className={s.button} onClick={handleOptionsClick}>
      <div className={s.dot} />
      <div className={s.dot} />
      <div className={s.dot} />
      <OutsideClick onClose={() => setIsOpen(false)}>
        <Fade show={isOpen} animationDelay={300}>
          <div className={s.modal}>
            {/* <button type="button" onClick={onUpload}>
              Upload File
            </button>
            <button type="button" onClick={onUploadViaURL}>
              Upload via URL
            </button>
            {isImage && (
              <button type="button" onClick={onAddCaption}>
                Caption
              </button>
            )} */}
            <button type="button" onClick={onDelete}>
              Delete
            </button>
          </div>
        </Fade>
      </OutsideClick>
    </div>
  );
};

export { MediaEditorOptions };

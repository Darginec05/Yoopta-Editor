import { FC, MouseEvent, useState } from 'react';
import { Fade } from '../Fade';
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

  const handleOptionsClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsOptionsVisible(true);
  };

  return (
    <div aria-hidden className={s.button} onClick={handleOptionsClick}>
      <div className={s.dot} />
      <div className={s.dot} />
      <div className={s.dot} />
      <OutsideClick onClose={() => setIsOptionsVisible(false)}>
        <Fade show={isOptionsVisibile} animationDelay={150}>
          <div className={s.modal}>
            <button type="button" onClick={handleChangeUrl}>
              {hasUrl ? 'Change link' : 'Add link'}
            </button>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </Fade>
      </OutsideClick>
    </div>
  );
};

export { MediaEditorOptions };

import { OutsideClick } from '../OutsideClick';
import { ReactComponent as DeleteIcon } from './icons/delete.svg';
import { ReactComponent as DuplicateIcon } from './icons/duplicate.svg';
import { ReactComponent as CopyIcon } from './icons/copy.svg';
import { ReactComponent as ChangeIcon } from './icons/change.svg';
import s from './ElementSettings.module.scss';

const ElementSettings = ({
  onClose,
  handleDeleteNode,
  handleDuplicateNode,
  handleTransformIntoNode,
  handleCopyLinkNode,
}) => {
  const stopPropagation = (e) => e.stopPropagation();

  const onDeleteNode = () => {
    handleDeleteNode();
    onClose();
  };

  const onDuplicateNode = () => {
    handleDuplicateNode();
    onClose();
  };

  const onTransformIntoNode = () => {
    handleTransformIntoNode();
    // onClose();
  };

  const onCopyLinkNode = () => {
    handleCopyLinkNode();
    onClose();
  };

  return (
    <OutsideClick onClose={onClose}>
      <div className={s.root} aria-hidden onMouseDown={stopPropagation} onClick={stopPropagation}>
        <div className={s.content}>
          <div className={s.listSettings}>
            <button type="button" onClick={onDeleteNode} className={s.settingsButton}>
              <DeleteIcon />
              <span>Delete</span>
            </button>
            <button type="button" onClick={onDuplicateNode} className={s.settingsButton}>
              <DuplicateIcon />
              <span>Duplicate</span>
            </button>
            {/* <button type="button" onClick={onTransformIntoNode} className={s.settingsButton}>
              <ChangeIcon />
              <span>Change into</span>
            </button> */}
            <button type="button" onClick={onCopyLinkNode} className={s.settingsButton}>
              <CopyIcon />
              <span>Copy block link </span>
            </button>
          </div>
        </div>
      </div>
    </OutsideClick>
  );
};

export { ElementSettings };

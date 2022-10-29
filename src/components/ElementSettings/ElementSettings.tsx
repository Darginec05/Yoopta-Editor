import { useRef } from 'react';
import DeleteIcon from './icons/delete.svg';
import DuplicateIcon from './icons/duplicate.svg';
import CopyIcon from './icons/copy.svg';
import ChangeIcon from './icons/change.svg';
import { useActionMenuContext } from '../../contexts/ActionMenuContext/ActionMenuContext';
import { OutsideClick } from '../OutsideClick';
import s from './ElementSettings.module.scss';

const ElementSettings = ({
  handleDeleteNode,
  handleDuplicateNode,
  isVoidElement,
  handleCopyLinkNode,
  onClose,
}) => {
  const settingsRef = useRef<HTMLDivElement>(null);
  const { showSuggestionList, hideSuggestionList, isSuggesstionListOpen } = useActionMenuContext();

  const stopPropagation = (e) => e.stopPropagation();

  const handleClose = () => {
    if (isSuggesstionListOpen) hideSuggestionList();
    onClose();
  };

  const onDeleteNode = () => {
    handleDeleteNode();
    handleClose();
  };

  const onDuplicateNode = () => {
    handleDuplicateNode();
    handleClose();
  };

  const onTransformIntoNode = () => {
    if (!settingsRef.current || isVoidElement) return;

    if (isSuggesstionListOpen) return hideSuggestionList();
    const settingsRect = settingsRef.current.getBoundingClientRect();

    const styles = {
      left: settingsRect.left + settingsRect.width + 10,
      top: settingsRect.top - settingsRect.height / 2,
      bottom: 'auto',
      opacity: 1,
    };

    const options = {
      triggeredBySuggestion: false,
      shouldShowTextNodes: true,
    };

    showSuggestionList(styles, options);
  };

  const onCopyLinkNode = () => {
    handleCopyLinkNode();
    handleClose();
  };

  return (
    <OutsideClick onClose={handleClose}>
      <div
        className={s.root}
        aria-hidden
        onMouseDown={stopPropagation}
        ref={settingsRef}
        contentEditable={false}
        onClick={stopPropagation}
      >
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
            {!isVoidElement && (
              <button type="button" onClick={onTransformIntoNode} className={s.settingsButton}>
                <ChangeIcon />
                <span>Change into</span>
              </button>
            )}
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

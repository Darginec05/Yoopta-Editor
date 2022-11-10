import { useRef } from 'react';
import { useSlate } from 'slate-react';
import cx from 'classnames';
import DeleteIcon from './icons/delete.svg';
import DuplicateIcon from './icons/duplicate.svg';
import CopyIcon from './icons/copy.svg';
import ChangeIcon from './icons/change.svg';
import { useActionMenuContext } from '../../contexts/ActionMenuContext/ActionMenuContext';
import { useNodeSettingsContext } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { NodeSettingsActions } from '../NodeSettingsActions/NodeSettingsActions';
import { Modal } from '../Modal/Modal';
import s from './NodeSettings.module.scss';

const NodeSettings = () => {
  const settingsRef = useRef<HTMLDivElement>(null);
  const editor = useSlate();
  const { showSuggestionList, hideSuggestionList, isSuggesstionListOpen } = useActionMenuContext();
  const [{ hovered, isNodeSettingsOpen, dragRef, nodeSettingsPos }, handlers] = useNodeSettingsContext();

  const onTransformIntoNode = () => {
    // if (!settingsRef.current || isVoidElement) return;

    if (isSuggesstionListOpen) return hideSuggestionList();
    const settingsRect = {} as any;
    // const settingsRect = settingsRef.current.getBoundingClientRect();

    const styles = {
      left: settingsRect.left + settingsRect.width + 10,
      top: settingsRect.top - settingsRect.height / 2,
      bottom: 'auto',
      opacity: 1,
      zIndex: 1400,
    };

    const options = {
      triggeredBySuggestion: false,
      shouldShowTextNodes: true,
    };

    showSuggestionList(styles, options);
  };

  return (
    <div className={cx(s.actionItems, { [s.actionItemsShow]: hovered.node !== null })} style={hovered.style}>
      <div>
        <NodeSettingsActions
          isDragging={false}
          onDragEnd={() => {}}
          onDragStart={() => {}}
          node={hovered.node}
          handlers={handlers}
          dragRef={dragRef}
          editor={editor}
        />
        {isNodeSettingsOpen && (
          <Modal onClose={handlers.closeNodeSettings} style={nodeSettingsPos}>
            <div className={cx(s.root, 'yopta-element_settings')} aria-hidden ref={settingsRef} contentEditable={false}>
              <div className={s.content}>
                <div className={s.listSettings}>
                  <button type="button" onClick={handlers.deleteNode} className={s.settingsButton}>
                    <DeleteIcon />
                    <span>Delete</span>
                  </button>
                  <button type="button" onClick={handlers.duplicateNode} className={s.settingsButton}>
                    <DuplicateIcon />
                    <span>Duplicate</span>
                  </button>
                  {/* @ts-ignore */}
                  {!hovered.node.isVoid && (
                    <button type="button" onClick={onTransformIntoNode} className={s.settingsButton}>
                      <ChangeIcon />
                      <span>Change into</span>
                    </button>
                  )}
                  <button type="button" onClick={handlers.copyLinkNode} className={s.settingsButton}>
                    <CopyIcon />
                    <span>Copy block link </span>
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );

  // return (
  //   <div className={cx(s.root, 'yopta-element_settings')} aria-hidden ref={settingsRef} contentEditable={false}>
  //     <div className={s.content}>
  //       <div className={s.listSettings}>
  //         <button type="button" onClick={onDeleteNode} className={s.settingsButton}>
  //           <DeleteIcon />
  //           <span>Delete</span>
  //         </button>
  //         <button type="button" onClick={onDuplicateNode} className={s.settingsButton}>
  //           <DuplicateIcon />
  //           <span>Duplicate</span>
  //         </button>
  //         {/* {!isVoidElement && (
  //           <button type="button" onClick={onTransformIntoNode} className={s.settingsButton}>
  //             <ChangeIcon />
  //             <span>Change into</span>
  //           </button>
  //         )} */}
  //         <button type="button" onClick={onCopyLinkNode} className={s.settingsButton}>
  //           <CopyIcon />
  //           <span>Copy block link </span>
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export { NodeSettings };

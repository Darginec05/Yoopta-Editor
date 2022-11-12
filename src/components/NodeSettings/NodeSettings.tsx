import { useRef } from 'react';
import cx from 'classnames';
import DeleteIcon from './icons/delete.svg';
import DuplicateIcon from './icons/duplicate.svg';
import CopyIcon from './icons/copy.svg';
import ChangeIcon from './icons/change.svg';
import { NodeSettingsActions } from '../NodeSettingsActions/NodeSettingsActions';
import { Modal } from '../Modal/Modal';
import {
  NodeSettingsContextHandlers,
  NodeSettingsContextValues,
} from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import s from './NodeSettings.module.scss';

type Props = Pick<NodeSettingsContextValues, 'hoveredNode' | 'isNodeSettingsOpen' | 'nodeSettingsPos'> & {
  elementId: string;
  handlers: NodeSettingsContextHandlers;
};

const NodeSettings = ({ hoveredNode, isNodeSettingsOpen, elementId, nodeSettingsPos, handlers }: Props) => {
  const settingsRef = useRef<HTMLDivElement>(null);
  const isHovered = hoveredNode?.id === elementId;

  const onTransformIntoNode = () => {
    // if (!settingsRef.current || isVoidElement) return;
    // if (isSuggesstionListOpen) return hideSuggestionList();
    // const settingsRect = {} as any;
    // // const settingsRect = settingsRef.current.getBoundingClientRect();
    // const styles = {
    //   left: settingsRect.left + settingsRect.width + 10,
    //   top: settingsRect.top - settingsRect.height / 2,
    //   bottom: 'auto',
    //   opacity: 1,
    //   zIndex: 1400,
    // };
    // const options = {
    //   triggeredBySuggestion: false,
    //   shouldShowTextNodes: true,
    // };
    // showSuggestionList(styles, options);
  };

  return (
    <div className={cx(s.actionItems, { [s.actionItemsShow]: isHovered })} contentEditable={false}>
      <div>
        <NodeSettingsActions node={hoveredNode} handlers={handlers} />
        {isNodeSettingsOpen && isHovered && (
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
                  {!hoveredNode.isVoid && (
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
};

export { NodeSettings };

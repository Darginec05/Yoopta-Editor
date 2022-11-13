import { useRef } from 'react';
import { ReactEditor } from 'slate-react';
import { Transforms, Editor } from 'slate';
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
import { useActionMenuContext } from '../../contexts/ActionMenuContext/ActionMenuContext';
import s from './NodeSettings.module.scss';

type Props = Pick<NodeSettingsContextValues, 'hoveredNode' | 'isNodeSettingsOpen' | 'nodeSettingsPos'> & {
  elementId: string;
  handlers: NodeSettingsContextHandlers;
  editor: Editor;
};

const NodeSettings = ({ hoveredNode, isNodeSettingsOpen, elementId, nodeSettingsPos, handlers, editor }: Props) => {
  const nodeSettingsRef = useRef<HTMLDivElement>(null);
  const isHovered = hoveredNode?.id === elementId;
  const { hideSuggestionList, showSuggestionList, isSuggesstionListOpen } = useActionMenuContext();

  /* @ts-ignore */
  const isVoidNode = hoveredNode?.isVoid;

  const showNodeToggler = () => {
    if (!nodeSettingsRef.current || isVoidNode || !hoveredNode) return;
    const settingsRect = nodeSettingsRef.current.getBoundingClientRect();
    const styles = {
      left: settingsRect.left + settingsRect.width + 10,
      top: settingsRect.top - settingsRect.height / 2,
      bottom: 'auto',
      opacity: 1,
      zIndex: 1400,
    };

    const options = {
      triggeredBySuggestion: false,
      shouldShowOnlyTextNodes: true,
    };

    const nodePath = ReactEditor.findPath(editor, hoveredNode);

    Transforms.select(editor, { path: [nodePath[0], 0], offset: 0 });
    showSuggestionList(styles, options);
  };

  const handleClose = () => {
    if (isSuggesstionListOpen) hideSuggestionList();
    handlers.closeNodeSettings();
  };

  const settingsButtonDisable = isSuggesstionListOpen;

  return (
    <div className={cx(s.actionItems, { [s.actionItemsShow]: isHovered })} contentEditable={false}>
      <div>
        <NodeSettingsActions node={hoveredNode} handlers={handlers} showSuggestionList={showSuggestionList} />
        {isNodeSettingsOpen && isHovered && (
          <Modal onClose={handleClose} style={nodeSettingsPos} className="yopta-node_settings">
            <div
              className={cx(s.root, 'yopta-element_settings')}
              aria-hidden
              ref={nodeSettingsRef}
              contentEditable={false}
            >
              <div className={s.content}>
                <div className={s.listSettings}>
                  <button
                    type="button"
                    disabled={settingsButtonDisable}
                    onClick={handlers.deleteNode}
                    className={cx(s.settingsButton, { [s.settingsButtonDisable]: settingsButtonDisable })}
                  >
                    <DeleteIcon />
                    <span>Delete</span>
                  </button>
                  <button
                    type="button"
                    disabled={settingsButtonDisable}
                    onClick={handlers.duplicateNode}
                    className={cx(s.settingsButton, { [s.settingsButtonDisable]: settingsButtonDisable })}
                  >
                    <DuplicateIcon />
                    <span>Duplicate</span>
                  </button>
                  {/* @ts-ignore */}
                  {!hoveredNode.isVoid && (
                    <button
                      type="button"
                      onClick={showNodeToggler}
                      className={cx(s.settingsButton, {
                        [s.settingsButtonDisable]: settingsButtonDisable,
                        [s.settingsButtonActive]: isSuggesstionListOpen,
                      })}
                    >
                      <ChangeIcon />
                      <span>Change into</span>
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={settingsButtonDisable}
                    onClick={handlers.copyLinkNode}
                    className={cx(s.settingsButton, { [s.settingsButtonDisable]: settingsButtonDisable })}
                  >
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

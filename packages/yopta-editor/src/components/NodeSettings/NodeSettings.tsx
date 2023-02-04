import { useRef } from 'react';
import { Transforms, Editor, Element as SlateElement } from 'slate';
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
import { getNodePath } from '../Editor/utils';
import s from './NodeSettings.module.scss';

type Props = Pick<NodeSettingsContextValues, 'hoveredNode' | 'isNodeSettingsOpen' | 'nodeSettingsPos'> & {
  handlers: NodeSettingsContextHandlers;
  editor: Editor;
  element: SlateElement;
  isNestedNode: boolean;
};

const NodeSettings = ({
  editor,
  element,
  handlers,
  hoveredNode,
  isNestedNode,
  nodeSettingsPos,
  isNodeSettingsOpen,
}: Props) => {
  const nodeSettingsRef = useRef<HTMLDivElement>(null);
  const isHovered = hoveredNode?.id === element.id;
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

    const path = getNodePath(editor, hoveredNode);

    const options = {
      triggeredBySuggestion: false,
      shouldShowOnlyTextNodes: true,
    };

    Transforms.select(editor, { path, offset: 0 });
    showSuggestionList(styles, options);
  };

  const handleClose = () => {
    if (isSuggesstionListOpen) hideSuggestionList();
    handlers.closeNodeSettings();
  };

  const settingsButtonDisable = isSuggesstionListOpen;
  const isVoidElement = SlateElement.isElement(hoveredNode) && Editor.isVoid(editor, hoveredNode);

  return (
    <div
      className={cx(s.actionItems, 'node-settings-actions', {
        [s.actionItemsShow]: isHovered,
        [s.nestedItems]: isNestedNode,
      })}
      contentEditable={false}
    >
      <div>
        <NodeSettingsActions element={element} handlers={handlers} showSuggestionList={showSuggestionList} />
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
                  {!isVoidElement && (
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

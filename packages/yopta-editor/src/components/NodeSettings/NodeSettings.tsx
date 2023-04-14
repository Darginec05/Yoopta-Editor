import { useRef } from 'react';
import { Transforms, Editor, Element as SlateElement, Element } from 'slate';
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
import { YoEditor } from '../../types';
import s from './NodeSettings.module.scss';

type Props = Pick<NodeSettingsContextValues, 'hoveredElement' | 'isElementOptionsOpen' | 'nodeSettingsPos'> & {
  events: NodeSettingsContextHandlers;
  editor: YoEditor;
  element: SlateElement;
  isNestedNode: boolean;
};

const NodeSettings = ({
  editor,
  element,
  events,
  hoveredElement,
  isNestedNode,
  nodeSettingsPos,
  isElementOptionsOpen,
}: Props) => {
  const nodeSettingsRef = useRef<HTMLDivElement>(null);
  const isHovered = hoveredElement?.id === element.id;
  const { hideSuggestionList, showSuggestionList, isSuggesstionListOpen } = {};

  /* @ts-ignore */
  const isVoidNode = hoveredElement?.isVoid;

  const showNodeToggler = () => {
    if (!nodeSettingsRef.current || isVoidNode || !hoveredElement) return;
    const settingsRect = nodeSettingsRef.current.getBoundingClientRect();
    const styles = {
      left: settingsRect.left + settingsRect.width + 10,
      top: settingsRect.top - settingsRect.height / 2,
      bottom: 'auto',
      opacity: 1,
      zIndex: 1400,
    };

    const path = [];

    const options = {
      triggeredBySuggestion: false,
      shouldShowOnlyTextNodes: true,
    };

    Transforms.select(editor, { path, offset: 0 });
    showSuggestionList(styles, options);
  };

  const handleClose = () => {
    if (isSuggesstionListOpen) hideSuggestionList();
    events.closeNodeSettings();
  };

  const settingsButtonDisable = isSuggesstionListOpen;
  const isVoidElement = Element.isElement(hoveredElement) && Editor.isVoid(editor, hoveredElement);

  return (
    <div
      className={cx(s.actionItems, 'node-settings-actions yopta-tools', {
        [s.actionItemsShow]: isHovered,
        [s.nestedItems]: isNestedNode,
      })}
      contentEditable={false}
    >
      <div>
        <NodeSettingsActions element={element} events={events} showSuggestionList={showSuggestionList} />
        {isElementOptionsOpen && isHovered && (
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
                    onClick={events.deleteNode}
                    className={cx(s.settingsButton, { [s.settingsButtonDisable]: settingsButtonDisable })}
                  >
                    <DeleteIcon />
                    <span>Delete</span>
                  </button>
                  <button
                    type="button"
                    disabled={settingsButtonDisable}
                    onClick={events.duplicateNode}
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
                    onClick={events.copyLinkNode}
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

import { useRef } from 'react';
import cx from 'classnames';
import { HoveredNode, NodeSettingsContextHandlers } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { ActionMenuContextType } from '../../contexts/ActionMenuContext/ActionMenuContext';
import PlusIcon from '../../icons/add.svg';
import DragIcon from '../../icons/drag.svg';
import s from './NodeSettingsActions.module.scss';

type Props = {
  node: HoveredNode;
  handlers: NodeSettingsContextHandlers;
  showSuggestionList: ActionMenuContextType['showSuggestionList'];
};

export const NodeSettingsActions = ({ handlers, node, showSuggestionList }: Props) => {
  const { openNodeSettings, triggerPlusButton, onDragEnd, onDragStart } = handlers;
  const dragRef = useRef<HTMLButtonElement>(null);

  const onMouseDown = () => {
    const handler = dragRef.current;
    const target = document.querySelector<HTMLDivElement>(`[data-node-id="${node?.id}"]`);

    handler?.setAttribute('draggable', 'false');
    if (target) {
      target.setAttribute('draggable', 'true');

      target.ondragstart = onDragStart;
      target.ondragend = onDragEnd;
    }
  };

  const handlePlusButton = () => {
    triggerPlusButton(() => {
      showSuggestionList(undefined, { triggeredBySuggestion: true });
    });
  };

  return (
    <div className={cx(s.actions, 'node-settings-actions')}>
      <button
        type="button"
        onClick={handlePlusButton}
        contentEditable={false}
        className={cx(s.hoverSettingsItem, 'node-settings-add')}
      >
        <PlusIcon />
      </button>
      <button
        className={cx(s.hoverSettingsItem, 'node-settings-drag')}
        onMouseDown={onMouseDown}
        onClick={() => openNodeSettings(dragRef, node)}
        ref={dragRef}
        type="button"
        contentEditable={false}
      >
        <DragIcon />
      </button>
    </div>
  );
};

NodeSettingsActions.displayName = 'NodeSettingsActions';

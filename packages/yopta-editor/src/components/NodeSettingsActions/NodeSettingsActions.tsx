import { useRef, MouseEvent } from 'react';
import { useSlate } from 'slate-react';
import cx from 'classnames';
import { HoveredNode, NodeSettingsContextHandlers } from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { ActionMenuContextType } from '../../contexts/ActionMenuContext/ActionMenuContext';
import PlusIcon from '../../icons/add.svg';
import DragIcon from '../../icons/drag.svg';
import { getNodePath } from '../Editor/utils';
import s from './NodeSettingsActions.module.scss';

type Props = {
  element: HoveredNode;
  handlers: NodeSettingsContextHandlers;
  showSuggestionList: ActionMenuContextType['showSuggestionList'];
};

export const NodeSettingsActions = ({ handlers, element, showSuggestionList }: Props) => {
  const { openNodeSettings, triggerPlusButton, onDragEnd, onDragStart } = handlers;
  const editor = useSlate();
  const dragRef = useRef<HTMLButtonElement>(null);

  const onMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const handler = dragRef.current;
    const target = document.querySelector<HTMLDivElement>(`[data-node-id="${element?.id}"]`);

    handler?.setAttribute('draggable', 'false');
    if (target) {
      target.setAttribute('draggable', 'true');

      target.ondragstart = (event) => {
        onDragStart(event, getNodePath(editor, element));
      };
      target.ondragend = onDragEnd;
    }
  };

  const handlePlusButton = () => {
    triggerPlusButton(() => {
      showSuggestionList(undefined, { triggeredBySuggestion: true });
    });
  };

  return (
    <div className={s.actions}>
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
        onClick={() => openNodeSettings(dragRef, element)}
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

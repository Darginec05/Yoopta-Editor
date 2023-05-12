import DragIcon from './icons/drag.svg';
import PlusIcon from './icons/plus.svg';
import {
  NodeSettingsContextHandlers,
  NodeSettingsContextValues,
} from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { MouseEvent, useRef } from 'react';
import { ReactEditor } from 'slate-react';
import { Editor, Element } from 'slate';
import cx from 'classnames';
import { DraggedNode } from '../../hooks/useDragDrop';
import { YooptaBaseElement } from '../../types';
import { ElementOptions } from '../ElementOptions/ElementOptions';
import s from './ElementWrapper.module.scss';

type Props = {
  editor: Editor;
  element: YooptaBaseElement<string>;
  values: NodeSettingsContextValues;
  handlers: NodeSettingsContextHandlers;
};

const ElementActions = ({ element, editor, values, handlers }: Props) => {
  const dragRef = useRef<HTMLButtonElement>(null);
  const { hoveredElement, isElementOptionsOpen, nodeSettingsPos } = values;
  const { onDragEnd, onDragStart, openNodeSettings, closeNodeSettings, triggerPlusButton } = handlers;

  const onMouseDown = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const handler = dragRef.current;

    const targetNode = document.querySelector<HTMLDivElement>(`[data-element-id="${element?.id}"]`);
    const pathNode = ReactEditor.findPath(editor, element);
    const parentNode = Editor.parent(editor, pathNode);

    if (!Element.isElement(element)) return;

    handler?.setAttribute('draggable', 'false');

    if (targetNode) {
      targetNode.setAttribute('draggable', 'true');

      targetNode.ondragstart = (event) => {
        const from: DraggedNode = {
          path: pathNode,
          element: { id: element.id, type: element.type },
          parent: parentNode,
        };
        onDragStart(event, from);
      };
      targetNode.ondragend = onDragEnd;
    }
  };

  const isElementHovered = hoveredElement?.id === element.id;

  return (
    <div contentEditable={false} className={cx(s.actions, { [s.hovered]: isElementHovered }, 'yoopta-element-actions')}>
      {isElementHovered && isElementOptionsOpen && (
        <ElementOptions element={element} style={nodeSettingsPos || undefined} onClose={closeNodeSettings} />
      )}
      <button
        type="button"
        onMouseDown={onMouseDown}
        className={cx(s.actionButton, s.plusButton, 'yoopta-element-actions-plus')}
        onClick={() => triggerPlusButton(element)}
      >
        <PlusIcon />
      </button>
      <button
        type="button"
        onMouseDown={onMouseDown}
        className={cx(s.actionButton, 'yoopta-element-actions-drag')}
        onClick={() => openNodeSettings(dragRef, element)}
        ref={dragRef}
      >
        <DragIcon />
      </button>
    </div>
  );
};

export { ElementActions };

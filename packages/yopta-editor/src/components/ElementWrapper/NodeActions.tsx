import DragIcon from './icons/drag.svg';
import {
  NodeSettingsContextHandlers,
  NodeSettingsContextValues,
} from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { MouseEvent, useRef } from 'react';
import { ReactEditor } from 'slate-react';
import { Editor, Element } from 'slate';
import cx from 'classnames';
import { DraggedNode } from '../../hooks/useDragDrop';
import { YoptaBaseElement } from '../../types';
import s from './ElementWrapper.module.scss';
import { NodeOptions } from '../ElementOptions/NodeOptions';

type Props = {
  editor: Editor;
  element: YoptaBaseElement<string>;
  values: NodeSettingsContextValues;
  handlers: NodeSettingsContextHandlers;
};

const NodeActions = ({ element, editor, values, handlers }: Props) => {
  const dragRef = useRef<HTMLButtonElement>(null);
  const { hoveredElement, isNodeSettingsOpen, nodeSettingsPos } = values;
  const { onDragEnd, onDragStart, openNodeSettings, closeNodeSettings } = handlers;

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
        // handler!.style.cursor = 'grabbing';
        const from: DraggedNode = { path: pathNode, element: { id: element.id, type: element.type } };
        onDragStart(event, from);
      };
      targetNode.ondragend = onDragEnd;
    }
  };

  const isElementHovered = hoveredElement?.id === element.id;

  return (
    <div contentEditable={false} className={cx(s.actions, { [s.hovered]: isElementHovered })}>
      {isElementHovered && isNodeSettingsOpen && (
        <NodeOptions element={element} style={nodeSettingsPos} onClose={closeNodeSettings} />
      )}
      <button
        type="button"
        onMouseDown={onMouseDown}
        className={s.actionButton}
        onClick={() => openNodeSettings(dragRef, element)}
        ref={dragRef}
      >
        <DragIcon />
      </button>
    </div>
  );
};

export { NodeActions };

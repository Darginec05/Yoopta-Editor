import DragIcon from './icons/drag.svg';
import {
  NodeSettingsContextHandlers,
  NodeSettingsContextValues,
  useNodeSettingsContext,
} from '../../contexts/NodeSettingsContext/NodeSettingsContext';
import { CSSProperties, MouseEvent, useRef } from 'react';
import { ReactEditor } from 'slate-react';
import { Editor, Element } from 'slate';
import cx from 'classnames';
import { DraggedNode } from '../../hooks/useDragDrop';
import { YoptaBaseElement } from '../../types';
import s from './ElementWrapper.module.scss';

type Props = {
  editor: Editor;
  element: YoptaBaseElement<string>;
  values: NodeSettingsContextValues;
  handlers: NodeSettingsContextHandlers;
};

const NodeActions = ({ element, editor, values, handlers }: Props) => {
  const dragRef = useRef<HTMLButtonElement>(null);
  const { hoveredNode } = values;
  const { onDragEnd, onDragStart } = handlers;

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

  return (
    <div contentEditable={false} className={cx(s.actions, { [s.hovered]: element.id === hoveredNode?.id })}>
      <button type="button" onMouseDown={onMouseDown} className={s.actionButton} onClick={() => {}} ref={dragRef}>
        <DragIcon />
      </button>
    </div>
  );
};

export { NodeActions };

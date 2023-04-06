import { DragEvent, useState } from 'react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { ELEMENT_TYPES_MAP } from '../components/Editor/constants';
import { YoEditor } from '../types';

export type DndState = { fromPath: number[] | null; toPath: number[] | null };

export type DragDropValues = {
  dndState: DndState;
  disableWhileDrag: boolean;
};

export type DragDropHandlers = {
  onDrop: (_e: DragEvent<HTMLDivElement>) => void;
  onDragEnter: (_e: DragEvent<HTMLDivElement>) => void;
  onDragEnd: (_e) => void;
  onDragStart: (_e, _data?: any) => void;
};

export const useDragDrop = (editor: YoEditor): [DragDropValues, DragDropHandlers] => {
  const [disableWhileDrag, setIsDisableByDrag] = useState(false);
  const [dndState, setDndState] = useState<DndState>({ fromPath: null, toPath: null });

  const onDragEnter = (e) => {
    const target = e.target.closest('section');

    if (target) {
      const isListItem = target.dataset.nodeType === ELEMENT_TYPES_MAP['list-item'];

      if (isListItem) return false;

      const enteredIndex = [...target.parentNode.children].indexOf(target);
      const toPath = [enteredIndex, 0];
      setDndState((p) => ({ ...p, toPath }));
    }
  };

  const onDragEnd = (e) => {
    e.target.removeAttribute('draggable');
    e.target.ondragstart = null;
    e.target.ondragend = null;
    e.target.ondragenter = null;
    e.target.ondragover = null;

    setIsDisableByDrag(false);
    setDndState({ fromPath: null, toPath: null });
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    if (
      dndState.fromPath?.toString() === dndState.toPath?.toString() ||
      dndState.fromPath === null ||
      dndState.toPath === null
    ) {
      return undefined;
    }

    Transforms.moveNodes(editor, {
      at: [dndState.fromPath[0]],
      to: [dndState.toPath[0]],
      mode: 'highest',
      match: (node) => Editor.isEditor(editor) && SlateElement.isElement(node),
    });

    e.dataTransfer.clearData();
  };

  const onDragStart = (e: DragEvent<HTMLDivElement>, fromPath: number[]) => {
    setIsDisableByDrag(true);

    e.dataTransfer.setData('Text', '');
    e.dataTransfer.effectAllowed = 'move';

    const editorEl = document.getElementById('yopta-contenteditable');

    if (editorEl) {
      editorEl.ondragenter = onDragEnter;
      editorEl.ondragover = (event) => {
        event.preventDefault();
        return false;
      };
      setDndState((prevDragState) => ({ ...prevDragState, fromPath }));
    }
  };

  const values = { dndState, disableWhileDrag };
  const handlers = {
    onDrop,
    onDragEnd,
    onDragEnter,
    onDragStart,
  };

  return [values, handlers];
};

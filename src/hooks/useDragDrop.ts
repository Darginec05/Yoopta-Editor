import { DragEvent, useState } from 'react';
import { Editor, Transforms, Element as SlateElement } from 'slate';

export type DragDropValues = {
  dndState: { from: number, to: number },
  disableWhileDrag: boolean;
};

export type DragDropHandlers = {
  onDrop: (_e) => void;
  onDragEnd: (_e) => void;
  onDragEnter: (_e) => void;
  onDragStart: (_e) => void;
};

export const useDragDrop = (editor: Editor): [DragDropValues, DragDropHandlers] => {
  const [disableWhileDrag, setIsDisableByDrag] = useState(false);
  const [dndState, setDndState] = useState({ from: -1, to: -1 });

  const onDragEnter = (e) => {
    const target = e.target.closest('section');

    if (target) {
      setDndState((p) => ({ ...p, to: [...target.parentNode.children].indexOf(target) }));
    }
  };

  const onDragEnd = (e) => {
    e.target.removeAttribute('draggable');
    e.target.ondragstart = null;
    e.target.ondragend = null;
    e.target.ondragenter = null;
    e.target.ondragover = null;

    setIsDisableByDrag(false);
    setDndState({ from: -1, to: -1 });
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    if (dndState.from === dndState.to || dndState.from === -1 || dndState.to === -1) return undefined;

    Transforms.moveNodes(editor, {
      at: [dndState.from],
      to: [dndState.to],
      match: (node) => Editor.isEditor(editor) && SlateElement.isElement(node) && node.type !== 'list-item',
    });

    e.dataTransfer.clearData();
  };

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    setIsDisableByDrag(true);

    e.dataTransfer.setData('Text', '');
    e.dataTransfer.effectAllowed = 'move';

    const target = e.target as HTMLDivElement;
    if (target.parentNode) {
      // @ts-ignore
      target.parentNode.ondragenter = onDragEnter;
      // @ts-ignore
      target.parentNode.ondragover = (event) => {
        event.preventDefault();
        return true;
      };
      const fromIndex = Array.from(target.parentNode.children).indexOf(target);
      setDndState((prevDrag) => ({ ...prevDrag, from: fromIndex }));
    }
  };

  return [
    { dndState, disableWhileDrag },
    {
      onDrop,
      onDragEnd,
      onDragEnter,
      onDragStart,
    },
  ];
};

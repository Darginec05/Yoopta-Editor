import { useState } from 'react';
import { Editor, Transforms, Element as SlateElement } from 'slate';

export const useDragDrop = (editor) => {
  const [isDisableByDrag, setIsDisableByDrag] = useState(false);
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

  const onDrop = () => {
    if (dndState.from === dndState.to || dndState.from === -1 || dndState.to === -1) return undefined;

    Transforms.moveNodes(editor, {
      at: [dndState.from],
      to: [dndState.to],
      match: (node) => Editor.isEditor(editor) && SlateElement.isElement(node) && node.type !== 'list-item',
    });
  };

  const onDragStart = (e) => {
    setIsDisableByDrag(true);

    e.dataTransfer.setData('Text', '');
    e.dataTransfer.effectAllowed = 'move';
    e.target.parentNode.ondragenter = onDragEnter;
    e.target.parentNode.ondragover = (event) => {
      event.preventDefault();
      return true;
    };

    const fromIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
    setDndState((prevDrag) => ({ ...prevDrag, from: fromIndex }));
  };

  return {
    onDrop,
    dndState,
    onDragEnd,
    onDragEnter,
    onDragStart,
    isDisableByDrag,
  };
};

import { useState } from 'react';
import { Editor, Transforms, Element as SlateElement } from 'slate';

export const useDragDrop = ({ editor }) => {
  const [readOnly, setReadOnly] = useState(false);
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

    setReadOnly(false);
    setDndState({ from: -1, to: -1 });
  };

  const onDrop = () => {
    if (dndState.from === dndState.to || dndState.from === -1 || dndState.to === -1) return undefined;

    Transforms.moveNodes(editor, {
      // This will again be expanded to a range of the entire node at `[2]`.
      at: [dndState.from],
      // Matches nodes with a longer path, which are the children.
      to: [dndState.to],
      match: (node) => Editor.isEditor(editor) && SlateElement.isElement(node),
    });
  };

  const onDragStart = (e) => {
    setReadOnly(true);

    e.dataTransfer.setData('Text', '');
    e.dataTransfer.effectAllowed = 'move';
    e.target.parentNode.ondragenter = onDragEnter;
    e.target.parentNode.ondragover = (event) => {
      event.preventDefault();
      return true;
    };

    setDndState((prevDrag) => ({ ...prevDrag, from: [...e.target.parentNode.children].indexOf(e.target) }));
  };

  return {
    onDragEnd,
    onDragStart,
    onDragEnter,
    onDrop,
    isDisableByDrag: readOnly,
    dndState,
  };
};

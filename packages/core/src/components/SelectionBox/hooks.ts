import { useEffect, useState } from 'react';
import { RectangeSelectionProps, RectangeSelectionState } from './SelectionBox';

const findBlocksUnderSelection = (origin, coords) => {
  const blocksUnderSelection: number[] = [];

  const blocks = document.querySelectorAll('[data-yoopta-block]');

  blocks.forEach((blockEl, i) => {
    if (!blockEl) return;

    const blockRect = blockEl.getBoundingClientRect();
    const selectionRect = {
      top: Math.min(origin[1], coords[1]),
      left: Math.min(origin[0], coords[0]),
      bottom: Math.max(origin[1], coords[1]),
      right: Math.max(origin[0], coords[0]),
    };

    if (
      selectionRect.top < blockRect.bottom &&
      selectionRect.bottom > blockRect.top &&
      selectionRect.left < blockRect.right &&
      selectionRect.right > blockRect.left
    ) {
      blocksUnderSelection.push(i);
    }
  });

  return blocksUnderSelection;
};

type RectangeSelectionReturn = RectangeSelectionState & {
  onClose: () => void;
};

// Maybe move to a separate npm package?
export const useRectangeSelectionBox = ({
  editor,
  yooptaEditorRef,
  root,
}: RectangeSelectionProps): RectangeSelectionReturn => {
  const [state, setState] = useState<RectangeSelectionState>({
    origin: [0, 0],
    coords: [0, 0],
    selection: false,
  });

  const onMouseDown = (event) => {
    const isInsideEditor = yooptaEditorRef.current?.contains(event.target as Node);

    if (
      !isInsideEditor &&
      !state.selection &&
      Array.isArray(editor.selectedBlocks) &&
      editor.selectedBlocks.length > 0
    ) {
      editor.setBlockSelected(null);
      return onClose();
    }

    if (isInsideEditor) return;

    // const slate = findSlateBySelectionPath(editor);
    // if (slate) {
    // ReactEditor.blur(slate);
    // ReactEditor.deselect(slate);
    // Transforms.deselect(slate);
    // }

    setState({
      origin: [event.pageX, event.pageY - window.pageYOffset],
      coords: [event.pageX, event.pageY - window.pageYOffset],
      selection: true,
    });
  };

  const onMouseMove = (event) => {
    if (!state.selection) return;

    setState((prevState) => ({
      ...prevState,
      coords: [event.pageX, event.pageY - window.pageYOffset],
    }));

    const blocksUnderSelection = findBlocksUnderSelection(state.origin, [
      event.pageX,
      event.pageY - window.pageYOffset,
    ]);

    editor.setBlockSelected(blocksUnderSelection, { only: true });
  };

  const onMouseUp = () => {
    onClose();
  };

  const getRootElement = () => {
    if (root && 'current' in root) return root.current;
    if (root) return root;
    return document;
  };

  useEffect(() => {
    const elementMouseEl = getRootElement();

    if (!elementMouseEl) {
      throw new Error('Root element not found. Please check the `selectionBoxRoot` prop');
    }

    if (!('nodeType' in elementMouseEl)) {
      throw new Error('Root element should be a DOM element or a ref object. Please check the `selectionBoxRoot` prop');
    }

    if (yooptaEditorRef.current?.contains(elementMouseEl)) {
      throw new Error('Root element should not be a child of the editor. Please check the `selectionBoxRoot` prop');
    }

    elementMouseEl.addEventListener('mousedown', onMouseDown);
    elementMouseEl.addEventListener('mousemove', onMouseMove);
    elementMouseEl.addEventListener('mouseup', onMouseUp);

    return () => {
      elementMouseEl.removeEventListener('mousedown', onMouseDown);
      elementMouseEl.removeEventListener('mousemove', onMouseMove);
      elementMouseEl.removeEventListener('mouseup', onMouseUp);
    };
  }, [editor.selectedBlocks, state, root]);

  const onClose = () => {
    setState({
      origin: [0, 0],
      coords: [0, 0],
      selection: false,
    });
  };

  return {
    ...state,
    onClose,
  };
};

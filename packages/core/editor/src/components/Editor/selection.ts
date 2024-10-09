import { useRef } from 'react';
import { Editor, Range, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { Blocks } from '../../editor/blocks';
import { Paths } from '../../editor/paths';
import { YooEditor, YooptaBlockPath } from '../../editor/types';

type MultiSelectionOptions = {
  editor: YooEditor;
};

export function useMultiSelection({ editor }: MultiSelectionOptions) {
  const isMultiSelectingStarted = useRef(false);
  const isMultiSelectingInProgress = useRef(false);
  const startBlockPathRef = useRef<number | null>(null);
  const currentBlockPathRef = useRef<number | null>(null);

  const blurSlateSelection = (blockPath?: YooptaBlockPath) => {
    const path = blockPath || editor.selection;

    if (path) {
      const slate = Blocks.getSlate(editor, { at: path });
      if (!slate) return;

      Editor.withoutNormalizing(slate, () => {
        // [TEST]
        Transforms.select(slate, [0]);

        if (slate.selection && Range.isExpanded(slate.selection)) {
          ReactEditor.blur(slate);
          ReactEditor.deselect(slate);
        }
      });
    }
  };

  const onShiftKeyDown = (blockOrder: number) => {
    blurSlateSelection();

    const currentSelectionIndex = Paths.getPath(editor.selection)?.[0] || 0;
    const indexesBetween = Array.from({ length: Math.abs(blockOrder - currentSelectionIndex) }).map((_, index) =>
      blockOrder > currentSelectionIndex ? currentSelectionIndex + index + 1 : currentSelectionIndex - index - 1,
    );

    console.log('indexesBetween', [...indexesBetween, currentSelectionIndex]);

    // editor.setBlockSelected(, { only: true });
    editor.setSelection([blockOrder, [...indexesBetween, currentSelectionIndex]]);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (editor.readOnly) return;

    editor.batchOperations(() => {
      const selectedBlocks = Paths.getSelectedPaths(editor.selection);
      // [TEST]
      if (Array.isArray(selectedBlocks) && selectedBlocks.length > 0 && !e.shiftKey && !e.altKey) {
        editor.setSelection([null]);
      }

      const target = e.target as HTMLElement;
      const blockElement = target.closest('[data-yoopta-block]');

      if (blockElement && e.button === 0) {
        const blockId = blockElement.getAttribute('data-yoopta-block-id') || '';
        const blockOrder = editor.children[blockId]?.meta.order;

        if (typeof blockOrder === 'number') {
          isMultiSelectingStarted.current = true;
          startBlockPathRef.current = blockOrder;
          currentBlockPathRef.current = blockOrder;

          if (e.shiftKey && Array.isArray(editor.selection) && blockOrder !== editor.selection?.[0]) {
            onShiftKeyDown(blockOrder);
            return;
          }

          if (blockOrder !== editor.selection?.[0]) {
            editor.setSelection([blockOrder]);
          }

          editor.refElement?.addEventListener('mousemove', onMouseMove);
          editor.refElement?.addEventListener('mouseup', onMouseUp);
        }
      }
    });
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isMultiSelectingStarted.current || editor.readOnly) return;

    const target = document.elementFromPoint(e.clientX, e.clientY);
    const blockElement = target?.closest('[data-yoopta-block]');

    if (blockElement) {
      editor.batchOperations(() => {
        const blockId = blockElement.getAttribute('data-yoopta-block-id') || '';
        const blockOrder = editor.children[blockId]?.meta.order;

        // When multi-selecting is started and the mouse is moving over the start block
        if (
          isMultiSelectingInProgress.current &&
          typeof blockOrder === 'number' &&
          blockOrder === startBlockPathRef.current
        ) {
          currentBlockPathRef.current = blockOrder;
          editor.setSelection([blockOrder, [blockOrder]]);
          return;
        }

        // Multi-selecting started between blocks
        if (typeof blockOrder === 'number' && blockOrder !== currentBlockPathRef.current) {
          currentBlockPathRef.current = blockOrder;
          isMultiSelectingInProgress.current = true;

          const start = Math.min(startBlockPathRef.current!, blockOrder);
          const end = Math.max(startBlockPathRef.current!, blockOrder);

          blurSlateSelection();

          const selectedBlocks = Array.from({ length: end - start + 1 }, (_, i) => start + i);
          editor.setSelection([blockOrder, selectedBlocks]);
        }
      });
    }
  };

  const onMouseUp = () => {
    isMultiSelectingStarted.current = false;
    isMultiSelectingInProgress.current = false;
    startBlockPathRef.current = null;
    currentBlockPathRef.current = null;
    editor.refElement?.removeEventListener('mousemove', onMouseMove);
    editor.refElement?.removeEventListener('mouseup', onMouseUp);
  };

  return { onMouseDown };
}

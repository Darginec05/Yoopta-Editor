import { YooptaOperation } from '../core/applyTransforms';
import { YooEditor, YooptaBlockPath } from '../types';

// export function moveBlock(editor: YooEditor, draggedBlockId: string, newPath: YooptaBlockPath) {
//   editor.children = createDraft(editor.children);

//   const [updatedPosition] = newPath;
//   const draggedBlock = editor.children[draggedBlockId!];
//   const blockInNewPosition = Object.values(editor.children).find((item) => item.meta.order === updatedPosition)!;

//   const dragFromTopToBottom = draggedBlock.meta.order < blockInNewPosition.meta.order;
//   const dragFromBottomToTop = draggedBlock.meta.order > blockInNewPosition.meta.order;

//   Object.values(editor.children).forEach((item) => {
//     if (dragFromTopToBottom) {
//       if (item.meta.order > draggedBlock.meta.order && item.meta.order <= blockInNewPosition.meta.order) {
//         item.meta.order--;
//       }
//     } else if (dragFromBottomToTop) {
//       if (item.meta.order < draggedBlock.meta.order && item.meta.order >= blockInNewPosition.meta.order) {
//         item.meta.order++;
//       }
//     }
//   });

//   draggedBlock.meta.order = updatedPosition;
//   draggedBlock.meta.depth = blockInNewPosition.meta.depth;

//   editor.setSelection([updatedPosition]);
//   editor.children = finishDraft(editor.children);
//   // editor.applyChanges();
//   editor.emit('change', editor.children);
// }

export function moveBlock(editor: YooEditor, draggedBlockId: string, newPath: YooptaBlockPath) {
  const [updatedPosition] = newPath;
  const draggedBlock = editor.children[draggedBlockId];
  const blockInNewPosition = Object.values(editor.children).find((item) => item.meta.order === updatedPosition);

  if (!draggedBlock || !blockInNewPosition) {
    console.warn('Invalid block ids for move operation');
    return;
  }

  const operations: YooptaOperation[] = [];

  const dragFromTopToBottom = draggedBlock.meta.order < blockInNewPosition.meta.order;
  const dragFromBottomToTop = draggedBlock.meta.order > blockInNewPosition.meta.order;

  Object.values(editor.children).forEach((item) => {
    let newOrder = item.meta.order;

    if (dragFromTopToBottom) {
      if (item.meta.order > draggedBlock.meta.order && item.meta.order <= blockInNewPosition.meta.order) {
        newOrder--;
      }
    } else if (dragFromBottomToTop) {
      if (item.meta.order < draggedBlock.meta.order && item.meta.order >= blockInNewPosition.meta.order) {
        newOrder++;
      }
    }

    if (newOrder !== item.meta.order) {
      operations.push({
        type: 'set_block_meta',
        id: item.id,
        prevProperties: {
          ...item.meta,
        },
        properties: {
          ...item.meta,
          // order: newOrder,
        },
      });
    }
  });

  operations.push({
    type: 'set_block_meta',
    id: draggedBlockId,
    prevProperties: {
      ...draggedBlock.meta,
    },
    properties: {
      ...draggedBlock.meta,
      // order: updatedPosition!,
      depth: blockInNewPosition.meta.depth,
    },
  });

  editor.applyTransforms(operations);
  editor.setSelection([updatedPosition]);
}

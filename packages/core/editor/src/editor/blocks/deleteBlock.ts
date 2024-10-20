import { YooEditor, YooptaPathIndex } from '../types';
import { YooptaOperation } from '../core/applyTransforms';
import { Paths } from '../paths';
import { getSlate } from './getSlate';

type DeleteBlockByIdOptions = {
  blockId: string;
  at?: never;
};

type DeleteBlockByPathOptions = {
  at: YooptaPathIndex;
  blockId?: never;
};

export type DeleteBlockOptions =
  | (DeleteBlockByIdOptions & { focus?: boolean })
  | (DeleteBlockByPathOptions & { focus?: boolean });

export function deleteBlock(editor: YooEditor, options: DeleteBlockOptions) {
  const { focus, blockId, at } = options;

  if (!blockId && typeof at !== 'number') {
    throw new Error('blockId or path should be provided');
  }

  const block = editor.getBlock({ id: blockId, at });

  if (!block) {
    throw new Error(`Block not found`);
  }

  // const isLastBlock = Object.values(editor.children).length === 1;
  // if (isLastBlock) return;

  const blockToDelete = editor.children[block.id];
  const operations: YooptaOperation[] = [];

  operations.push({
    type: 'delete_block',
    block: blockToDelete,
    path: editor.path,
  });

  editor.applyTransforms(operations);

  if (focus) {
    const prevBlockPath = Paths.getPreviousPath(editor);
    if (prevBlockPath) {
      const prevBlock = editor.getBlock({ at: prevBlockPath });
      const prevSlate = getSlate(editor, { id: prevBlock?.id });

      const lastNodePoint = Paths.getLastNodePoint(prevSlate);

      if (prevSlate && prevBlock) {
        editor.focusBlock(prevBlock.id, { focusAt: lastNodePoint });
      }
    }
  }
}

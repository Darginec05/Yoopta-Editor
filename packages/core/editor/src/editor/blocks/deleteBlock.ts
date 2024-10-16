import { YooEditor, YooptaPathIndex } from '../types';
import { YooptaOperation } from '../core/applyTransforms';
import { Paths } from '../paths';

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

  if (!blockId && !at) {
    throw new Error('blockId or path should be provided');
  }

  const block = editor.getBlock({ id: blockId, at });

  if (!block) {
    throw new Error(`Block not found`);
  }

  const blockToDelete = editor.children[block.id];
  const operations: YooptaOperation[] = [];

  operations.push({
    type: 'delete_block',
    block: blockToDelete,
    path: editor.path,
  });

  // Object.values(editor.children).forEach((block) => {
  //   if (block.meta.order > blockToDelete.meta.order) {
  //     operations.push({
  //       type: 'set_block_meta',
  //       id: block.id,
  //       properties: { order: block.meta.order - 1 },
  //       prevProperties: { order: block.meta.order },
  //     });
  //   }
  // });

  editor.applyTransforms(operations);

  if (focus) {
    const prevBlockPath = Paths.getPreviousPath(editor);
    const prevBlock = editor.getBlock({ at: prevBlockPath });

    if (prevBlock) {
      editor.focusBlock(prevBlock.id);
    }
  }
}

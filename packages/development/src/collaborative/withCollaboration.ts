import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';
import { YooEditor, YooptaOperation } from '@yoopta/editor';

const LOCAL_ORIGIN = 'yoopta-local-change';

export const withCollaboration = (editor: YooEditor, provider: HocuspocusProvider, blocks: Y.Map<any>) => {
  const { applyTransforms } = editor;

  blocks.observe((event, transaction) => {
    if (transaction.origin === LOCAL_ORIGIN) return;

    console.log('CHANGE FROM REMOTE:', event.changes.keys);
    event.changes.keys.forEach((change, key) => {
      const blockId = key;

      switch (change.action) {
        case 'add': {
          const block = blocks.get(blockId);
          if (!block) return;

          editor.withoutSavingHistory(() => {
            editor.applyTransforms([
              {
                type: 'insert_block',
                path: { current: block.meta.order },
                block,
              },
            ]);
          });
          break;
        }

        case 'delete': {
          const existingBlock = editor.children[blockId];
          if (!existingBlock) return;

          editor.withoutSavingHistory(() => {
            editor.applyTransforms([
              {
                type: 'delete_block',
                path: { current: existingBlock.meta.order },
                block: existingBlock,
              },
            ]);
          });
          break;
        }

        case 'update': {
          const block = blocks.get(blockId);
          const existingBlock = editor.children[blockId];
          if (!block || !existingBlock) return;

          editor.withoutSavingHistory(() => {
            if (JSON.stringify(block.value) !== JSON.stringify(existingBlock.value)) {
              editor.applyTransforms([
                {
                  type: 'set_block_value',
                  id: blockId,
                  value: block.value,
                },
              ]);
            }

            console.log('update: run move_block?', block.meta.order !== existingBlock.meta.order);

            if (block.meta.order !== existingBlock.meta.order) {
              editor.applyTransforms([
                {
                  type: 'move_block',
                  prevProperties: {
                    id: blockId,
                    order: existingBlock.meta.order,
                  },
                  properties: {
                    id: blockId,
                    order: block.meta.order,
                  },
                },
              ]);
            }
          });
          break;
        }
      }
    });
  });

  editor.applyTransforms = (operations: YooptaOperation[], options?: any) => {
    applyTransforms(operations, options);

    provider.document.transact(() => {
      console.log('__CHANGES FROM ME__', operations);
      operations.forEach((op) => {
        switch (op.type) {
          case 'insert_block': {
            blocks.set(op.block.id, op.block);
            break;
          }

          case 'delete_block': {
            blocks.delete(op.block.id);
            break;
          }

          case 'set_block_value': {
            const block = editor.children[op.id];
            if (block) {
              blocks.set(op.id, block);
            }
            break;
          }

          case 'move_block': {
            const block = editor.children[op.properties.id];
            if (block) {
              blocks.set(op.properties.id, block);
            }
            break;
          }

          case 'set_block_meta': {
            const block = editor.children[op.id];
            if (block) {
              blocks.set(op.id, block);
            }
            break;
          }
        }
      });
    }, LOCAL_ORIGIN);
  };

  return editor;
};

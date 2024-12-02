import * as Y from 'yjs';
import { Blocks, SlateElement, YooEditor, YooptaBlockData, YooptaOperation } from '@yoopta/editor';

const LOCAL_ORIGIN = Symbol('yoopta-local-change');
const CONNECTED: WeakSet<YjsYooEditor> = new WeakSet();

export type YjsYooEditor = YooEditor & {
  sharedRoot: Y.Map<YooptaBlockData>;
  localOrigin: symbol;
  isLocalOrigin: (origin: symbol) => boolean;
  applyRemoteEvents: (events: any[], origin: symbol) => void;
  connect: () => void;
  disconnect: () => void;
};

export const withCollaboration = (editor: YjsYooEditor, sharedRoot: Y.Map<YooptaBlockData>) => {
  const { applyTransforms } = editor;

  editor.sharedRoot = sharedRoot;
  editor.localOrigin = LOCAL_ORIGIN;
  editor.isLocalOrigin = (origin) => origin === editor.localOrigin;

  editor.applyRemoteEvents = (events, origin) => {
    events.forEach((event) => {
      if (!(event instanceof Y.YMapEvent)) return;
      const operations: YooptaOperation[] = [];

      console.log('event.keys', event.keys.entries());
      console.log('editor.sharedRoot', editor.sharedRoot.entries().next().value);
      Array.from(event.keys).forEach(([blockId, change]) => {
        if (change.action === 'add') {
          const block = editor.sharedRoot.get(blockId);
          if (!block) return;

          operations.push({
            type: 'insert_block',
            path: { current: block.meta.order },
            block,
          });
        } else if (change.action === 'delete') {
          const existingBlock = editor.children[blockId];
          if (!existingBlock) return;

          operations.push({
            type: 'delete_block',
            path: { current: existingBlock.meta.order },
            block: existingBlock,
          });
        } else if (change.action === 'update') {
          const updatedBlock = editor.sharedRoot.get(blockId);
          const existingBlock = editor.children[blockId];

          if (!updatedBlock || !existingBlock) return;

          const isBlockOrderChanged = updatedBlock.meta.order !== existingBlock.meta.order;
          const isMetaChanged = JSON.stringify(updatedBlock.meta) !== JSON.stringify(existingBlock.meta);
          const isValueChanged = JSON.stringify(updatedBlock.value) !== JSON.stringify(existingBlock.value);

          if (isBlockOrderChanged) {
            operations.push({
              type: 'move_block',
              prevProperties: { id: existingBlock.id, order: existingBlock.meta.order },
              properties: { id: updatedBlock.id, order: updatedBlock.meta.order },
            });
          }

          if (isMetaChanged && !isBlockOrderChanged) {
            operations.push({
              type: 'set_block_meta',
              id: updatedBlock.id,
              properties: { align: updatedBlock.meta.align, depth: updatedBlock.meta.depth },
              prevProperties: { align: existingBlock.meta.align, depth: existingBlock.meta.depth },
            });
          }

          if (isValueChanged) {
            const slate = Blocks.getBlockSlate(editor, { id: updatedBlock.id });
            // operations.push({
            //   type: 'set_block_value',
            //   id: updatedBlock.id,
            //   value: updatedBlock.value as SlateElement[],
            // });
          }
        }
      });

      if (operations.length) {
        editor.withoutSavingHistory(() => editor.applyTransforms(operations, { validatePaths: true }));
      }
    });
  };

  function handleYEvents(events: Y.YEvent<any>[], transaction: Y.Transaction) {
    if (editor.isLocalOrigin(transaction.origin)) {
      return;
    }

    editor.applyRemoteEvents(events, transaction.origin);
  }

  editor.connect = () => {
    editor.sharedRoot.observeDeep(handleYEvents);
    // const content = yMapToYooptaContent(e.sharedRoot);
    // editor.setEditorValue(content);
    CONNECTED.add(editor);
  };

  editor.disconnect = () => {
    editor.sharedRoot.unobserveDeep(handleYEvents);
    CONNECTED.delete(editor);
  };

  editor.applyTransforms = (operations: YooptaOperation[], options?: any) => {
    applyTransforms(operations, { ...options, validatePaths: true });

    editor.sharedRoot.doc?.transact(() => {
      operations.forEach((op) => {
        switch (op.type) {
          case 'insert_block': {
            editor.sharedRoot.set(op.block.id, op.block);
            break;
          }

          case 'delete_block': {
            editor.sharedRoot.delete(op.block.id);
            break;
          }

          case 'merge_block': {
            console.log('merge_block', op);
            break;
          }

          case 'split_block': {
            console.log('split_block', op);

            break;
          }

          case 'move_block': {
            const block = editor.sharedRoot.get(op.properties.id);
            if (!block) return;
            const reorderedBlock = { ...block, meta: { ...block.meta, order: op.properties.order } };
            editor.sharedRoot.set(block.id, reorderedBlock);
            break;
          }

          case 'set_block_meta': {
            const block = editor.sharedRoot.get(op.id);
            if (!block) return;
            const updatedBlock = { ...block, meta: { ...block.meta, ...op.properties } };
            editor.sharedRoot.set(block.id, updatedBlock);
            break;
          }

          case 'set_block_value': {
            const block = editor.sharedRoot.get(op.id);
            if (!block) return;
            const updatedBlock = { ...block, value: op.value };
            editor.sharedRoot.set(block.id, updatedBlock);
            break;
          }
        }
      });
    }, editor.localOrigin);
  };

  return editor;
};

import { createDraft, finishDraft, isDraft, produce } from 'immer';
import { buildSlateEditor } from '../../utils/buildSlate';
import { SlateEditor, SlateElement, YooEditor, YooptaBlockData, YooptaPath } from '../types';
import { Editor, Operation, Range, Transforms } from 'slate';

export type ChangeSource = 'api' | 'user' | 'history';

export type SetSlateOperation = {
  type: 'set_slate';
  slate: SlateEditor;
  blockId: string;
  properties: {
    slateOps: Operation[];
    selectionBefore: Range | null;
  };
};

export type InsertBlockOperation = {
  type: 'insert_block';
  path: YooptaPath;
  block: YooptaBlockData;
  slate?: SlateEditor;
};

export type SetBlockValueOperation = {
  type: 'set_block_value';
  id: string;
  value: SlateElement[];
};

export type SetBlockMetaOperation = {
  type: 'set_block_meta';
  id: string;
  properties: Omit<Partial<YooptaBlockData['meta']>, 'order'>;
  prevProperties: Omit<Partial<YooptaBlockData['meta']>, 'order'>;
};

export type SplitBlockOperation = {
  type: 'split_block';
  properties: YooptaBlockData;
  prevProperties: YooptaBlockData;
  slate?: SlateEditor;
};

export type MergeBlockOperation = {
  type: 'merge_block';
  sourceProperties: YooptaBlockData;
  targetProperties: YooptaBlockData;
  mergedProperties: YooptaBlockData;
  slate?: SlateEditor;
};

export type DeleteBlockOperation = {
  type: 'delete_block';
  path: YooptaPath;
  block: YooptaBlockData;
};

export type SetSelectionBlockOperation = {
  type: 'set_block_path';
  path: YooptaPath;
};

export type NormalizePathsBlockOperation = {
  type: 'normalize_block_paths';
};

export type YooptaOperation =
  | InsertBlockOperation
  | DeleteBlockOperation
  | NormalizePathsBlockOperation
  | SetSelectionBlockOperation
  | SplitBlockOperation
  | SetBlockValueOperation
  | SetBlockMetaOperation
  | MergeBlockOperation
  | SetSlateOperation;

function applyOperation(editor: YooEditor, op: YooptaOperation): void {
  switch (op.type) {
    case 'set_slate': {
      const { properties, blockId } = op;

      const slate = editor.blockEditorsMap[blockId];

      if (slate) {
        const { slateOps, selectionBefore } = properties;

        try {
          Editor.withoutNormalizing(slate, () => {
            for (const slateOp of slateOps) {
              slate.apply(slateOp);
            }

            if (selectionBefore) {
              Transforms.select(slate, selectionBefore);
            }
          });
        } catch (error) {}
      }

      break;
    }

    case 'insert_block': {
      const { path, slate } = op;
      editor.blockEditorsMap[op.block.id] = slate || buildSlateEditor(editor);
      editor.children[op.block.id] = op.block;

      console.log(op.block.id, op.block.meta.order);

      Object.values(editor.children).forEach((existingBlock) => {
        if (existingBlock.meta.order >= op.block.meta.order && existingBlock.id !== op.block.id) {
          if (isDraft(existingBlock)) {
            existingBlock.meta.order++;
          } else {
            produce(existingBlock, (draft) => {
              draft.meta.order++;
            });
          }
        }
      });
      break;
    }

    case 'delete_block': {
      delete editor.blockEditorsMap[op.block.id];
      delete editor.children[op.block.id];

      // if (Object.keys(editor.children).length === 0) {
      //   const id = generateId();
      //   const defaultBlock = buildBlockData({ id });
      //   editor.children[id] = defaultBlock;
      //   editor.blockEditorsMap[id] = buildSlateEditor(editor);
      // }

      Object.values(editor.children).forEach((existingBlock) => {
        if (existingBlock.meta.order > op.block.meta.order) {
          if (isDraft(existingBlock)) {
            existingBlock.meta.order--;
          } else {
            produce(existingBlock, (draft) => {
              draft.meta.order--;
            });
          }
        }
      });

      break;
    }

    case 'set_block_value': {
      const { id, value } = op;
      if (Array.isArray(value)) {
        if (isDraft(editor.children[id])) {
          editor.children[id].value = value;
        } else {
          produce(editor.children[id], (draft) => {
            draft.value = value;
          });
        }
      }
      break;
    }

    case 'set_block_meta': {
      const { id, prevProperties, properties } = op;

      const block = editor.children[id];
      if (!block) break;

      if (isDraft(block)) {
        Object.keys(properties).forEach((key) => {
          block.meta[key] = properties[key];
        });
      } else {
        produce(block, (draft) => {
          draft.meta = { ...draft.meta, ...properties };
        });
      }

      break;
    }

    case 'split_block': {
      const { slate, prevProperties, properties } = op;
      editor.children[properties.id] = properties;
      editor.blockEditorsMap[properties.id] = slate || buildSlateEditor(editor);

      Object.values(editor.children).forEach((block) => {
        if (block.meta.order >= properties.meta.order && block.id !== properties.id) {
          if (isDraft(block)) {
            block.meta.order++;
          } else {
            produce(block, (draft) => {
              draft.meta.order++;
            });
          }
        }
      });
      break;
    }

    case 'merge_block': {
      // sourceProperties - block which should be merged and removed
      // targetProperties - block which should be merged into
      const { sourceProperties, targetProperties, mergedProperties, slate } = op;

      // [TEST]
      // delete editor.blockEditorsMap[sourceProperties.id];
      delete editor.children[sourceProperties.id];
      editor.children[targetProperties.id] = mergedProperties;
      // editor.blockEditorsMap[targetProperties.id] = slate || buildSlateEditor(editor);

      Object.values(editor.children).forEach((block) => {
        if (block.meta.order > sourceProperties.meta.order) {
          if (isDraft(block)) {
            block.meta.order--;
          } else {
            produce(block, (draft) => {
              draft.meta.order--;
            });
          }
        }
      });
      break;
    }

    case 'set_block_path': {
      editor.path = op.path;
      break;
    }

    case 'normalize_block_paths': {
      const blocks = Object.values(editor.children);
      blocks.sort((a, b) => a.meta.order - b.meta.order);
      blocks.forEach((block, index) => {
        if (!isDraft(block.meta)) {
          produce(block, (draft) => {
            draft.meta = { ...draft.meta, order: index };
          });
        } else {
          block.meta.order = index;
        }
      });

      break;
    }
  }
}

export type ApplyTransformsOptions = {
  normalizePaths?: boolean;
  source?: ChangeSource;
};

const MAX_HISTORY_LENGTH = 100;

export function applyTransforms(editor: YooEditor, ops: YooptaOperation[], options?: ApplyTransformsOptions): void {
  editor.children = createDraft(editor.children);
  editor.path = createDraft(editor.path);

  const { normalizePaths = true, source = 'user' } = options || {};
  const operations = [...ops];

  if (normalizePaths) {
    operations.push({ type: 'normalize_block_paths' });
  }

  console.log('applyTransforms operations', operations);

  for (const operation of operations) {
    if (operation.type === 'set_slate' && source === 'api') {
      continue;
    }

    applyOperation(editor, operation);
  }

  if (!isDraft(editor.children)) editor.children = createDraft(editor.children);
  editor.children = finishDraft(editor.children);

  if (isDraft(editor.path)) {
    editor.path = finishDraft(editor.path);
  }

  const historyBatch = {
    operations: operations.filter(
      (op) => op.type !== 'set_block_path' && op.type !== 'set_block_value' && op.type !== 'normalize_block_paths',
    ),
    path: editor.path,
  };

  if (historyBatch.operations.length > 0 && source !== 'history') {
    editor.historyStack.undos.push(historyBatch);
    editor.historyStack.redos = [];
  }

  if (editor.historyStack.undos.length > MAX_HISTORY_LENGTH) {
    editor.historyStack.undos.shift();
  }

  editor.emit('change', { value: editor.children, source, operations });
  editor.emit('path-change', editor.path);

  assertValidPaths(editor);
}

function assertValidPaths(editor: YooEditor) {
  if (process.env.NODE_ENV !== 'production') {
    const blocks = Object.values(editor.children);
    blocks.sort((a, b) => a.meta.order - b.meta.order);
    blocks.forEach((block, index) => {
      if (block.meta.order !== index) {
        console.warn(
          `Block path inconsistency detected: Block ${block.id} has order ${block.meta.order}, expected ${index}`,
        );
      }
    });
  }
}

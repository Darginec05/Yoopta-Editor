import { createDraft, finishDraft, isDraft, produce } from 'immer';
import { buildSlateEditor } from '../../utils/buildSlate';
import { SlateEditor, SlateElement, YooEditor, YooptaBlockData, YooptaBlockPath } from '../types';
import { Editor, Operation, Range, Transforms } from 'slate';

export type SetSlateOperation = {
  type: 'set_slate';
  slate: SlateEditor;
  blockId: string;
  properties: {
    operations: Operation[];
    selectionBefore: Range | null;
  };
};

export type InsertBlockOperation = {
  type: 'insert_block';
  path: YooptaBlockPath;
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
  path: YooptaBlockPath;
  block: YooptaBlockData;
};

export type SetSelectionBlockOperation = {
  type: 'set_selection_block';
  path: YooptaBlockPath;
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
        const { operations, selectionBefore } = properties;
        // console.log('OPERATIONS => set_slate', operations);
        // console.log('OPERATIONS => slate.history', slate.history);
        Editor.withoutNormalizing(slate, () => {
          for (const slateOp of operations) {
            slate.apply(slateOp);
          }
        });
        if (selectionBefore) {
          Transforms.select(slate, selectionBefore);
        }
      }
      break;
    }

    case 'insert_block': {
      const { path, slate } = op;
      editor.blockEditorsMap[op.block.id] = slate || buildSlateEditor(editor);
      editor.children[op.block.id] = op.block;

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

      // [TODO]
      // console.log('delete_block editor.children', Object.keys(editor.children).length);

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
      const { sourceProperties, targetProperties, mergedProperties, slate } = op;

      delete editor.blockEditorsMap[sourceProperties.id];
      delete editor.children[sourceProperties.id];
      editor.children[targetProperties.id] = mergedProperties;
      editor.blockEditorsMap[targetProperties.id] = slate || buildSlateEditor(editor);

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

    case 'set_selection_block': {
      if (!Array.isArray(op.path[1])) op.path[1] = [];
      editor.selection = op.path;
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
};

export function applyTransforms(editor: YooEditor, ops: YooptaOperation[], options?: ApplyTransformsOptions): void {
  editor.children = createDraft(editor.children);
  editor.selection = createDraft(editor.selection);

  const { normalizePaths = true } = options || {};

  const operations = [...ops];

  if (normalizePaths) {
    operations.push({ type: 'normalize_block_paths' });
  }

  // console.log('applyTransforms operations', operations);

  for (const operation of operations) {
    applyOperation(editor, operation);
  }

  editor.children = finishDraft(editor.children);

  if (isDraft(editor.selection)) {
    editor.selection = finishDraft(editor.selection);
  }

  editor.emit('change', editor.children);
  editor.emit('selection-change', editor.selection);

  // console.log(
  //   'orders',
  //   Object.keys(editor.children)
  //     .map((k) => [k, editor.children[k].meta.order])
  //     .sort((a, b) => a[1] - b[1]),
  // );

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

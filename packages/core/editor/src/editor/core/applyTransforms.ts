import { createDraft, finishDraft, isDraft, produce } from 'immer';
import { buildSlateEditor } from '../../utils/buildSlate';
import { SlateEditor, SlateElement, YooEditor, YooptaBlockData, YooptaBlockPath } from '../types';

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
  properties: Partial<YooptaBlockData['meta']>;
  prevProperties: Partial<YooptaBlockData['meta']>;
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
  | MergeBlockOperation;

function applyOperation(editor: YooEditor, op: YooptaOperation): void {
  switch (op.type) {
    case 'insert_block': {
      const { path, slate } = op;
      editor.blockEditorsMap[op.block.id] = slate || buildSlateEditor(editor);
      editor.children[op.block.id] = op.block;
      break;
    }

    case 'set_block_value': {
      const { id, value } = op;
      if (Array.isArray(value)) editor.children[id].value = value;
      break;
    }

    case 'set_block_meta': {
      const { id, prevProperties, properties } = op;

      const block = editor.children[id];
      if (!block) break;

      if (!isDraft(block.meta)) {
        produce(block, (draft) => {
          draft.meta = { ...draft.meta, ...properties };
        });

        break;
      }

      Object.keys(properties).forEach((key) => {
        if (properties[key]) {
          block.meta[key] = properties[key];
        }
      });

      break;
    }

    case 'delete_block': {
      delete editor.blockEditorsMap[op.block.id];
      delete editor.children[op.block.id];
      break;
    }

    case 'split_block': {
      const { slate, prevProperties, properties } = op;
      editor.children[properties.id] = properties;
      editor.blockEditorsMap[properties.id] = slate || buildSlateEditor(editor);
      break;
    }

    case 'merge_block': {
      const { sourceProperties, targetProperties, mergedProperties, slate } = op;

      delete editor.blockEditorsMap[sourceProperties.id];
      delete editor.children[sourceProperties.id];
      editor.children[targetProperties.id] = mergedProperties;
      editor.blockEditorsMap[targetProperties.id] = slate || buildSlateEditor(editor);
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

  console.log('applyTransforms operations', operations);

  for (const operation of operations) {
    applyOperation(editor, operation);
  }

  editor.children = finishDraft(editor.children);

  if (isDraft(editor.selection)) {
    editor.selection = finishDraft(editor.selection);
  }

  editor.emit('change', editor.children);
  editor.emit('selection-change', editor.selection);
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

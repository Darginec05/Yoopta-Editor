import { createDraft, finishDraft, isDraft } from 'immer';
import { buildSlateEditor } from '../../utils/buildSlate';
import { SlateEditor, YooEditor, YooptaBlockData, YooptaBlockPath } from '../types';

type InsertBlockOperation = {
  type: 'insert_block';
  path: YooptaBlockPath;
  block: YooptaBlockData;
  slate?: SlateEditor;
};

type UpdateBlockOperation = {
  type: 'update_block';
  id: string;
  properties: Partial<YooptaBlockData>;
};

type DeleteBlockOperation = {
  type: 'delete_block';
  id: string;
};

type SetSelectionBlockOperation = {
  type: 'set_selection_block';
  path: YooptaBlockPath;
};

type NormalizePathsBlockOperation = {
  type: 'normalize_block_paths';
};

export type YooptaOperation =
  | InsertBlockOperation
  | UpdateBlockOperation
  | DeleteBlockOperation
  | NormalizePathsBlockOperation
  | SetSelectionBlockOperation;

function applyOperation(editor: YooEditor, op: YooptaOperation): void {
  switch (op.type) {
    case 'insert_block':
      const { path, block, slate } = op;

      // [TODO] - Remove this from methods
      // editor.blockEditorsMap.set(block, newSlateEditor);
      editor.blockEditorsMap[block.id] = slate || buildSlateEditor(editor);
      editor.children[block.id] = block;
      break;
    case 'update_block':
      const { id, properties } = op;

      // console.log('update_block id', id);
      // console.log('update_block editor.children', editor.children);
      editor.children[id] = { ...editor.children[id], ...properties };
      break;

    case 'delete_block':
      // editor.blockEditorsMap.delete(editor.children[op.id]);
      delete editor.blockEditorsMap[op.id];
      delete editor.children[op.id];
      break;

    case 'normalize_block_paths':
      const blocks = Object.values(editor.children);
      blocks.sort((a, b) => a.meta.order - b.meta.order);
      blocks.forEach((block, index) => (block.meta.order = index));
      break;

    case 'set_selection_block':
      if (!Array.isArray(op.path[1])) {
        op.path[1] = [];
      }

      editor.selection = op.path;
      break;
  }
}

function isSelectionOperation(op: YooptaOperation): op is SetSelectionBlockOperation {
  return op.type === 'set_selection_block';
}

export function applyTransforms(editor: YooEditor, ops: YooptaOperation[]) {
  editor.children = createDraft(editor.children);
  editor.selection = createDraft(editor.selection);
  console.log('applyTransforms ops', ops);

  for (const op of ops) {
    applyOperation(editor, op);
  }

  // [TEST]
  applyOperation(editor, { type: 'normalize_block_paths' });

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

import { Operation } from 'slate';
import { YooEditor, YooptaBlockPath } from '../types';
import { YooptaOperation } from './applyTransforms';

export type HistoryStack = {
  operations: YooptaOperation[];
  path: YooptaBlockPath;
};

export type HistoryStackName = 'undos' | 'redos';

export function inverseEditorOperation(editor: YooEditor, op: YooptaOperation): YooptaOperation | YooptaOperation[] {
  switch (op.type) {
    case 'insert_block':
      return {
        type: 'delete_block',
        path: op.path,
        block: op.block,
      };

    case 'delete_block':
      return {
        type: 'insert_block',
        path: op.path,
        block: op.block,
      };

    case 'set_block_meta': {
      return {
        type: 'set_block_meta',
        id: op.id,
        properties: op.prevProperties,
        prevProperties: op.properties,
      };
    }

    case 'split_block': {
      return {
        type: 'merge_block',
        sourceProperties: op.properties,
        targetProperties: op.prevProperties,
        mergedProperties: op.prevProperties,
        slate: editor.blockEditorsMap[op.prevProperties.id],
      };
    }

    case 'merge_block': {
      return {
        type: 'split_block',
        prevProperties: op.targetProperties,
        properties: op.sourceProperties,
        slate: editor.blockEditorsMap[op.sourceProperties.id],
      };
    }

    case 'set_slate': {
      const inverseOps = op.properties.slateOps.map(Operation.inverse).reverse();
      return {
        type: 'set_slate',
        source: 'history',
        properties: {
          slateOps: inverseOps,
          selectionBefore: op.properties.selectionBefore,
        },
        slate: op.slate,
        blockId: op.blockId,
      };
    }

    default:
      return op;
  }
}

export const SAVING = new WeakMap<YooEditor, boolean | undefined>();
export const MERGING = new WeakMap<YooEditor, boolean | undefined>();

export const YooHistory = {
  isMerging(editor: YooEditor): boolean | undefined {
    return MERGING.get(editor);
  },

  isSaving(editor: YooEditor): boolean | undefined {
    return SAVING.get(editor);
  },

  withoutMerging(editor: YooEditor, fn: () => void): void {
    const prev = YooHistory.isMerging(editor);
    MERGING.set(editor, false);
    fn();
    MERGING.set(editor, prev);
  },

  withoutSaving(editor: YooEditor, fn: () => void): void {
    const prev = YooHistory.isSaving(editor);
    SAVING.set(editor, false);
    fn();
    SAVING.set(editor, prev);
  },
};

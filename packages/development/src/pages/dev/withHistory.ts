import { YooEditor, YooptaBlockPath, YooptaOperation } from '@yoopta/editor';
import { Operation, Path } from 'slate';

type HistoryStack = {
  operations: YooptaOperation[];
  path: YooptaBlockPath;
};

type HistoryStackName = 'undos' | 'redos';
function inverseOperation(editor: YooEditor, op: YooptaOperation): YooptaOperation | YooptaOperation[] {
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

    default:
      return op;
  }
}
const MAX_HISTORY_LENGTH = 100;

export const withHistory = (editor: YooEditor) => {
  const history: Record<HistoryStackName, HistoryStack[]> = {
    undos: [],
    redos: [],
  };

  editor.history = history;

  const { applyTransforms } = editor;

  editor.undo = () => {
    const batch = history.undos.pop();
    if (batch) {
      const inverseOps = batch.operations
        .flatMap((op) => {
          if (op.type === 'set_slate') {
            return {
              ...op,
              properties: {
                operations: op.properties.operations.map(Operation.inverse).reverse(),
                selectionBefore: op.properties.selectionBefore,
              },
            };
          }
          return inverseOperation(editor, op);
        })
        .reverse();

      applyTransforms(inverseOps);

      inverseOps.forEach((op) => {
        if (op.type === 'set_slate') {
          const slate = op.slate;
          //   slate.undo();
          console.log('undo slate.history', slate.history);
        }
      });

      history.redos.push(batch);
    }
  };

  editor.redo = () => {
    const batch = history.redos.pop();

    if (batch) {
      applyTransforms(batch.operations);
      batch.operations.forEach((op) => {
        if (op.type === 'set_slate') {
          const slate = op.slate;
          //   slate.redo();
          console.log('redo slate.history', slate.history);
        }
      });

      history.undos.push(batch);
    }
  };

  editor.applyTransforms = (operations: YooptaOperation[], options) => {
    const batch = {
      operations: operations.filter((op) => op.type !== 'set_selection_block' && op.type !== 'set_block_value'),
      path: editor.selection,
    };

    if (batch.operations.length > 0) {
      history.undos.push(batch);
      history.redos = [];
    }

    if (history.undos.length > MAX_HISTORY_LENGTH) {
      history.undos.shift();
    }

    console.log('applyTransforms history.undos', history.undos);
    applyTransforms(operations, options);
  };

  return editor;
};

const shouldSave = (op: Operation, prev: Operation | undefined): boolean => {
  if (op.type === 'set_selection') {
    return false;
  }

  return true;
};

const shouldMerge = (op: Operation, prev: Operation | undefined): boolean => {
  if (prev === op) return true;

  if (
    prev &&
    op.type === 'insert_text' &&
    prev.type === 'insert_text' &&
    op.offset === prev.offset + prev.text.length &&
    Path.equals(op.path, prev.path)
  ) {
    return true;
  }

  if (
    prev &&
    op.type === 'remove_text' &&
    prev.type === 'remove_text' &&
    op.offset + op.text.length === prev.offset &&
    Path.equals(op.path, prev.path)
  ) {
    return true;
  }

  return false;
};

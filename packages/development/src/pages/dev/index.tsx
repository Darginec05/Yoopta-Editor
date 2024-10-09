import YooptaEditor, {
  Blocks,
  buildSlateEditor,
  createYooptaEditor,
  generateId,
  SlateElement,
  YooEditor,
  YooptaBlockData,
  YooptaBlockPath,
  YooptaContentValue,
  YooptaOperation,
} from '@yoopta/editor';
import { useEffect, useMemo, useRef, useState } from 'react';

import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';
import { FixedToolbar } from '../../components/FixedToolbar/FixedToolbar';
import { SlackChat } from '../../components/Chats/SlackChat/SlackChat';
import { Operation, Path } from 'slate';

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const EDITOR_STYLE = {
  width: 750,
};

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

const shouldMerge = (op: Operation, prev: Operation | undefined): boolean => {
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

/**
 * Check whether an operation needs to be saved to the history.
 */

const shouldSave = (op: Operation, prev: Operation | undefined): boolean => {
  if (op.type === 'set_selection') {
    return false;
  }

  return true;
};

export const withHistory = (editor: YooEditor) => {
  const history: Record<HistoryStackName, HistoryStack[]> = {
    undos: [],
    redos: [],
  };

  const { applyTransforms } = editor;

  editor.history = history;

  editor.undo = () => {
    const batch = history.undos.pop();

    if (batch) {
      const inverseOps = batch.operations.map((op) => inverseOperation(editor, op)).reverse();
      applyTransforms(inverseOps.flat());
      history.redos.push(batch);
    }
  };

  editor.redo = () => {
    const batch = history.redos.pop();

    if (batch) {
      applyTransforms(batch.operations);
      history.undos.push(batch);
    }
  };

  editor.applyTransforms = (operations: YooptaOperation[], options) => {
    const batch = {
      operations: operations.filter((op) => op.type !== 'set_selection_block' && op.type !== 'set_block_value'),
      path: editor.selection,
    };

    // try {
    //   console.log('applyTransforms editor.selection', editor.selection);
    //   const slate = Blocks.getSlate(editor, { at: editor.selection });
    //   const { apply } = slate;

    //   // -------
    //   slate.apply = (op) => {
    //     console.log('slate.apply', op);
    //     const { operations } = slate;
    //     console.log('slate.operations', operations);
    //     const { undos } = history;
    //     const lastBatch = undos[undos.length - 1];
    //     const lastOp = operations[operations.length - 1];
    //     let save = false;
    //     let merge = false;

    //     if (save == null) {
    //       save = shouldSave(op, lastOp);
    //     }

    //     if (save) {
    //       if (merge == null) {
    //         if (lastBatch == null) {
    //           merge = false;
    //         } else if (operations.length !== 0) {
    //           merge = true;
    //         } else {
    //           merge = shouldMerge(op, lastOp);
    //         }
    //       }

    //       if (lastBatch && merge) {
    //         console.log('lastBatch && merge', op);
    //         lastBatch.operations.push(op);
    //       } else {
    //         const batch = {
    //           operations: [op],
    //           selectionBefore: slate.selection,
    //         };

    //         console.log('applyTransforms slate batch', batch);
    //       }
    //     }

    //     apply(op);
    //   };
    // } catch (error) {}
    // // -------

    if (batch.operations.length > 0) {
      history.undos.push(batch);
      console.log('applyTransforms history.undos', history.undos);
      history.redos = [];
    }

    if (history.undos.length > MAX_HISTORY_LENGTH) {
      history.undos.shift();
    }

    applyTransforms(operations, options);
  };

  return editor;
};

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => withHistory(createYooptaEditor()), []);
  const selectionRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);
  const [value, setValue] = useState<YooptaContentValue>({
    '6245440a-5916-4885-b947-512840225ac8': {
      id: '6245440a-5916-4885-b947-512840225ac8',
      type: 'HeadingOne',
      meta: {
        align: 'left',
        depth: 0,
        order: 0,
      },
      value: [
        {
          id: '73c0fc83-d576-4b8c-a3cb-c43985d0d9a9',
          type: 'heading-one',
          props: {
            nodeType: 'block',
          },
          children: [
            {
              text: 'Heading title',
            },
          ],
        },
      ],
    },
    'e2c48582-67c6-4ecf-9bdb-7e2abf99f7c7': {
      id: 'e2c48582-67c6-4ecf-9bdb-7e2abf99f7c7',
      type: 'Blockquote',
      meta: {
        align: 'left',
        depth: 0,
        order: 1,
      },
      value: [
        {
          id: 'f1e0b88a-70f0-4841-87f0-aba0c1634cde',
          type: 'blockquote',
          children: [
            {
              text: 'Blockquote description',
            },
          ],
        },
      ],
    },
  });

  const onChange = (value: YooptaContentValue) => {
    console.log(value);
    setValue(value);
  };

  return (
    <>
      <div className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={selectionRef}>
        <FixedToolbar editor={editor} />
        <YooptaEditor
          editor={editor}
          plugins={YOOPTA_PLUGINS}
          selectionBoxRoot={selectionRef}
          marks={MARKS}
          autoFocus={true}
          placeholder="Type / to open menu"
          tools={TOOLS}
          readOnly={readOnly}
          style={EDITOR_STYLE}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default BasicExample;

import YooptaEditor, {
  Blocks,
  buildSlateEditor,
  createYooptaEditor,
  generateId,
  SetSlateOperation,
  SlateEditor,
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

export const withHistory = (editor: YooEditor) => {
  const history: Record<HistoryStackName, HistoryStack[]> = {
    undos: [],
    redos: [],
  };

  const { applyTransforms } = editor;
  editor.history = history;
  editor.undo = () => {
    // const batch = history.undos.pop();

    // if (batch) {
    //   const inverseOps = batch.operations.map((op) => inverseOperation(editor, op)).reverse();
    //   applyTransforms(inverseOps.flat());
    //   history.redos.push(batch);
    // }

    const batch = history.undos.pop();
    if (batch) {
      console.log('history.undos', history.undos);

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

    if (batch.operations.length > 0) {
      history.undos.push(batch);
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

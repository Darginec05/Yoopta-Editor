import YooptaEditor, {
  Blocks,
  createYooptaEditor,
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
function inverseOperation(op: YooptaOperation): YooptaOperation {
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

    case 'split_block':
      return {
        type: 'merge_block',
        sourceProperties: op.properties,
        targetProperties: op.prevProperties,
        mergedProperties: op.prevProperties,
      };

    case 'merge_block':
      return {
        type: 'split_block',
        properties: op.sourceProperties,
        prevProperties: op.targetProperties,
        slate: undefined,
      };

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
      const inverseOps = batch.operations.map(inverseOperation).reverse();
      inverseOps.push({ type: 'set_selection_block', path: batch.path });
      applyTransforms(inverseOps);
      history.redos.push(batch);
    }
  };

  editor.redo = () => {
    const batch = history.redos.pop();

    console.log('redo FIRED', batch?.operations);
    console.log('redo batch.path', batch?.path);
    if (batch) {
      batch.operations.push({ type: 'set_selection_block', path: batch.path });
      applyTransforms(batch.operations);
      history.undos.push(batch);
    }
  };

  editor.applyTransforms = (operations: YooptaOperation[], options) => {
    const batch = {
      operations: operations.filter((op) => op.type !== 'set_selection_block'),
      path: editor.selection,
    };

    // try {
    //   console.log('applyTransforms editor.selection', editor.selection);
    //   const slate = Blocks.getSlate(editor, { at: editor.selection });
    //   const { apply } = slate;

    //   slate.apply = (op) => {
    //     console.log('slate.apply', op);
    //     const { operations } = slate;
    //     const { undos } = history;
    //     const lastBatch = undos[undos.length - 1];
    //     const lastOp = operations[operations.length - 1];
    //     let save = false;
    //     let merge = false;

    //     console.log('applyTransforms slate lastBatch', lastBatch);

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

    //       // while (undos.length > 100) {
    //       //   undos.shift();
    //       // }

    //       // history.redos = [];
    //     }

    //     apply(op);
    //   };
    // } catch (error) {}

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
    'f66c390a-c0b0-4e1e-8c05-868755ac8fb0': {
      id: 'f66c390a-c0b0-4e1e-8c05-868755ac8fb0',
      value: [
        {
          id: 'ecd0c7ef-dcd7-48b8-aa3e-de7d6be51c46',
          type: 'paragraph',
          children: [
            {
              text: 'WeakMap',
              code: true,
              bold: true,
            },
            {
              text: ' ',
            },
            {
              text: '— это коллекция пар ключ-значение. В качестве ключей могут быть использованы только объекты и',
            },
            {
              text: ' ',
            },
            {
              id: '9292487b-8753-4f6b-a9c3-3038d7ef3a27',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Symbol#%D1%80%D0%B0%D0%B7%D0%B4%D0%B5%D0%BB%D1%8F%D0%B5%D0%BC%D1%8B%D0%B5_%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D1%8B_%D0%B2_%D0%B3%D0%BB%D0%BE%D0%B1%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%BC_%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D1%8C%D0%BD%D0%BE%D0%BC_%D1%80%D0%B5%D0%B5%D1%81%D1%82%D1%80%D0%B5',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'незарегистрированные символы',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'незарегистрированные символы',
                },
              ],
            },
            {
              text: ', а значения могут быть произвольных',
            },
            {
              text: ' ',
            },
            {
              id: 'fd00a615-10de-45af-9cdc-bfe28a097391',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Data_structures',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'типов',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'типов',
                },
              ],
            },
            {
              text: '.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 0,
        depth: 1,
      },
    },
    'ba2dd37b-902f-416d-8430-4febffc12096': {
      id: 'ba2dd37b-902f-416d-8430-4febffc12096',
      value: [
        {
          id: '00304c3c-955d-4235-b420-76d45a90797e',
          type: 'heading-two',
          children: [
            {
              id: 'd6662037-6003-404f-8ca2-691528bafa9e',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/WeakMap#%D0%BE%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'Описание',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Описание',
                },
              ],
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingTwo',
      meta: {
        order: 1,
        depth: 1,
      },
    },
    '7812be65-c7a4-4a14-ad7d-de2bf6713a11': {
      id: '7812be65-c7a4-4a14-ad7d-de2bf6713a11',
      value: [
        {
          id: '9fb68678-7c54-40bc-8a30-584bf6496436',
          type: 'paragraph',
          children: [
            {
              text: 'Ключи в WeakMap должны поддерживать сборку мусора. Большинство',
            },
            {
              text: ' ',
            },
            {
              id: 'e536fcf9-15c0-436a-ac2b-cae44954b206',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/ru/docs/Glossary/Primitive',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'примитивных типов данных',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'примитивных типов данных',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'могут не иметь времени жизни, поэтому они не могут быть использованы в качестве ключей. Объекты и',
            },
            {
              text: ' ',
            },
            {
              id: '406ccc74-9b59-405e-afec-72f9ce5345aa',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Symbol#%D1%80%D0%B0%D0%B7%D0%B4%D0%B5%D0%BB%D1%8F%D0%B5%D0%BC%D1%8B%D0%B5_%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D1%8B_%D0%B2_%D0%B3%D0%BB%D0%BE%D0%B1%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%BC_%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D1%8C%D0%BD%D0%BE%D0%BC_%D1%80%D0%B5%D0%B5%D1%81%D1%82%D1%80%D0%B5',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'незарегистрированные символы',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'незарегистрированные символы',
                },
              ],
            },
            {
              text: ' ',
            },
            {
              text: 'могут быть ключами потому что они поддерживают сборку мусора.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 2,
        depth: 0,
      },
    },
    '6fa75049-e965-49d5-8caa-f22fd0648f6c': {
      id: '6fa75049-e965-49d5-8caa-f22fd0648f6c',
      value: [
        {
          id: '7eb1f12e-0444-48ca-a9d8-7b73d9607fce',
          type: 'heading-three',
          children: [
            {
              id: '530a5ff8-088b-4b1a-a3ae-34baff4157aa',
              type: 'link',
              props: {
                url: 'https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/WeakMap#%D0%BF%D0%BE%D1%87%D0%B5%D0%BC%D1%83_weakmap',
                target: '_blank',
                rel: 'noopener noreferrer',
                title: 'Почему WeakMap?',
                nodeType: 'inline',
              },
              children: [
                {
                  text: 'Почему WeakMap?',
                },
              ],
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'HeadingThree',
      meta: {
        order: 3,
        depth: 0,
      },
    },
    'e9a4fee8-cac4-4860-b419-868259727f20': {
      id: 'e9a4fee8-cac4-4860-b419-868259727f20',
      value: [
        {
          id: '5c90702b-bddd-4a3c-865c-eaef700b4ad8',
          type: 'paragraph',
          children: [
            {
              text: 'Опытный JavaScript разработчик заметит, что map API можно реализовать на JavaScript c помощью двух массивов (один для ключей, второй для значений) и четырёх общих API методов. Установка элементов в этот map должна будет одновременно запушить ключи и значения. В результате индексы ключа и значения будут корректными. Получение значений с map потребует итерирование ключей, чтобы найти совпадение, а затем использование индекса этого соответствия для извлечения соответствующего значения из массива значений.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 4,
        depth: 0,
      },
    },
    'cd05f8a4-5fdf-4926-b29c-14c794594518': {
      id: 'cd05f8a4-5fdf-4926-b29c-14c794594518',
      value: [
        {
          id: 'f3480e43-5814-40a6-ac15-8d1ad9a0c2e1',
          type: 'paragraph',
          children: [
            {
              text: 'У такой реализации было бы два главных неудобства. Первым является O(n) поиск (где n — количество ключей в map), так как обе операции требуют итерирование списка ключей для нахождения совпадения. Вторым — проблема утечки памяти. В словарях, написанных вручную, массив с ключами будет хранить ссылки на объекты-ключи, не давая им быть помеченными сборщиком мусора. В нативных',
            },
            {
              text: ' ',
            },
            {
              text: 'WeakMap',
              code: true,
            },
            {
              text: ', ссылки на объекты-ключи хранятся «слабо», что означает то, что они не предотвратят сборку мусора в том случае, если других ссылок на объект не будет.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 5,
        depth: 0,
      },
    },
    'e296142c-1964-41ec-bee1-c05f7474107e': {
      id: 'e296142c-1964-41ec-bee1-c05f7474107e',
      value: [
        {
          id: 'dc56d225-6d3e-4c9d-85d2-2601d92d1262',
          type: 'paragraph',
          children: [
            {
              text: 'WeakMaps имеют "weak" («слабые») обращения к ключам объекта, а следовательно непрепятствие сборщику мусора, когда мы больше не имеем объекта-ключа. WeakMaps могут быть особенно полезными конструкциями при сопоставлении ключей с информацией о ключе, который ценен, только если ключ не был собран сборщиком мусора (Garbage collector).',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 6,
        depth: 0,
      },
    },
    '3cb7a62d-87de-4d69-91a7-ddc38ff35fab': {
      id: '3cb7a62d-87de-4d69-91a7-ddc38ff35fab',
      value: [
        {
          id: '687bdaad-28a3-4e49-82a0-3797c18c56ac',
          type: 'paragraph',
          children: [
            {
              text: 'Из-за того, что ссылки являются слабыми, ключи',
            },
            {
              text: ' ',
            },
            {
              text: 'WeakMap',
              code: true,
            },
            {
              text: ' ',
            },
            {
              text: 'не перечисляемы (то есть нет метода, который возвращает список ключей). Иначе список бы зависел от состояния сбора мусора, представляя индетерминизм. Если вы хотите иметь список ключей, вам следует поддерживать его самостоятельно.',
            },
          ],
          props: {
            nodeType: 'block',
          },
        },
      ],
      type: 'Paragraph',
      meta: {
        order: 7,
        depth: 0,
      },
    },
  });

  const onChange = (value: YooptaContentValue) => {
    // console.log('onChange FIRED', value);
    setValue(value);
  };

  return (
    <>
      <div className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={selectionRef}>
        <FixedToolbar editor={editor} />
        {/* <SlackChat /> */}
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

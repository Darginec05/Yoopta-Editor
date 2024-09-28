import { buildSlateNodeElement } from '../../utils/blockElements';
import { generateId } from '../../utils/generateId';
import { YooEditor, YooptaBlockData, SlateElement, YooptaBlockPath } from '../types';
import { YooptaOperation } from './applyTransforms';

// // make blockData optional
// export function insertBlock(
//   editor: YooEditor,
//   blockData: YooptaBlockData,
//   options: Partial<YooptaEditorTransformOptions> = {},
// ) {
//   editor.children = createDraft(editor.children);
//   const { at = null, focus = false, slate = null } = options;

//   const currentBlock = findPluginBlockBySelectionPath(editor);

//   const plugin = editor.plugins[blockData.type];
//   const pluginEvents = plugin.events || {};
//   const { onCreate } = pluginEvents;

//   const nextBlockPath = at;
//   const newPluginBlock = {
//     id: generateId(),
//     value: blockData.value,
//     type: blockData.type,
//     meta: {
//       ...blockData.meta,
//       order: 0,
//     },
//   };

//   let insertBefore = false;

//   if (slate && slate.selection) {
//     const string = Editor.string(slate, slate.selection.anchor.path);

//     const isStart = Editor.isStart(slate, slate.selection.anchor, slate.selection.anchor.path);
//     insertBefore = isStart && string.length > 0;
//   }

//   if (nextBlockPath) {
//     const [position] = nextBlockPath;
//     Object.values(editor.children).forEach((plugin) => {
//       if (plugin.meta.order >= position) {
//         plugin.meta.order += 1;
//       }
//     });

//     newPluginBlock.meta.order = position;
//   } else {
//     const newIndex = Object.keys(editor.children).length;
//     newPluginBlock.meta.order = newIndex;
//   }

//   const newSlateEditor = buildSlateEditor(editor);
//   editor.blockEditorsMap[newPluginBlock.id] = newSlateEditor;

//   if (insertBefore && currentBlock) {
//     newPluginBlock.meta.order = currentBlock.meta.order;
//     currentBlock.meta.order += 1;
//   }

//   editor.children[newPluginBlock.id] = newPluginBlock;
//   const currentBlockId = currentBlock?.id;

//   editor.children = finishDraft(editor.children);
//   // editor.applyChanges();
//   editor.emit('change', editor.children);

//   onCreate?.(editor, newPluginBlock.id);

//   if (focus) {
//     editor.focusBlock(insertBefore && currentBlockId ? currentBlockId : newPluginBlock.id);
//   }
// }

export type InsertBlockOptions = {
  at?: YooptaBlockPath;
  focus?: boolean;
};

// [TEST]
export function insertBlock(editor: YooEditor, blockData: Partial<YooptaBlockData>, options: InsertBlockOptions = {}) {
  const { at, focus = false } = options;

  console.log('insertBlock blockData', blockData);
  console.log('insertBlock options', options);

  const newBlock: YooptaBlockData = {
    id: blockData.id || generateId(),
    type: blockData.type || 'Paragraph',
    value: (blockData.value || buildSlateNodeElement('paragraph')) as SlateElement[],
    meta: {
      align: blockData.meta?.align || 'left',
      depth: blockData.meta?.depth || 0,
      order: at && typeof at?.[0] ? at[0] : Object.keys(editor.children).length,
    },
  };

  const operations: YooptaOperation[] = [];

  operations.push({
    type: 'insert_block',
    path: [newBlock.meta.order],
    block: newBlock,
  });

  Object.values(editor.children).forEach((block) => {
    if (block.meta.order >= newBlock.meta.order && block.id !== newBlock.id) {
      operations.push({
        type: 'update_block',
        id: block.id,
        properties: {
          meta: { ...block.meta, order: block.meta.order + 1 },
        },
      });
    }
  });

  editor.applyTransforms(operations);

  if (focus) {
    editor.focusBlock(newBlock.id);
  }

  return newBlock.id;
}

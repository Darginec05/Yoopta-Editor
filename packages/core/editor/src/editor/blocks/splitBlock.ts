import { Editor, Element, Path, Transforms } from 'slate';
import { buildSlateEditor } from '../../utils/buildSlate';
import { deepClone } from '../../utils/deepClone';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooptaOperation } from '../core/applyTransforms';
import { SlateEditor, SlateElement, YooEditor, YooptaBlockData } from '../types';

// export type SplitBlockOptions = {
//   focus?: boolean;
//   slate?: SlateEditor;
// };

// // [TODO] - handle cases for lists and nested inline elements
// export function splitBlock(editor: YooEditor, options: SplitBlockOptions = {}) {
//   const { slate, focus = true } = options;

//   const blockToSplit = findPluginBlockBySelectionPath(editor);
//   if (!slate || !slate.selection || !blockToSplit) return;

//   Editor.withoutNormalizing(slate, () => {
//     editor.children = createDraft(editor.children);

//     const parentPath = Path.parent(slate.selection!.anchor.path);

//     Transforms.splitNodes(slate, {
//       at: slate.selection!,
//       match: (n) => Element.isElement(n),
//       always: true,
//       mode: 'highest',
//     });

//     const nextParentPathIndex = parentPath[0] + 1;
//     // [TODO] - or deep clone?
//     const nextBlockSlateValue = slate.children.slice()[nextParentPathIndex];

//     Transforms.removeNodes(slate, {
//       at: [nextParentPathIndex],
//       match: (n) => Element.isElement(n),
//       mode: 'highest',
//     });

//     const nextNewBlock: YooptaBlockData = {
//       id: generateId(),
//       type: blockToSplit.type,
//       meta: {
//         order: blockToSplit.meta.order + 1,
//         depth: blockToSplit.meta.depth,
//         align: blockToSplit.meta.align,
//       },
//       // [TODO] - check for mark text formats
//       value: [nextBlockSlateValue],
//     };

//     Object.values(editor.children).forEach((plugin) => {
//       if (plugin.meta.order >= nextNewBlock.meta.order) {
//         plugin.meta.order += 1;
//       }
//     });

//     const newSlateEditor = buildSlateEditor(editor);
//     editor.blockEditorsMap[nextNewBlock.id] = newSlateEditor;
//     editor.children[nextNewBlock.id] = nextNewBlock;

//     editor.children = finishDraft(editor.children);
//     // editor.applyChanges();
//     editor.emit('change', editor.children);

//     if (focus) {
//       // [TODO] - check focus for split block function
//       editor.focusBlock(nextNewBlock.id, { slate: newSlateEditor });
//     }
//   });
// }

export type SplitBlockOptions = {
  focus?: boolean;
  slate?: SlateEditor;
};

export function splitBlock(editor: YooEditor, options: SplitBlockOptions = {}) {
  const { focus = true } = options;

  const blockToSplit = findPluginBlockBySelectionPath(editor);
  const slate = options.slate || findSlateBySelectionPath(editor);
  if (!slate || !blockToSplit) return;
  const originalSlateChildren = deepClone(slate.children);

  Editor.withoutNormalizing(slate, () => {
    if (!slate.selection) return;

    const operations: YooptaOperation[] = [];
    const parentPath = Path.parent(slate.selection.anchor.path);

    Transforms.splitNodes(slate, {
      at: slate.selection,
      match: (n) => Element.isElement(n),
      always: true,
      mode: 'highest',
    });

    const nextParentPathIndex = parentPath[0] + 1;
    const nextBlockSlateValue = slate.children[nextParentPathIndex] as SlateElement;

    Transforms.removeNodes(slate, {
      at: [nextParentPathIndex],
      match: (n) => Element.isElement(n),
      mode: 'highest',
    });

    const nextNewBlock: YooptaBlockData = {
      id: generateId(),
      type: blockToSplit.type,
      meta: {
        order: blockToSplit.meta.order + 1,
        depth: blockToSplit.meta.depth,
        align: blockToSplit.meta.align,
      },
      value: [],
    };

    const newSlate = buildSlateEditor(editor);
    newSlate.children = [nextBlockSlateValue];
    nextNewBlock.value = newSlate.children;

    operations.push({
      type: 'split_block',
      prevProperties: blockToSplit,
      properties: nextNewBlock,
      slate: newSlate,
    });

    // Update order for all blocks with order >= nextNewBlock.meta.order
    Object.values(editor.children).forEach((block) => {
      if (block.meta.order >= nextNewBlock.meta.order && block.id !== nextNewBlock.id) {
        operations.push({
          type: 'set_block_meta',
          id: block.id,
          prevProperties: { ...block.meta, order: block.meta.order },
          properties: { ...block.meta, order: block.meta.order + 1 },
        });
      }
    });

    editor.applyTransforms(operations);

    if (focus) {
      editor.focusBlock(nextNewBlock.id, { slate: newSlate });
    }
  });
}

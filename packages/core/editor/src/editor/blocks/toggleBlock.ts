import { Descendant, Editor, Element, Text, Transforms } from 'slate';
import { buildBlockElementsStructure } from '../../utils/blockElements';
import { buildSlateEditor } from '../../utils/buildSlate';

import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooptaOperation } from '../core/applyTransforms';
import { YooEditor, YooptaBlockData, SlateEditor, FocusAt, SlateElement, YooptaPathIndex } from '../types';

// export type ToggleBlockOptions = YooptaEditorTransformOptions & {
//   deleteText?: boolean;
// };

// const DEFAULT_BLOCK_TYPE = 'Paragraph';

// // [TODO] - handle passing old node props to new root element node,
// export function toggleBlock(editor: YooEditor, toBlockTypeArg: string, options?: ToggleBlockOptions) {
//   editor.children = createDraft(editor.children);
//   const fromBlock = findPluginBlockBySelectionPath(editor, { at: options?.at || editor.selection });

//   if (!fromBlock) throw new Error('Block from not found at current selection');

//   let toBlockType = toBlockTypeArg;

//   if (fromBlock.type === toBlockType) {
//     toBlockType = DEFAULT_BLOCK_TYPE;
//   }

//   const slate: SlateEditor | undefined = findSlateBySelectionPath(editor, { at: [fromBlock.meta.order] });
//   if (!slate) throw new Error(`Slate not found for block in position ${fromBlock.meta.order}`);

//   const toBlock = editor.blocks[toBlockType];
//   const toBlockRootElementType = getRootBlockElementType(toBlock.elements);

//   Editor.withoutNormalizing(slate, () => {
//     Transforms.setNodes(
//       slate,
//       { type: toBlockRootElementType },
//       {
//         at: slate.selection || [0],
//         mode: 'lowest',
//         match: (n) => Element.isElement(n) && !Editor.isInline(slate, n),
//       },
//     );

//     if (options?.deleteText) Transforms.delete(slate, { at: [0, 0] });

//     const block: YooptaBlockData = {
//       id: generateId(),
//       type: toBlockType,
//       meta: {
//         ...fromBlock.meta,
//         order: fromBlock.meta.order,
//       },
//       value: slate.children,
//     };

//     const newSlate = buildSlateEditor(editor);
//     newSlate.children = slate.children;

//     delete editor.children[fromBlock.id];
//     delete editor.blockEditorsMap[fromBlock.id];

//     editor.blockEditorsMap[block.id] = newSlate;
//     editor.children[block.id] = block;

//     block.value = newSlate.children;

//     editor.children = finishDraft(editor.children);
//     editor.applyChanges();
//     editor.emit('change', editor.children);

//     if (options?.focus) {
//       editor.focusBlock(block.id, { slate: newSlate });
//     }
//   });
// }

export type ToggleBlockOptions = {
  at?: YooptaPathIndex;
  deleteText?: boolean;
  slate?: SlateEditor;
  focus?: boolean;
  focusAt?: FocusAt;
};

const DEFAULT_BLOCK_TYPE = 'Paragraph';

function extractTextNodes(slate: SlateEditor, node: SlateElement | Descendant): (Text | SlateElement)[] {
  if (Editor.isEditor(node)) return node.children.flatMap((child) => extractTextNodes(slate, child));
  if (!Element.isElement(node)) return [node];
  if (Editor.isInline(slate, node)) return [node];

  return node.children.flatMap((child) => extractTextNodes(slate, child));
}

function findFirstLeaf(node: SlateElement): SlateElement | null {
  if (!Element.isElement(node)) {
    return null;
  }
  if (node.children.length === 0 || Text.isText(node.children[0])) {
    return node;
  }
  return findFirstLeaf(node.children[0] as SlateElement);
}

export function toggleBlock(editor: YooEditor, toBlockTypeArg: string, options: ToggleBlockOptions = {}) {
  const fromBlock = findPluginBlockBySelectionPath(editor, { at: options.at || editor.path.current });
  if (!fromBlock) throw new Error('Block not found at current selection');

  let toBlockType = fromBlock.type === toBlockTypeArg ? DEFAULT_BLOCK_TYPE : toBlockTypeArg;
  const plugin = editor.plugins[toBlockType];
  const { onBeforeCreate, onCreate } = plugin.events || {};

  const slate = findSlateBySelectionPath(editor, { at: fromBlock.meta.order });
  if (!slate) throw new Error(`Slate not found for block in position ${fromBlock.meta.order}`);

  const toBlockSlateStructure = onBeforeCreate?.(editor) || buildBlockElementsStructure(editor, toBlockType);
  const textNodes = extractTextNodes(slate, slate.children[0]);
  const firstLeaf = findFirstLeaf(toBlockSlateStructure);

  if (firstLeaf) {
    firstLeaf.children = textNodes;
  }

  const newBlock: YooptaBlockData = {
    id: generateId(),
    type: toBlockType,
    meta: { ...fromBlock.meta },
    value: [toBlockSlateStructure],
  };

  const newSlate = buildSlateEditor(editor);
  newSlate.children = [toBlockSlateStructure];

  const operations: YooptaOperation[] = [
    { type: 'delete_block', block: fromBlock, path: { current: fromBlock.meta.order } },
    { type: 'insert_block', path: { current: fromBlock.meta.order }, block: newBlock, slate: newSlate },
  ];

  editor.applyTransforms(operations);
  onCreate?.(editor, newBlock.id);

  // [TEST]
  if (options.deleteText) {
    Transforms.delete(newSlate, { at: [0, 0] });
  }

  if (options.focus) {
    editor.focusBlock(newBlock.id, { slate: newSlate });
  }

  return newBlock.id;
}

import { Descendant, Editor, Element, Text, Transforms } from 'slate';
import { buildBlockElementsStructure } from '../../utils/blockElements';
import { buildSlateEditor } from '../../utils/buildSlate';

import { findPluginBlockByPath } from '../../utils/findPluginBlockByPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooptaOperation } from '../core/applyTransforms';
import { YooEditor, YooptaBlockData, SlateEditor, FocusAt, SlateElement, YooptaPathIndex } from '../types';

export type ToggleBlockOptions = {
  at?: YooptaPathIndex;
  deleteText?: boolean;
  slate?: SlateEditor;
  focus?: boolean;
  focusAt?: FocusAt;
};

const DEFAULT_BLOCK_TYPE = 'Paragraph';

function extractTextNodes(
  slate: SlateEditor,
  node: SlateElement | Descendant,
  blockData: YooptaBlockData,
  editor: YooEditor,
): (Text | SlateElement)[] {
  const blockEntity = editor.plugins[blockData.type];
  if (blockEntity?.customEditor) {
    return (blockData.value[0] as SlateElement).children;
  }

  if (Editor.isEditor(node)) return node.children.flatMap((child) => extractTextNodes(slate, child, blockData, editor));
  if (!Element.isElement(node)) return [node];
  if (Editor.isInline(slate, node)) return [node];

  return node.children.flatMap((child) => extractTextNodes(slate, child, blockData, editor));
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
  const fromBlock = findPluginBlockByPath(editor, { at: options.at || editor.path.current });
  if (!fromBlock) throw new Error('Block not found at current selection');

  let toBlockType = fromBlock.type === toBlockTypeArg ? DEFAULT_BLOCK_TYPE : toBlockTypeArg;
  const plugin = editor.plugins[toBlockType];
  const { onBeforeCreate } = plugin.events || {};

  const slate = findSlateBySelectionPath(editor, { at: fromBlock.meta.order });
  if (!slate) throw new Error(`Slate not found for block in position ${fromBlock.meta.order}`);

  const toBlockSlateStructure = onBeforeCreate?.(editor) || buildBlockElementsStructure(editor, toBlockType);
  const textNodes = extractTextNodes(slate, slate.children[0], fromBlock, editor);
  const firstLeaf = findFirstLeaf(toBlockSlateStructure);

  if (firstLeaf) {
    firstLeaf.children = textNodes;
  }

  const newBlock: YooptaBlockData = {
    id: generateId(),
    type: toBlockType,
    meta: { ...fromBlock.meta, align: undefined },
    value: [toBlockSlateStructure],
  };

  const newSlate = buildSlateEditor(editor);
  newSlate.children = [toBlockSlateStructure];

  const operations: YooptaOperation[] = [
    { type: 'delete_block', block: fromBlock, path: { current: fromBlock.meta.order } },
    { type: 'insert_block', path: { current: fromBlock.meta.order }, block: newBlock },
  ];

  editor.applyTransforms(operations);

  // [TEST]
  if (options.deleteText) {
    Transforms.delete(newSlate, { at: [0, 0] });
  }

  if (options.focus) {
    editor.focusBlock(newBlock.id);
  }

  return newBlock.id;
}

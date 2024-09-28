import { createDraft, finishDraft } from 'immer';
import { Transforms } from 'slate';
import { buildBlockData } from '../../components/Editor/utils';
import { buildBlockElementsStructure } from '../../utils/blockElements';
import { buildSlateEditor } from '../../utils/buildSlate';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooEditor, YooptaEditorTransformOptions } from '../types';

export type CreateBlockOptions = YooptaEditorTransformOptions & {
  deleteText?: boolean;
};

export function createBlock(editor: YooEditor, type: string, options?: CreateBlockOptions) {
  editor.children = createDraft(editor.children);

  const fromBlock = findPluginBlockBySelectionPath(editor);
  if (!fromBlock) throw new Error(`No fromBlock found in the current selection path. Passed path: ${editor.selection}`);

  const slate = options?.slate || findSlateBySelectionPath(editor, { at: [fromBlock?.meta.order] });
  if (!slate || !slate.selection) return;

  const selectedBlock = editor.blocks[type];

  const blockData = buildBlockData({
    id: generateId(),
    type: selectedBlock.type,
    meta: {
      order: fromBlock.meta.order,
      depth: fromBlock.meta.depth,
      align: fromBlock.meta.align,
    },
  });

  const plugin = editor.plugins[type];
  const pluginEvents = plugin.events || {};
  const { onBeforeCreate, onCreate } = pluginEvents;

  const elements =
    typeof onBeforeCreate === 'function'
      ? onBeforeCreate(editor, blockData.id)
      : buildBlockElementsStructure(editor, type);

  if (options?.deleteText) Transforms.delete(slate, { at: [0, 0] });

  const newSlate = buildSlateEditor(editor);
  newSlate.children = [elements];

  delete editor.children[fromBlock.id];
  delete editor.blockEditorsMap[fromBlock.id];

  editor.blockEditorsMap[blockData.id] = newSlate;
  editor.children[blockData.id] = blockData;

  blockData.value = newSlate.children;
  const blockId = blockData.id;

  editor.children = finishDraft(editor.children);
  editor.emit('change', editor.children);

  onCreate?.(editor, blockData.id);

  if (options?.focus) {
    editor.focusBlock(blockId, { slate: newSlate, waitExecution: true });
  }
}

import { createDraft, finishDraft } from 'immer';
import { buildSlateEditor } from '../../utils/buildSlate';
import { deepClone } from '../../utils/deepClone';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooEditor, YooptaBlockData, YooptaEditorTransformOptions } from '../types';

export type DuplicateBlockOptions = YooptaEditorTransformOptions & {
  blockId?: string;
};

export function duplicateBlock(editor: YooEditor, options: DuplicateBlockOptions = {}) {
  const { blockId, focus } = options;

  if (!blockId && !options.at) {
    throw new Error('blockId or path should be provided');
  }

  let originalBlock: YooptaBlockData | null = null;

  if (blockId) {
    originalBlock = editor.children[blockId];

    if (!originalBlock) {
      throw new Error(`Block not with blockId: ${blockId} found`);
    }
  }

  if (options.at) {
    originalBlock = findPluginBlockBySelectionPath(editor, { at: options.at });

    if (!originalBlock) {
      throw new Error(`Block in path ${options.at} not found`);
    }
  }

  if (!originalBlock) {
    throw new Error('Block not found');
  }

  editor.children = createDraft(editor.children);

  const blocks = Object.values(editor.children);

  blocks.forEach((block) => {
    if (block.meta.order > originalBlock!.meta.order) {
      block.meta.order += 1;
    }
  });

  const duplicatedBlock = deepClone(originalBlock);
  const slate = buildSlateEditor(editor);

  duplicatedBlock.id = generateId();
  duplicatedBlock.meta.order = originalBlock.meta.order + 1;

  // [TODO] - change ids in slate elements?
  editor.children[duplicatedBlock.id] = duplicatedBlock;
  editor.blockEditorsMap[duplicatedBlock.id] = slate;

  const duplicatedId = duplicatedBlock.id;

  editor.children = finishDraft(editor.children);
  editor.applyChanges();
  editor.emit('change', editor.children);

  if (focus) {
    editor.focusBlock(duplicatedId, { waitExecution: true });
  }
}

import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { YooEditor, YooptaBlockPath } from '../types';
import { YooptaOperation } from '../core/applyTransforms';

export type BlockDepthOptions = {
  blockId?: string;
  at?: YooptaBlockPath;
};

export function increaseBlockDepth(editor: YooEditor, options: BlockDepthOptions = {}) {
  const { at = editor.selection, blockId } = options;

  const block = blockId ? editor.children[blockId] : findPluginBlockBySelectionPath(editor, { at });
  if (!block) return;

  const newDepth = block.meta.depth + 1;

  const operation: YooptaOperation = {
    type: 'set_block_meta',
    id: block.id,
    properties: { depth: newDepth },
    prevProperties: { depth: block.meta.depth },
  };

  editor.applyTransforms([operation]);
}

import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { YooEditor } from '../types';
import { YooptaOperation } from '../core/applyTransforms';
import { BlockDepthOptions } from './increaseBlockDepth';

export function decreaseBlockDepth(editor: YooEditor, options: BlockDepthOptions = {}) {
  const { at = editor.selection, blockId } = options;

  const block = blockId ? editor.children[blockId] : findPluginBlockBySelectionPath(editor, { at });
  if (!block) return;

  const newDepth = Math.max(0, block.meta.depth - 1);

  const operation: YooptaOperation = {
    type: 'set_block_meta',
    id: block.id,
    properties: { depth: newDepth },
    prevProperties: { depth: block.meta.depth },
  };

  editor.applyTransforms([operation]);
}

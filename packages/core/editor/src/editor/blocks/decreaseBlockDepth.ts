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
    type: 'update_block',
    id: block.id,
    properties: {
      meta: { ...block.meta, depth: newDepth },
    },
  };

  editor.applyTransforms([operation]);
}

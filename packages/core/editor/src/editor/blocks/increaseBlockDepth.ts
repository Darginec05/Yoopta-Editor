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

  const operation: YooptaOperation = {
    type: 'update_block',
    id: block.id,
    properties: {
      meta: { ...block.meta, depth: block.meta.depth + 1 },
    },
  };

  editor.applyTransforms([operation]);
}

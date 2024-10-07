import { Editor, Transforms, Range } from 'slate';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { YooEditor } from '../types';

export type UpdateElementTextOptions = {
  focus?: boolean;
  blockId?: string;
};

export function insertElementText<TElementKeys extends string, TElementProps>(
  editor: YooEditor,
  text: string,
  options?: UpdateElementTextOptions,
) {
  const { blockId, focus } = options || {};

  const blockData = blockId ? editor.children[blockId] : findPluginBlockBySelectionPath(editor);

  if (!blockData) {
    console.warn(`To set text programmatically, you must provide a valid blockId. Got: ${blockId}`);
    return;
  }

  const slate = findSlateBySelectionPath(editor, { at: [blockData.meta.order] });

  if (!slate) {
    console.warn('No slate found');
    return;
  }

  const block = editor.blocks[blockData.type];
  const latestBlockElementPath = Array.from({ length: Object.keys(block.elements).length }, (_) => 0);
  let path = slate.selection || latestBlockElementPath;

  if (!path) {
    console.warn('No valid path or selection found for text insertion');
    return;
  }

  Editor.withoutNormalizing(slate, () => {
    if (Range.isRange(path) && !Range.isCollapsed(path)) {
      Transforms.collapse(slate, { edge: 'end' });
    }

    Transforms.insertText(slate, text, { at: path });
    // editor.applyChanges();
    editor.emit('change', editor.children);

    if (focus) {
      editor.focusBlock(blockData.id, { waitExecution: true, shouldUpdateBlockSelection: true });
    }
  });
}

import { createDraft, finishDraft } from 'immer';
import { Transforms } from 'slate';
import { buildBlockData } from '../../components/Editor/utils';
import { buildBlockElementsStructure } from '../../utils/blockElements';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { YooEditor, YooptaEditorTransformOptions, SlateElement, YooptaBlock } from '../types';

export type CreateBlockOptions = YooptaEditorTransformOptions & {
  deleteText?: boolean;
};

export function createBlock(editor: YooEditor, type: string, options?: CreateBlockOptions) {
  editor.children = createDraft(editor.children);

  const block = findPluginBlockBySelectionPath(editor);
  if (!block) throw new Error(`No block found in the current selection path. Passed path: ${editor.selection}`);

  const slate = options?.slate || findSlateBySelectionPath(editor, { at: [block?.meta.order] });
  if (!slate || !slate.selection) return;

  const selectedBlock = editor.blocks[type];
  const elements = buildBlockElementsStructure(editor, type);

  console.log('elements', elements);

  // Transforms.setNodes(slate, elements, {
  //   at: [0],
  //   match: (n) => Element.isElement(n),
  //   mode: 'highest',
  // });

  // Transforms.insertNodes(slate, elements, { at: slate.selection.anchor.path.slice(0, 1) });

  if (options?.deleteText) Transforms.delete(slate, { at: [0, 0] });

  const blockData = buildBlockData({
    id: block.id,
    type: selectedBlock.type,
    meta: {
      order: block.meta.order,
      depth: block.meta.depth,
    },
    value: [elements],
  });
  console.log('before slate children', slate.children);

  slate.children = blockData.value;

  console.log('blockData value', blockData.value);
  console.log('after slate children', slate.children);

  const blockId = blockData.id;

  editor.children[blockId] = blockData;
  editor.blockEditorsMap[blockId] = slate;

  editor.children = finishDraft(editor.children);
  editor.applyChanges();
  editor.emit('change', editor.children);

  if (options?.focus) {
    editor.focusBlock(blockId, { slate, waitExecution: true });
  }
}

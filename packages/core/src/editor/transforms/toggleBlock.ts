import { createDraft, finishDraft } from 'immer';
import { Editor, Element, Transforms } from 'slate';
import { getRootBlockElementType } from '../../utils/blockElements';

import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { YooEditor, YooptaBlockPath, YooptaEditorTransformOptions, YooptaBlockData } from '../types';

export type ToggleBlockOptions = YooptaEditorTransformOptions & {
  deleteText?: boolean;
  // toBlockType?: string;
};

const DEFAULT_BLOCK_TYPE = 'Paragraph';

// [TODO] - handle passing old node props to new root element node,
export function toggleBlock(editor: YooEditor, toBlockTypeArg: string, options?: ToggleBlockOptions) {
  editor.children = createDraft(editor.children);
  const currentBlock = findPluginBlockBySelectionPath(editor, { at: options?.at || editor.selection });

  if (!currentBlock) throw new Error('Block from not found at current selection');

  let toBlockType = toBlockTypeArg;

  if (currentBlock.type === toBlockType) {
    toBlockType = DEFAULT_BLOCK_TYPE;
  }

  const slate = findSlateBySelectionPath(editor, { at: [currentBlock.meta.order] });

  if (!slate) throw new Error(`Slate not found for block in position ${currentBlock.meta.order}`);

  const toBlock = editor.blocks[toBlockType];

  const toBlockRootElementType = getRootBlockElementType(toBlock.elements);

  Editor.withoutNormalizing(slate, () => {
    Transforms.setNodes(
      slate,
      { type: toBlockRootElementType },
      {
        at: [0],
        mode: 'lowest',
        match: (n) => Element.isElement(n) && !Editor.isInline(slate, n),
      },
    );

    if (options?.deleteText) Transforms.delete(slate, { at: [0, 0] });

    const block: YooptaBlockData = {
      id: currentBlock.id,
      type: toBlockType,
      meta: {
        ...currentBlock.meta,
        order: currentBlock.meta.order,
      },
      value: slate.children,
    };

    editor.blockEditorsMap[currentBlock.id] = slate;
    editor.children[currentBlock.id] = block;

    editor.children = finishDraft(editor.children);
    editor.applyChanges();
    editor.emit('change', editor.children);

    if (options?.focus) {
      editor.focusBlock(block.id, { slate });
    }
  });
}

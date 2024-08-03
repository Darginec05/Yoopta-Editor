import { createDraft, finishDraft } from 'immer';
import { Editor, Element, Transforms } from 'slate';
import { getRootBlockElementType } from '../../utils/blockElements';
import { buildSlateEditor } from '../../utils/buildSlate';

import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooEditor, YooptaEditorTransformOptions, YooptaBlockData, SlateEditor } from '../types';

export type ToggleBlockOptions = YooptaEditorTransformOptions & {
  deleteText?: boolean;
};

const DEFAULT_BLOCK_TYPE = 'Paragraph';

// [TODO] - handle passing old node props to new root element node,
export function toggleBlock(editor: YooEditor, toBlockTypeArg: string, options?: ToggleBlockOptions) {
  editor.children = createDraft(editor.children);
  const fromBlock = findPluginBlockBySelectionPath(editor, { at: options?.at || editor.selection });

  if (!fromBlock) throw new Error('Block from not found at current selection');

  let toBlockType = toBlockTypeArg;

  if (fromBlock.type === toBlockType) {
    toBlockType = DEFAULT_BLOCK_TYPE;
  }

  const slate: SlateEditor | undefined = findSlateBySelectionPath(editor, { at: [fromBlock.meta.order] });
  if (!slate) throw new Error(`Slate not found for block in position ${fromBlock.meta.order}`);

  const toBlock = editor.blocks[toBlockType];
  const toBlockRootElementType = getRootBlockElementType(toBlock.elements);

  Editor.withoutNormalizing(slate, () => {
    Transforms.setNodes(
      slate,
      { type: toBlockRootElementType },
      {
        at: slate.selection || [0],
        mode: 'lowest',
        match: (n) => Element.isElement(n) && !Editor.isInline(slate, n),
      },
    );

    if (options?.deleteText) Transforms.delete(slate, { at: [0, 0] });

    const block: YooptaBlockData = {
      id: generateId(),
      type: toBlockType,
      meta: {
        ...fromBlock.meta,
        order: fromBlock.meta.order,
      },
      value: slate.children,
    };

    const newSlate = buildSlateEditor(editor);
    newSlate.children = slate.children;

    delete editor.children[fromBlock.id];
    delete editor.blockEditorsMap[fromBlock.id];

    editor.blockEditorsMap[block.id] = newSlate;
    editor.children[block.id] = block;

    block.value = newSlate.children;

    editor.children = finishDraft(editor.children);
    editor.applyChanges();
    editor.emit('change', editor.children);

    if (options?.focus) {
      editor.focusBlock(block.id, { slate: newSlate });
    }
  });
}

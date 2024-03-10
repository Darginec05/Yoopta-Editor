import { createDraft, finishDraft } from 'immer';
import { Editor, Element, Transforms } from 'slate';
import { getBlockElementNode, getRootBlockElement, getRootBlockElementType } from '../../utils/blockElements';
import { buildSlateEditor } from '../../utils/editorBuilders';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { YooEditor, YooptaBlockPath, YooptaEditorTransformOptions, YooptaBlockData } from '../types';

// type ToogleFromBlock = { type: string } | { path: YooptaBlockPath };

// export type ToggleBlockOptions = YooptaEditorTransformOptions & {
//   fromBlockData?: ToogleFromBlock;
// };

export type ToggleBlockOptions = YooptaEditorTransformOptions;

// [TODO] - handle passing old node props to new root element node,
export function toggleBlock(editor: YooEditor, toBlockType: string, options?: ToggleBlockOptions) {
  editor.children = createDraft(editor.children);

  const fromBlockData = findPluginBlockBySelectionPath(editor, { at: editor.selection });

  if (!fromBlockData) throw new Error('Block from not found at current selection');
  const fromBlock = editor.blocks[fromBlockData.type];
  const fromBlockRootElementType = getRootBlockElementType(fromBlock.elements);

  // [TODO] - if the same block type transform to default block
  if (fromBlockData.type === toBlockType) {
    editor.children = finishDraft(editor.children);

    return;
  }

  // slate editor for the from block
  const slate = findSlateBySelectionPath(editor, { at: [fromBlockData.meta.order] });

  if (!slate) throw new Error(`Slate not found for block in position ${fromBlockData.meta.order}`);

  const toBlock = editor.blocks[toBlockType];
  const toBlockRootElementType = getRootBlockElementType(toBlock.elements);

  Editor.withoutNormalizing(slate, () => {
    const node = getBlockElementNode(slate, { elementType: fromBlockRootElementType });

    console.log({ fromBlockRootElementType, node });

    Transforms.setNodes(
      slate,
      { type: toBlockRootElementType },
      {
        at: [0],
        mode: 'lowest',
        match: (n) => Element.isElement(n) && !Editor.isInline(slate, n),
      },
    );

    const block: YooptaBlockData = {
      id: fromBlockData.id,
      type: toBlockType,
      meta: {
        ...fromBlockData.meta,
        order: fromBlockData.meta.order,
      },
      value: slate.children,
    };

    editor.blockEditorsMap[fromBlockData.id] = slate;
    editor.children[fromBlockData.id] = block;

    editor.children = finishDraft(editor.children);
    editor.applyChanges();

    // if (options?.focus) {
    //   editor.focusBlock(currentBlockId, { slate });
    // }
  });
}

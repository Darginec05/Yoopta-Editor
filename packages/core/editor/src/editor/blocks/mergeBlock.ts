import { Editor, Element, Path, Text, Transforms } from 'slate';
import { deepClone } from '../../utils/deepClone';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { YooptaOperation } from '../core/applyTransforms';
import { Elements } from '../elements';
import { Paths } from '../paths';
import { SlateEditor, YooEditor } from '../types';

export type MergeBlockOptions = {
  focus?: boolean;
  slate?: SlateEditor;
};

export function mergeBlock(editor: YooEditor, options: MergeBlockOptions = {}) {
  const { focus = true } = options;

  const currentBlock = findPluginBlockBySelectionPath(editor);
  const originalBlock = deepClone(currentBlock);
  const slate = findSlateBySelectionPath(editor, { at: editor.selection });

  const prevBlockPath = Paths.getPreviousPath(editor.selection);
  const slateToMerge = findSlateBySelectionPath(editor, { at: prevBlockPath });
  const blockToMerge = findPluginBlockBySelectionPath(editor, { at: prevBlockPath });
  const blockEntityToMerge = editor.blocks[blockToMerge?.type || ''];

  if (!slate || !slate.selection || !currentBlock || !slateToMerge || !blockToMerge) return;

  const prevBlockElementRoot = Elements.getElement(editor, blockToMerge.id);

  // [TODO] - if prev block has custom editor (not slate) or root element is void we need jump to prev prev block
  if (
    blockEntityToMerge &&
    blockEntityToMerge.hasCustomEditor &&
    prevBlockElementRoot &&
    prevBlockElementRoot.props.nodeType === 'void'
  ) {
    return;
  }

  const prevSlateText = Editor.string(slateToMerge, [0, 0]);
  // If previous block values is empty just delete block without merging
  if (prevSlateText.length === 0) {
    console.log('FiRED mergeBlock');
    return editor.deleteBlock({
      at: prevBlockPath,
      focus: true,
    });
  }

  Editor.withoutNormalizing(slate, () => {
    if (!slate.selection) return;

    const operations: YooptaOperation[] = [];

    const childNodeEntries = Array.from(
      Editor.nodes(slate, {
        at: [0],
        match: (n) => !Editor.isEditor(n) && (Text.isText(n) || Editor.isInline(slate, n)),
        mode: 'highest',
      }),
    );

    const childNodes = childNodeEntries.map(([node]) => node);
    Transforms.insertNodes(slateToMerge, childNodes, { at: Editor.end(slateToMerge, []) });

    const mergedBlock = {
      ...blockToMerge,
      value: slateToMerge.children,
    };

    console.log('currentBlock', currentBlock);
    console.log('mergedBlock', mergedBlock);

    operations.push({
      type: 'merge_block',
      sourceProperties: currentBlock,
      targetProperties: blockToMerge,
      mergedProperties: mergedBlock,
    });

    // decrement orders of all blocks after the merged block
    Object.values(editor.children).forEach((block) => {
      if (block.meta.order > blockToMerge.meta.order) {
        operations.push({
          type: 'set_block_meta',
          id: block.id,
          prevProperties: { ...block.meta, order: block.meta.order },
          properties: { ...block.meta, order: block.meta.order - 1 },
        });
      }
    });

    editor.applyTransforms(operations);

    if (focus && blockToMerge) {
      editor.focusBlock(blockToMerge.id, { slate: slateToMerge });
    }
  });
}

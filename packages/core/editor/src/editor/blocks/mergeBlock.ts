import { Editor, Text, Transforms } from 'slate';
import { deepClone } from '../../utils/deepClone';
import { findPluginBlockByPath } from '../../utils/findPluginBlockByPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { getLastNodePoint } from '../../utils/getLastNodePoint';
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

  const currentBlock = findPluginBlockByPath(editor);
  const slateToRemove = findSlateBySelectionPath(editor, { at: editor.path.current });

  const prevBlockPath = Paths.getPreviousPath(editor);
  const slateToMerged = findSlateBySelectionPath(editor, { at: prevBlockPath });
  const blockToMerge = findPluginBlockByPath(editor, { at: prevBlockPath });
  const blockEntityToMerge = editor.blocks[blockToMerge?.type || ''];

  if (!slateToRemove || !slateToRemove.selection || !currentBlock || !slateToMerged || !blockToMerge) return;
  const prevSlate = deepClone(slateToMerged);

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

  const prevSlateText = Editor.string(slateToMerged, [0, 0]);
  // If previous block values is empty just delete block without merging
  if (prevSlateText.length === 0) {
    return editor.deleteBlock({
      at: prevBlockPath,
      focus: true,
    });
  }

  Editor.withoutNormalizing(slateToRemove, () => {
    if (!slateToRemove.selection) return;

    const operations: YooptaOperation[] = [];

    const childNodeEntries = Array.from(
      Editor.nodes(slateToRemove, {
        at: [0],
        match: (n) => !Editor.isEditor(n) && (Text.isText(n) || Editor.isInline(slateToRemove, n)),
        mode: 'highest',
      }),
    );

    const childNodes = childNodeEntries.map(([node]) => node);
    Transforms.insertNodes(slateToMerged, childNodes, { at: Editor.end(slateToMerged, []) });

    const mergedBlock = {
      ...blockToMerge,
      value: slateToMerged.children,
    };

    operations.push({
      type: 'merge_block',
      sourceProperties: currentBlock,
      targetProperties: blockToMerge,
      mergedProperties: mergedBlock,
    });

    editor.applyTransforms(operations);

    if (focus && blockToMerge) {
      const lastPoint = getLastNodePoint(prevSlate);
      console.log('mergeBlock lastPoint', lastPoint);
      // editor.focusBlock(blockToMerge.id, { slate: prevSlate, focusAt: lastPoint });
    }
  });
}

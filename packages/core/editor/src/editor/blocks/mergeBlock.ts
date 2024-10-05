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
  const prevSlate = findSlateBySelectionPath(editor, { at: prevBlockPath });
  const prevBlock = findPluginBlockBySelectionPath(editor, { at: prevBlockPath });
  const prevBlockEntity = editor.blocks[prevBlock?.type || ''];

  if (!slate || !slate.selection || !currentBlock || !prevSlate || !prevBlock) return;

  const prevBlockElementRoot = Elements.getElement(editor, prevBlock.id);

  // [TODO] - if prev block has custom editor (not slate) or root element is void we need jump to prev prev block
  if (
    prevBlockEntity &&
    prevBlockEntity.hasCustomEditor &&
    prevBlockElementRoot &&
    prevBlockElementRoot.props.nodeType === 'void'
  ) {
    return;
  }

  const prevSlateText = Editor.string(prevSlate, [0, 0]);
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
    Transforms.insertNodes(prevSlate, childNodes, { at: Editor.end(prevSlate, []) });

    operations.push({
      type: 'merge_block',
      sourceProperties: currentBlock,
      targetProperties: prevBlock,
      mergedProperties: {
        ...prevBlock,
        value: prevSlate.children,
      },
      // slate: prevSlate,
    });

    // console.log('mergeBlock prevSlate', prevSlate);

    // editor.deleteBlock({
    //   at: editor.selection,
    //   focus: true,
    // });

    editor.applyTransforms(operations);

    if (focus && prevBlock) {
      editor.focusBlock(prevBlock.id, { slate: prevSlate });
    }
  });
}

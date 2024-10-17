import { Editor, Element, Path, Transforms } from 'slate';
import { buildSlateEditor } from '../../utils/buildSlate';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooptaOperation } from '../core/applyTransforms';
import { SlateEditor, SlateElement, YooEditor, YooptaBlockData } from '../types';

export type SplitBlockOptions = {
  focus?: boolean;
  slate?: SlateEditor;
};

export function splitBlock(editor: YooEditor, options: SplitBlockOptions = {}) {
  const { focus = true } = options;

  const blockToSplit = findPluginBlockBySelectionPath(editor);
  const slate = options.slate || findSlateBySelectionPath(editor);
  if (!slate || !blockToSplit) return;

  Editor.withoutNormalizing(slate, () => {
    if (!slate.selection) return;

    const operations: YooptaOperation[] = [];
    const parentPath = Path.parent(slate.selection.anchor.path);

    Transforms.splitNodes(slate, {
      at: slate.selection,
      match: (n) => Element.isElement(n),
      always: true,
      mode: 'highest',
    });

    const nextParentPathIndex = parentPath[0] + 1;
    const nextBlockSlateValue = slate.children[nextParentPathIndex] as SlateElement;

    Transforms.removeNodes(slate, {
      at: [nextParentPathIndex],
      match: (n) => Element.isElement(n),
      mode: 'highest',
    });

    const nextNewBlock: YooptaBlockData = {
      id: generateId(),
      type: blockToSplit.type,
      meta: {
        order: blockToSplit.meta.order + 1,
        depth: blockToSplit.meta.depth,
        align: blockToSplit.meta.align,
      },
      value: [],
    };

    const newSlate = buildSlateEditor(editor);
    newSlate.children = [nextBlockSlateValue];
    nextNewBlock.value = newSlate.children;

    operations.push({
      type: 'split_block',
      prevProperties: blockToSplit,
      properties: nextNewBlock,
      slate: newSlate,
    });

    // add events from plugins
    editor.applyTransforms(operations);

    if (focus) {
      editor.focusBlock(nextNewBlock.id, { slate: newSlate });
    }
  });
}

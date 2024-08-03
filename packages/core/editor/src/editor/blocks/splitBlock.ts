import { createDraft, finishDraft } from 'immer';
import { Editor, Element, Path, Text, Transforms } from 'slate';
import { buildSlateEditor } from '../../utils/buildSlate';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooEditor, YooptaBlockData, YooptaEditorTransformOptions } from '../types';

// [TODO] - handle cases for lists and nested inline elements
export function splitBlock(editor: YooEditor, options: YooptaEditorTransformOptions = {}) {
  const { slate, focus = true } = options;

  const currentBlock = findPluginBlockBySelectionPath(editor);
  if (!slate || !slate.selection || !currentBlock) return;

  Editor.withoutNormalizing(slate, () => {
    editor.children = createDraft(editor.children);

    const parentPath = Path.parent(slate.selection!.anchor.path);

    Transforms.splitNodes(slate, {
      at: slate.selection!,
      match: (n) => Element.isElement(n),
      always: true,
      mode: 'highest',
    });

    const nextParentPathIndex = parentPath[0] + 1;
    // [TODO] - or deep clone?
    const nextBlockChildren = slate.children.slice()[nextParentPathIndex];

    Transforms.removeNodes(slate, {
      at: [nextParentPathIndex],
      match: (n) => Element.isElement(n),
      mode: 'highest',
    });

    const newBlock: YooptaBlockData = {
      id: generateId(),
      type: currentBlock.type,
      meta: {
        order: currentBlock.meta.order + 1,
        depth: currentBlock.meta.depth,
        align: currentBlock.meta.align,
      },
      // [TODO] - check for mark text formats
      value: [nextBlockChildren],
    };

    Object.values(editor.children).forEach((plugin) => {
      if (plugin.meta.order >= newBlock.meta.order) {
        plugin.meta.order += 1;
      }
    });

    const newSlateEditor = buildSlateEditor(editor);
    editor.blockEditorsMap[newBlock.id] = newSlateEditor;
    editor.children[newBlock.id] = newBlock;

    editor.children = finishDraft(editor.children);
    editor.applyChanges();
    editor.emit('change', editor.children);

    if (focus) {
      // [TODO] - check focus for split block function
      editor.focusBlock(newBlock.id, { slate: newSlateEditor });
    }
  });
}

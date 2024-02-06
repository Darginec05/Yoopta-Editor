import { createDraft, finishDraft } from 'immer';
import { createEditor, Editor, Element, Path, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { generateId } from '../../utils/generateId';
import { YooEditor, YooptaChildrenValue, YooptaEditorOptions } from '../types';

// [TODO] - handle cases for lists and nested inline elements
export function splitBlock(editor: YooEditor, options: YooptaEditorOptions = {}) {
  const { slate, focus = true } = options;

  const pluginToSplit = findPluginBlockBySelectionPath(editor);
  if (!slate || !slate.selection || !pluginToSplit) return;

  Editor.withoutNormalizing(slate, () => {
    editor.children = createDraft(editor.children);

    const parentPath = Path.parent(slate.selection!.anchor.path);

    Transforms.splitNodes(slate, {
      at: slate.selection!,
      match: (n) => Element.isElement(n),
      always: true,
      mode: 'highest',
    });

    const nextChildren = slate.children.slice()[Path.next(parentPath)[0]];

    Transforms.removeNodes(slate, {
      at: [Path.next(parentPath)[0]],
      match: (n) => Element.isElement(n),
      mode: 'highest',
    });

    const newBlock: YooptaChildrenValue = {
      id: generateId(),
      type: pluginToSplit.type,
      meta: {
        order: pluginToSplit.meta.order + 1,
        depth: pluginToSplit.meta.depth,
      },
      value: [nextChildren],
    };

    Object.values(editor.children).forEach((plugin) => {
      if (plugin.meta.order >= newBlock.meta.order) {
        plugin.meta.order += 1;
      }
    });

    const newSlateEditor = withHistory(withReact(createEditor()));
    editor.blockEditorsMap[newBlock.id] = newSlateEditor;
    editor.children[newBlock.id] = newBlock;

    editor.children = finishDraft(editor.children);
    editor.applyChanges();

    if (focus) {
      editor.focusBlock(newBlock.id);
    }
  });
}

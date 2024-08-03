import { createDraft, finishDraft } from 'immer';
import { Editor, Path } from 'slate';
import { ReactEditor } from 'slate-react';
import { buildSlateEditor } from '../../utils/buildSlate';
import { findPluginBlockBySelectionPath } from '../../utils/findPluginBlockBySelectionPath';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { YooEditor, YooptaEditorTransformOptions, YooptaBlockData, YooptaBlockPath } from '../types';

export function insertBlocks(editor: YooEditor, blocks: YooptaBlockData[], options: YooptaEditorTransformOptions = {}) {
  editor.children = createDraft(editor.children);

  const { at, focus } = options;

  let currentPath = at || [0];
  const block = findPluginBlockBySelectionPath(editor);
  const slate = findSlateBySelectionPath(editor);
  let shouldDeleteCurrentBlock = false;
  let shouldAddAfter = false;

  if (slate && slate.selection) {
    const parentPath = Path.parent(slate.selection.anchor.path);
    const text = Editor.string(slate, parentPath).trim();
    const atStart = Editor.isStart(slate, slate.selection.anchor, parentPath);
    shouldDeleteCurrentBlock = text === '' && atStart;
    shouldAddAfter = !atStart || text.length > 0;

    ReactEditor.blur(slate);
    editor.setSelection(null);
  }

  if (shouldAddAfter) {
    currentPath = [currentPath[0] + 1];
  }

  Object.values(editor.children).forEach((block) => {
    if (block.meta.order >= currentPath[0]) {
      block.meta.order += blocks.length;
    }
  });

  const newPaths: number[] = [];

  blocks.forEach((blockData, index) => {
    const newPluginBlock = {
      id: blockData.id,
      value: blockData.value,
      type: blockData.type,
      meta: {
        ...blockData.meta,
        order: currentPath[0] + index,
      },
    };

    newPaths.push(newPluginBlock.meta.order);

    editor.children[newPluginBlock.id] = newPluginBlock;
    const newSlateEditor = buildSlateEditor(editor);
    editor.blockEditorsMap[newPluginBlock.id] = newSlateEditor;
  });

  if (block && shouldDeleteCurrentBlock) {
    const blockPosition = block.meta.order;
    delete editor.children[block.id];
    delete editor.blockEditorsMap[block.id];

    Object.keys(editor.children).forEach((blockId) => {
      const plugin = editor.children[blockId];
      if (plugin.meta.order > blockPosition) plugin.meta.order -= 1;
    });
  }

  editor.children = finishDraft(editor.children);

  editor.applyChanges();
  editor.emit('change', editor.children);

  if (focus) {
    editor.setBlockSelected(newPaths);
  }
}

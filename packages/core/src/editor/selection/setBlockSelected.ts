import { YooEditor, YooptaBlockPath } from '../types';

function uniqueArray<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export type BlockSelectedOptions = {
  only?: boolean;
  allSelected?: boolean;
};

export function setBlockSelected(editor: YooEditor, paths: number[] | null, options: BlockSelectedOptions = {}) {
  const { only = false, allSelected = false } = options;
  const selectedBlocks = editor.selectedBlocks || [];

  if (paths === null) {
    editor.selectedBlocks = null;
  } else {
    if (paths.length > 1) {
      editor.selectedBlocks = paths;
    } else if (only) {
      editor.selectedBlocks = paths;
    } else if (allSelected) {
      const blocks = Object.keys(editor.children).map((_, i) => i);
      editor.selectedBlocks = uniqueArray(blocks);
    } else {
      editor.selectedBlocks = uniqueArray(selectedBlocks.concat(paths));
    }
  }

  editor.applyChanges();
}

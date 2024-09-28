import { YooEditor, YooptaBlockPath } from '../types';

export type SetSelectionOptions = {
  applyChanges?: boolean;
};

export function setSelection(editor: YooEditor, path: YooptaBlockPath | null, options: SetSelectionOptions = {}) {
  const { applyChanges = true } = options;

  editor.selection = path;
}

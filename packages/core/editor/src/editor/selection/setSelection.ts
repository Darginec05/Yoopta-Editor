import { YooEditor, YooptaBlockPath } from '../types';

export type SetSelectionOptions = YooptaBlockPath;

export function setSelection(editor: YooEditor, path: SetSelectionOptions) {
  editor.applyTransforms([{ type: 'set_selection_block', path }]);
}

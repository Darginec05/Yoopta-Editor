import { YooEditor, YooptaPath } from '../types';

export function setPath(editor: YooEditor, path: YooptaPath) {
  editor.applyTransforms([{ type: 'set_selection_block', path }]);
}

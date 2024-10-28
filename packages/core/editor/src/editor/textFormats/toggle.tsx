import { Editor } from 'slate';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { YooEditor } from '../types';
import { isActive } from './isActive';

// [TODO] - check format argument
export function toggle(editor: YooEditor, type: string) {
  const slate = findSlateBySelectionPath(editor);
  const active = isActive(editor, type);

  if (!slate) return;

  if (!active) {
    Editor.addMark(slate, type, true);
  } else {
    Editor.removeMark(slate, type);
  }

  // editor.emit('change', { value: editor.children, operations: [] });
}

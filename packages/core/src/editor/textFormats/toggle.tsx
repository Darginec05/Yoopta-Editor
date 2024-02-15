import { Editor } from 'slate';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { YooEditor } from '../types';
import { isActive } from './isActive';

export function toggle(editor: YooEditor, format: any) {
  const slate = findSlateBySelectionPath(editor);
  const active = isActive(editor, format);

  if (!slate) return;

  if (!active) {
    Editor.addMark(slate, format.type, true);
  } else {
    Editor.removeMark(slate, format.type);
  }

  // editor.applyChanges();
}

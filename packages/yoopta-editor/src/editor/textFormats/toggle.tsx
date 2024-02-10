import { Editor } from 'slate';
import { findSlateEditorBySelectionPath } from '../../utils/findSlateEditorBySelectionPath';
import { YooEditor } from '../types';
import { isActive } from './isActive';

export function toggle(editor: YooEditor, format: any) {
  const slate = findSlateEditorBySelectionPath(editor);
  const active = isActive(editor, format);

  if (!slate) return;

  if (!active) {
    Editor.addMark(slate, format.type, true);
  } else {
    Editor.removeMark(slate, format.type);
  }

  // editor.applyChanges();
}

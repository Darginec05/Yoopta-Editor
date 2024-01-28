import { Editor } from 'slate';
import { TextFormats } from '..';
import { findSlateEditorBySelectionPath } from '../../utils/findSlateEditorBySelectionPath';
import { YooEditor } from '../types';

export function toggle(editor: YooEditor, format: any) {
  const slate = findSlateEditorBySelectionPath(editor);
  const isActive = TextFormats.isActive(editor, format);

  if (!slate) return;
  const marks = Editor.marks(slate) || {};

  if (!isActive) {
    Editor.addMark(slate, format.type, { ...marks, [format.type]: true });
  } else {
    Editor.removeMark(slate, format.type);
  }
}

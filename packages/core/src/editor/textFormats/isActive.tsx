import { Editor } from 'slate';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { YooEditor } from '../types';

export function isActive(editor: YooEditor, type: string) {
  const slate = findSlateBySelectionPath(editor);

  if (!slate) return false;
  const marks = Editor.marks(slate);

  return !!marks?.[type];
}

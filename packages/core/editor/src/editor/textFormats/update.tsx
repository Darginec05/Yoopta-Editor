import { Editor, Range } from 'slate';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { YooEditor } from '../types';

export function update(editor: YooEditor, type: any, value: any) {
  const slate = findSlateBySelectionPath(editor);

  if (!slate || !slate.selection) return;

  if (Range.isExpanded(slate.selection)) {
    Editor.addMark(slate, type, value);
    // editor.emit('change', { value: editor.children, operations: [] });
  }
}

import { Editor, Range } from 'slate';
import { findSlateEditorBySelectionPath } from '../../utils/findSlateEditorBySelectionPath';
import { YooEditor } from '../types';

export function update(editor: YooEditor, type: any, value: any) {
  const slate = findSlateEditorBySelectionPath(editor);

  if (!slate || !slate.selection) return;

  if (Range.isExpanded(slate.selection)) {
    Editor.addMark(slate, type, value);
    // editor.applyChanges();
  }
}

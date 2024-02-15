import { Editor } from 'slate';
import { YooptaMark } from '../../textFormatters/createYooptaMark';
import { findSlateBySelectionPath } from '../../utils/findSlateBySelectionPath';
import { TextFormat, YooEditor, YooptaPluginsEditorMap } from '../types';

export function isActive(editor: YooEditor, format: YooptaMark<any>) {
  const slate = findSlateBySelectionPath(editor);

  if (!slate) return false;
  const marks = Editor.marks(slate);
  return !!marks?.[format.type];
}

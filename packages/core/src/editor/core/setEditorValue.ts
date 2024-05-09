import { YooEditor, YooptaContentValue } from '../types';
import { buildBlockSlateEditors } from '../../utils/editorBuilders';

export function setEditorValue(editor: YooEditor, value: YooptaContentValue) {
  editor.children = value;
  editor.blockEditorsMap = buildBlockSlateEditors(editor);

  editor.applyChanges();
}

import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { SlateEditor, YooEditor } from '../editor/types';
import { withShortcuts } from '../extensions/shortcuts';

export function buildSlateEditor(editor: YooEditor): SlateEditor {
  const slate = withShortcuts(editor, withReact(createEditor()));
  return slate;
}

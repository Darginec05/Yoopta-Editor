import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { withReact } from 'slate-react';
import { SlateEditor, YooEditor } from '../editor/types';
import { withShortcuts } from '../extensions/shortcuts';

export function buildSlateEditor(editor: YooEditor): SlateEditor {
  const slate = withShortcuts(editor, withHistory(withReact(createEditor())));
  return slate;
}

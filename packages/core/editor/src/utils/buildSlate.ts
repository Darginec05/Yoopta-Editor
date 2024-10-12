import { createEditor } from 'slate';
import { withReact } from 'slate-react';
import { SlateEditor, YooEditor } from '../editor/types';
import { withShortcuts } from '../extensions/shortcuts';
import { withHistory } from 'slate-history';

export function buildSlateEditor(editor: YooEditor): SlateEditor {
  // const slate = withShortcuts(editor, withHistory(withReact(createEditor())));
  const slate = withShortcuts(editor, withReact(createEditor()));
  return slate;
}

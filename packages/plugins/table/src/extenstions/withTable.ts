import { SlateEditor, YooEditor } from '@yoopta/editor';
import { withDelete } from './withDelete';
import { withNormalize } from './withNormalize';
import { withSelection } from './withSelection';

export function withTable(slate: SlateEditor, editor: YooEditor) {
  slate = withSelection(slate);
  slate = withNormalize(slate, editor);
  slate = withDelete(slate);

  return slate;
}

import { SlateEditor } from '@yoopta/editor';
import { withDelete } from './withDelete';
import { withNormalize } from './withNormalize';
import { withSelection } from './withSelection';

export function withTable(slate: SlateEditor) {
  slate = withSelection(slate);
  slate = withNormalize(slate);
  slate = withDelete(slate);

  return slate;
}

import { EDITOR_IS_FOCUSED } from '../../utils/weakMaps';
import { YooEditor } from '../types';

export function focus(editor: YooEditor) {
  EDITOR_IS_FOCUSED.set(editor, true);
}

import { EDITOR_IS_FOCUSED } from '../../utils/weakMaps';
import { YooEditor } from '../types';

export function isFocused(editor: YooEditor) {
  return EDITOR_IS_FOCUSED.get(editor);
}

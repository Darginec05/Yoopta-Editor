import { YooEditor, YooptaContentValue } from '../types';
import { SetEditorValueOperation } from './applyTransforms';

export function setEditorValue(editor: YooEditor, value: YooptaContentValue) {
  const operation: SetEditorValueOperation = {
    type: 'set_editor_value',
    properties: {
      value,
    },
    prevProperties: {
      value: editor.children,
    },
  };

  editor.applyTransforms([operation], { validatePaths: true });
}

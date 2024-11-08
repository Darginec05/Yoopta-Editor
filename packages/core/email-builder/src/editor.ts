import { createYooptaEditor, EmailOptions } from '@yoopta/editor';
import { YooptaEmailEditor } from './utils/types';

export const createYooptaEmailEditor = (template: EmailOptions): YooptaEmailEditor => {
  const editor = createYooptaEditor() as YooptaEmailEditor;

  const { getEmail } = editor;
  editor.emailTemplate = template;
  editor.getEmail = (value) => {
    return getEmail(value, editor.emailTemplate);
  };

  return editor;
};

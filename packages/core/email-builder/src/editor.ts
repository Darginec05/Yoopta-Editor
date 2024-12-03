import { createYooptaEditor, EmailTemplateOptions } from '@yoopta/editor';
import { YooptaEmailEditor } from './utils/types';

export type YooptaEmailEditorOptions = {
  template: EmailTemplateOptions;
};

export const createYooptaEmailEditor = ({ template }: YooptaEmailEditorOptions): YooptaEmailEditor => {
  const editor = createYooptaEditor() as YooptaEmailEditor;

  const { getEmail } = editor;
  editor.emailTemplate = template;
  editor.getEmail = (value) => {
    return getEmail(value, editor.emailTemplate);
  };

  // [TODO] - for future
  // editor.sanitiazeEmail = (value) => {}
  // editor.validateEmail = (value) => {}

  return editor;
};

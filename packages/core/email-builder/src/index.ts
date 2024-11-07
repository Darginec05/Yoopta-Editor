import { EmailBuilder } from './components/EmailBuilder/EmailBuilder';
import { EmailPreview } from './components/EmailPreview/EmailPreview';
import { createYooptaEditor, EmailOptions } from '@yoopta/editor';

export default EmailBuilder;
export { EmailPreview };

import './styles.css';
import { YooptaEmailEditor } from './utils/types';
export { YooptaEmailEditor };

export const createYooptaEmailEditor = (template: EmailOptions): YooptaEmailEditor => {
  const editor = createYooptaEditor() as YooptaEmailEditor;

  const { getEmail } = editor;
  editor.emailTemplate = template;
  editor.getEmail = (value) => {
    return getEmail(value, editor.emailTemplate);
  };

  return editor;
};

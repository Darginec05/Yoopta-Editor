import { YooEditor, YooptaContentValue } from '@yoopta/editor';
import { getHTML } from './getHTML';

export function getPlainText(editor: YooEditor, content: YooptaContentValue) {
  const htmlString = getHTML(editor, content);

  const div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.innerText;
}

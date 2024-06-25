import { YooEditor, YooptaContentValue } from '@yoopta/editor';
import { serializeHTML } from '../html/serialize';

export function serializeText(editor: YooEditor, content: YooptaContentValue) {
  const htmlString = serializeHTML(editor, content);
  console.log('htmlString', htmlString);

  const div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.innerText;
}

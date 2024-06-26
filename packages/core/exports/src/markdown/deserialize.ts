import { YooEditor, YooptaContentValue } from '@yoopta/editor';
import { marked } from 'marked';
import { deserializeHTML } from '../html/deserialize';

export function deserializeMarkdown(editor: YooEditor, markdown: string): YooptaContentValue {
  const html = marked.parse(markdown, { gfm: true, breaks: true, pedantic: false }) as string;
  return deserializeHTML(editor, html);
}

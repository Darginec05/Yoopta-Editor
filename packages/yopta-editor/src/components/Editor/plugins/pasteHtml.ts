import { jsx } from 'slate-hyperscript';
import { Transforms } from 'slate';
import { generateId } from '../../../utils/generateId';
import { YoEditor } from '../../../types';

const ELEMENT_TAGS = {
  A: (el) => ({ id: generateId(), type: 'link', data: { url: el.getAttribute('href') } }),
  BLOCKQUOTE: () => ({ id: generateId(), type: 'blockquote' }),
  H1: () => ({ id: generateId(), type: 'heading-one' }),
  H2: () => ({ id: generateId(), type: 'heading-two' }),
  H3: () => ({ id: generateId(), type: 'heading-three' }),
  H4: () => ({ id: generateId(), type: 'heading-four' }),
  H5: () => ({ id: generateId(), type: 'heading-five' }),
  H6: () => ({ id: generateId(), type: 'heading-six' }),
  IMG: (el) => ({ id: generateId(), type: 'image', data: { url: el.getAttribute('src') } }),
  LI: () => ({ id: generateId(), type: 'list-item' }),
  OL: () => ({ id: generateId(), type: 'numbered-list' }),
  P: () => ({ id: generateId(), type: 'paragraph' }),
  PRE: () => ({ id: generateId(), type: 'code' }),
  UL: () => ({ id: generateId(), type: 'bulleted-list' }),
};

// COMPAT: `B` is omitted here because Google Docs uses `<b>` in weird ways.
const TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

export const deserialize = (el, plugins) => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === 'BR') {
    return '\n';
  }

  const { nodeName } = el;
  let parent = el;

  if (nodeName === 'PRE' && el.childNodes[0] && el.childNodes[0].nodeName === 'CODE') {
    parent = el.childNodes[0];
  }
  let children = Array.from(parent.childNodes)
    .map((node) => deserialize(node, plugins))
    .flat();

  if (children.length === 0) {
    children = [{ text: '' }];
  }

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el);
    return jsx('element', attrs, children);
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el);
    return children.map((child) => jsx('text', attrs, child));
  }

  return children;
};

const withHtml = (editor: YoEditor) => {
  const { insertData } = editor;

  editor.insertData = (data) => {
    const html = data.getData('text/html');

    if (html) {
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const fragment = deserialize(parsed.body, editor.plugins);
      Transforms.insertFragment(editor, fragment);
      return;
    }

    insertData(data);
  };

  return editor;
};

export { withHtml };

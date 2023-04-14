import { jsx } from 'slate-hyperscript';
import { ELEMENT_TYPES_MAP } from './constants';
import { generateId } from '../../utils/generateId';
import { YoEditor, YoptaBaseElement } from '../../types';
import { YoptaPluginType, YoptaRenderElementFunc } from '../../utils/plugins';

export const HTML_ELEMENT_TAGS = {
  A: (el) => ({ type: ELEMENT_TYPES_MAP.link, url: el.getAttribute('href'), id: generateId() }),
  BLOCKQUOTE: () => ({ type: ELEMENT_TYPES_MAP['block-quote'], id: generateId() }),
  H1: () => ({ type: ELEMENT_TYPES_MAP['heading-one'], id: generateId() }),
  H2: () => ({ type: ELEMENT_TYPES_MAP['heading-two'], id: generateId() }),
  H3: () => ({ type: ELEMENT_TYPES_MAP['heading-three'], id: generateId() }),
  H4: () => ({ type: ELEMENT_TYPES_MAP['heading-three'], id: generateId() }),
  H5: () => ({ type: ELEMENT_TYPES_MAP['heading-three'], id: generateId() }),
  H6: () => ({ type: ELEMENT_TYPES_MAP['heading-three'], id: generateId() }),
  IMG: (el) => ({ type: 'image', url: el.getAttribute('src'), id: generateId() }),
  LI: () => ({ type: ELEMENT_TYPES_MAP['list-item'], id: generateId() }),
  OL: () => ({ type: ELEMENT_TYPES_MAP['numbered-list'], id: generateId() }),
  UL: () => ({ type: ELEMENT_TYPES_MAP['bulleted-list'], id: generateId() }),
  P: () => ({ type: ELEMENT_TYPES_MAP.paragraph, id: generateId() }),
  PRE: () => ({ type: ELEMENT_TYPES_MAP.code, id: generateId() }),
};

export const HTML_TEXT_TAGS = {
  CODE: () => ({ code: true }),
  DEL: () => ({ strikethrough: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  S: () => ({ strikethrough: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

export const deserializeHTML = (el) => {
  if (el.nodeType === 3) {
    return el.textContent;
  }
  if (el.nodeType !== 1) {
    return null;
  }
  if (el.nodeName === 'BR') {
    return '\n';
  }

  const { nodeName } = el;
  let parent = el;

  if (nodeName === 'PRE' && el.childNodes[0] && el.childNodes[0].nodeName === 'CODE') {
    // eslint-disable-next-line prefer-destructuring
    parent = el.childNodes[0];
  }
  let children = Array.from(parent.childNodes).map(deserializeHTML).flat();

  if (children.length === 0) {
    children = [{ text: '' }];
  }

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }

  if (HTML_ELEMENT_TAGS[nodeName]) {
    const attrs = HTML_ELEMENT_TAGS[nodeName](el);
    return jsx('element', attrs, children);
  }

  if (HTML_TEXT_TAGS[nodeName]) {
    const attrs = HTML_TEXT_TAGS[nodeName](el);
    return children.map((child) => jsx('text', attrs, child));
  }

  console.log('children', children);

  return children;
};

// Make recursive for deep nested items
export const getNodeByCurrentPath = (editor: YoEditor) => {
  const { path } = editor.selection!.anchor;
  const level = path.length;

  const isNestedLevel = level > 2;
  const isRootLevel = !isNestedLevel;
  const rootNode: any = editor.children[path[0] || 0];

  if (isRootLevel) {
    return rootNode;
  }

  return rootNode.children[path[1]];
};

export const getDefaultParagraphLine = (id: string): YoptaBaseElement<'paragraph'> => ({
  id,
  type: 'paragraph',
  nodeType: 'block',
  children: [{ text: '' }],
});

export function getRenderFunctionFactory(plugin: YoptaPluginType): YoptaRenderElementFunc {
  if (typeof plugin.renderer === 'function') {
    return plugin.renderer;
  }

  return plugin.renderer.editor;
}

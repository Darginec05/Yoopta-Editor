import { ReactEditor } from 'slate-react';
import { Editor, Text, Element as SlateElement, Transforms, Range, Path } from 'slate';
import { jsx } from 'slate-hyperscript';
import { LinkElement, ParagraphElement } from './types';
import { ELEMENT_TYPES_MAP, LIST_TYPES } from './constants';
import { generateId } from '../../utils/generateId';

export const getNodePath = (editor: Editor, node: any) => {
  // [TODO] - some when lost focus bug
  const path = ReactEditor.findPath(editor, node);
  const isListItem = [ELEMENT_TYPES_MAP['list-item']].includes(node.type);

  let nodePath = path.length === 1 ? [path[0], 0] : path;
  if (isListItem) nodePath = [...nodePath, 0];

  return nodePath;
};

export const isMarkActive = (editor: Editor, mark: any): boolean => {
  const marks: Omit<Text, 'text'> | null = Editor.marks(editor);

  return !!marks?.[mark];
};

export const getMatchedNode = (editor: Editor, type: any) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === type,
    }),
  );

  return match;
};

export const isBlockActive = (editor: Editor, type: any) => !!getMatchedNode(editor, type);

export const toggleMark = (editor: Editor, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const getMarks = (editor: Editor) => {
  const marks = Object.keys(Editor.marks(editor) || {});
  return marks;
};

export const removeMarks = (editor: Editor) => {
  const marks = getMarks(editor);

  if (marks.length > 0) {
    marks.forEach((mark) => {
      Editor.removeMark(editor, mark);
    });
  }
};

export const getElementClassname = (element) => `yopta-${element.type}`;

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
export const getNodeByCurrentPath = (editor: Editor) => {
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

export const getDefaultParagraphLine = (): ParagraphElement => ({
  id: generateId(),
  type: 'paragraph',
  children: [
    {
      text: '',
    },
  ],
});

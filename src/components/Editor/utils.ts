import { ReactEditor } from 'slate-react';
import { Editor, Text, Element as SlateElement, Transforms, Range, Path } from 'slate';
import { v4 } from 'uuid';
import { jsx } from 'slate-hyperscript';
import { LinkElement } from './types';
import { ELEMENT_TYPES_MAP, LIST_TYPES } from './constants';

export const getNodePath = (editor: Editor, node: any) => {
  // [TODO] - some when lost focus bug
  const path = ReactEditor.findPath(editor, node);
  const isListItem = [ELEMENT_TYPES_MAP['list-item']].includes(node.type);

  let nodePath = path.length === 1 ? [path[0], 0] : path;
  if (isListItem) nodePath = [...nodePath, 0];

  return nodePath;
};

export const getNodeByPath = (editor: Editor, path?: Path, mode: 'all' | 'highest' | 'lowest' = 'lowest') => {
  const nodeEntry = Array.from(
    Editor.nodes(editor, {
      match: (node) => Editor.isEditor(editor) && SlateElement.isElement(node),
      at: path || editor.selection?.anchor.path,
      mode,
    }),
  )[0];

  if (nodeEntry) return nodeEntry[0];

  return editor.children[0];
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

// [TODO] - fix deleting '/' after adding or toggling nodes
export const toggleBlock = (editor: Editor, blockType: any, data: any = { isVoid: false }) => {
  Editor.withoutNormalizing(editor, () => {
    const isActive = isBlockActive(editor, blockType);
    const isList = LIST_TYPES.includes(blockType);
    const node = {
      id: v4(),
      // eslint-disable-next-line no-nested-ternary
      type: isActive ? 'paragraph' : isList ? 'list-item' : blockType,
      ...data,
    };

    if (data.isVoid) {
      node.type = blockType;
    }

    Transforms.unwrapNodes(editor, {
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes(n.type),
      split: true,
    });

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });

    if (!isActive && isList) {
      const block = { id: v4(), type: blockType, children: [{ text: '' }] };
      Transforms.wrapNodes(editor, block, {
        at: editor.selection?.anchor,
      });
    }
  });
};

export const toggleMark = (editor: Editor, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const removeLinkNode = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === ELEMENT_TYPES_MAP.link,
  });
};

export const addLinkNode = (editor: Editor, url: string) => {
  if (isBlockActive(editor, ELEMENT_TYPES_MAP.link)) {
    removeLinkNode(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkElement = {
    id: v4(),
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const getRectByCurrentSelection = (): DOMRect | undefined => {
  const domSelection = window.getSelection();
  if (!domSelection) return;

  try {
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();

    return rect;
  } catch (error) {}
};

export const getAbsPositionBySelection = (element) => {
  if (!element) return { top: -10000, left: -10000 };

  const selectionRect = getRectByCurrentSelection();

  if (!selectionRect) return {};

  const elementRect = element.getBoundingClientRect();

  return {
    top: selectionRect.top - elementRect.height,
    left: selectionRect.left + window.pageXOffset - elementRect.width / 2 + selectionRect.width / 2,
  };
};

export const KEYBOARD_SHORTCUTS = {
  '*': ELEMENT_TYPES_MAP['list-item'],
  '-': ELEMENT_TYPES_MAP['list-item'],
  '+': ELEMENT_TYPES_MAP['list-item'],
  '1.': ELEMENT_TYPES_MAP['list-item'],
  '>': ELEMENT_TYPES_MAP['block-quote'],
  '<': ELEMENT_TYPES_MAP.callout,
  hw: ELEMENT_TYPES_MAP.code,
  '#': ELEMENT_TYPES_MAP['heading-one'],
  h1: ELEMENT_TYPES_MAP['heading-one'],
  '##': ELEMENT_TYPES_MAP['heading-two'],
  h2: ELEMENT_TYPES_MAP['heading-two'],
  '###': ELEMENT_TYPES_MAP['heading-three'],
  h3: ELEMENT_TYPES_MAP['heading-three'],
};

export const capitalizeFirstLetter = (string?: string): string | undefined =>
  string ? string.charAt(0).toUpperCase() + string.slice(1) : undefined;

export const getElementClassname = (element) => `yopta-${element.type}`;

export const getMediaAspectRatio = (srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) => {
  if (!srcWidth || !srcHeight) return {};
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
};

export const HTML_ELEMENT_TAGS = {
  A: (el) => ({ type: ELEMENT_TYPES_MAP.link, url: el.getAttribute('href'), id: v4() }),
  BLOCKQUOTE: () => ({ type: ELEMENT_TYPES_MAP['block-quote'], id: v4() }),
  H1: () => ({ type: ELEMENT_TYPES_MAP['heading-one'], id: v4() }),
  H2: () => ({ type: ELEMENT_TYPES_MAP['heading-two'], id: v4() }),
  H3: () => ({ type: ELEMENT_TYPES_MAP['heading-three'], id: v4() }),
  H4: () => ({ type: ELEMENT_TYPES_MAP['heading-three'], id: v4() }),
  H5: () => ({ type: ELEMENT_TYPES_MAP['heading-three'], id: v4() }),
  H6: () => ({ type: ELEMENT_TYPES_MAP['heading-three'], id: v4() }),
  IMG: (el) => ({ type: 'image', url: el.getAttribute('src'), id: v4() }),
  LI: () => ({ type: ELEMENT_TYPES_MAP['list-item'], id: v4() }),
  OL: () => ({ type: ELEMENT_TYPES_MAP['numbered-list'], id: v4() }),
  UL: () => ({ type: ELEMENT_TYPES_MAP['bulleted-list'], id: v4() }),
  P: () => ({ type: ELEMENT_TYPES_MAP.paragraph, id: v4() }),
  PRE: () => ({ type: ELEMENT_TYPES_MAP.code, id: v4() }),
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

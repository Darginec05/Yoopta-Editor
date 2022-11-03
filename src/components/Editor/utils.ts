import { Editor, Text, Element as SlateElement, Transforms, Range } from 'slate';
import { v4 } from 'uuid';
import { LinkElement } from './types';
import { ELEMENT_TYPES_MAP } from './constants';

export const HOTKEYS: Record<string, string> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

export const LIST_TYPES = ['numbered-list', 'bulleted-list'];

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
export const toggleBlock = (
  editor: Editor,
  blockType: any,
  data: any = { isVoid: false },
) => {
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
  '##': ELEMENT_TYPES_MAP['heading-two'],
  '###': ELEMENT_TYPES_MAP['heading-three'],
};

export const capitalizeFirstLetter = (string?: string): string | undefined =>
  (string ? string.charAt(0).toUpperCase() + string.slice(1) : undefined);

export const getElementClassname = (element) => `yopta-${element.type}`;

export const getMediaAspectRatio = (srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) => {
  if (!srcWidth || !srcHeight) return {};
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth * ratio, height: srcHeight * ratio };
};

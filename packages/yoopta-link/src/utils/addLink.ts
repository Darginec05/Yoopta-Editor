import { generateId, isElementActive, YooEditor } from '@yoopta/editor';
import { Range, Transforms } from 'slate';
import { LinkElement } from '../types';
import { removeLinkNode } from './removeLink';

export const addLinkNode = (editor: YooEditor, url: string) => {
  if (isElementActive(editor, 'link')) {
    removeLinkNode(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkElement = {
    id: generateId(),
    type: 'link',
    data: { url, skipDrag: true },
    children: isCollapsed ? [{ text: url }] : [],
    nodeType: 'inline',
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

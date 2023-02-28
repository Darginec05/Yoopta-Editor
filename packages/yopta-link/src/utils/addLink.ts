import { generateId, isElementActive } from '@yopta/editor';
import { Editor, Range, Transforms } from 'slate';
import { removeLinkNode } from './removeLink';

type LinkElement = any;

export const addLinkNode = (editor: Editor, url: string) => {
  if (isElementActive(editor, 'link')) {
    removeLinkNode(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkElement = {
    id: generateId(),
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

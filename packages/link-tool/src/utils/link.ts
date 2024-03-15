import { generateId, YooEditor, YooptaBaseElement } from '@yoopta/editor';
import { Editor, Element, Range, Transforms } from 'slate';

export const removeLinkNode = (editor: YooEditor, selection: Range) => {
  Editor.withoutNormalizing(editor, () => {
    Transforms.unwrapNodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
      at: selection.anchor.path,
      mode: 'lowest',
    });
  });
};

export const addLinkNode = (editor: YooEditor, url: string, selection: Range) => {
  Editor.withoutNormalizing(editor, () => {
    let linkSelection: Range = selection;

    if (isLinkNodeActive(editor, selection)) {
      removeLinkNode(editor, selection);

      linkSelection = {
        anchor: { ...linkSelection.anchor, path: linkSelection.anchor.path.slice(0, -1) },
        focus: { ...linkSelection.focus, path: linkSelection.focus.path.slice(0, -1) },
      };
    }

    const link: YooptaBaseElement<'link'> = {
      id: generateId(),
      type: 'link',
      data: { url, skipDrag: true },
      children: [],
      nodeType: 'inline',
    };

    Transforms.wrapNodes(editor, link, { split: true, at: linkSelection });
    Transforms.collapse(editor, { edge: 'end' });
  });
};

export const isLinkNodeActive = (editor: YooEditor, selection: Range) => {
  return !!getMatchedLinkNode(editor, selection);
};

export const getMatchedLinkNode = (editor: Editor, selection: Range) => {
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
    }),
  );

  return match;
};

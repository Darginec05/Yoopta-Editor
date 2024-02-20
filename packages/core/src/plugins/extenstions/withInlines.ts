import { Editor, Element as SlateElement, Transforms, Range } from 'slate';

// [TODO] - JUST FOR TEST
function isUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
  return !!link;
};

const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
};

const wrapLink = (editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;

  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: 'link',
    children: isCollapsed ? [{ text: url }] : [],
    props: {
      url,
      target: '_blank',
      rel: 'noreferrer',
    },
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const withInlines = (editor) => {
  const { insertData, insertText, isInline, isElementReadOnly, isSelectable } = editor;

  editor.isInline = (element) => ['link', 'mention'].includes(element.type) || isInline(element);
  // editor.isElementReadOnly = (element) => element.type === 'mention' || isElementReadOnly(element);
  // editor.isSelectable = (element) => element.type === 'mention' && isSelectable(element);

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

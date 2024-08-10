import { Editor, Element as SlateElement, Transforms, Range } from 'slate';
import { SlateEditor, YooEditor } from '../../editor/types';

// [TODO] - JUST FOR TEST
function isUrl(string) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i',
  );

  return !!pattern.test(string);
}

const isLinkActive = (slate) => {
  const [link] = Editor.nodes(slate, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
  return !!link;
};

const removeLink = (slate) => {
  Transforms.unwrapNodes(slate, {
    match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
};

const addLink = (editor: YooEditor, slate: SlateEditor, url: string) => {
  if (isLinkActive(slate)) {
    removeLink(slate);
  }

  const { selection } = slate;
  const isCollapsed = selection && Range.isCollapsed(selection);

  // Should be moved to the Link plugin
  const defaultLinkProps: Record<string, unknown> | undefined = editor.plugins?.LinkPlugin?.elements?.link?.props;

  const link = {
    type: 'link',
    children: isCollapsed ? [{ text: url }] : [],
    props: {
      url,
      target: defaultLinkProps?.target || '_self',
      rel: defaultLinkProps?.rel || 'noopener noreferrer',
    },
  } as SlateElement;

  if (isCollapsed) {
    Transforms.insertNodes(slate, link);
  } else {
    Transforms.wrapNodes(slate, link, { split: true });
    Transforms.collapse(slate, { edge: 'end' });
  }
};

export const withInlines = (editor: YooEditor, slate: SlateEditor) => {
  const { insertData, insertText } = slate;

  // slate.isInline = (element) => ['link', 'mention'].includes(element.type) || isInline(element);

  slate.insertText = (text) => {
    if (text && isUrl(text)) {
      addLink(editor, slate, text);
    } else {
      insertText(text);
    }
  };

  slate.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      addLink(editor, slate, text);
    } else {
      insertData(data);
    }
  };

  return slate;
};

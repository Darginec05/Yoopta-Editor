import { Element, NodeEntry, Text } from 'slate';
import { Editor, Range, Transforms } from 'slate';
import { YooEditor, YooptaBaseElement } from '../../../types';

export const withShortcuts = (editor: YooEditor) => {
  const { insertText } = editor;

  editor.insertText = (text: string) => {
    const { selection } = editor;

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;

      const blockEntry: NodeEntry<YooptaBaseElement<string>> | undefined = Editor.above(editor, {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
        mode: 'lowest',
      });

      if (!blockEntry) return;

      const [, currentNodePath] = blockEntry;
      const parentEntry = Editor.parent(editor, currentNodePath);
      const [parentNodeElement] = parentEntry;

      if (Element.isElement(parentNodeElement) && !Text.isText(parentNodeElement.children[0])) return insertText(text);

      const path = blockEntry ? currentNodePath : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);

      const mathchedPlugin = editor.shortcuts?.[beforeText];

      if (!!mathchedPlugin) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        mathchedPlugin.createElement?.(editor);
        return;
      }
    }

    insertText(text);
  };

  return editor;
};

import { Element, Text } from 'slate';
import { Editor, Range, Transforms } from 'slate';
import { YoEditor, YoptaBaseElement } from '../../../types';
import { generateId } from '../../../utils/generateId';

export const withShortcuts = (editor: YoEditor) => {
  const { insertText } = editor;

  editor.insertText = (text: string) => {
    const { selection } = editor;

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;

      const block: any = Editor.above(editor, {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
        mode: 'lowest',
      });

      const parentBlock = Editor.parent(editor, block[1]);

      console.log('block', block);
      console.log('parentBlock', parentBlock);
      console.log('Text.isText(parentBlock[0].children[0])', Text.isText(parentBlock[0].children[0]));

      if (Element.isElement(parentBlock) && !Text.isText(parentBlock[0].children[0])) return insertText(text);

      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);

      const type = editor.shortcuts?.[beforeText];

      console.log({ type });

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);

        Transforms.setNodes<YoptaBaseElement<string>>(
          editor,
          { type },
          {
            match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
          },
        );

        if (type === 'list-item') {
          const list: any = {
            id: generateId(),
            type: beforeText === '-' ? 'bulleted-list' : 'numbered-list',
            children: [],
          };
          Transforms.wrapNodes(editor, list, {
            match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === 'list-item',
          });
        }

        return;
      }
    }

    insertText(text);
  };

  return editor;
};

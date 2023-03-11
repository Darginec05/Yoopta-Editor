import { Element } from 'slate';
import { Editor, Range, Transforms } from 'slate';
import { generateId } from '../../../utils/generateId';
import { ELEMENT_TYPES_MAP } from '../constants';

export const KEYBOARD_SHORTCUTS = {
  '*': ELEMENT_TYPES_MAP['list-item'],
  '-': ELEMENT_TYPES_MAP['list-item'],
  '+': ELEMENT_TYPES_MAP['list-item'],
  '1.': ELEMENT_TYPES_MAP['list-item'],
  '>': ELEMENT_TYPES_MAP['block-quote'],
  '<': ELEMENT_TYPES_MAP.callout,
  bug: ELEMENT_TYPES_MAP.code,
  '#': ELEMENT_TYPES_MAP['heading-one'],
  h1: ELEMENT_TYPES_MAP['heading-one'],
  '##': ELEMENT_TYPES_MAP['heading-two'],
  h2: ELEMENT_TYPES_MAP['heading-two'],
  '###': ELEMENT_TYPES_MAP['heading-three'],
  h3: ELEMENT_TYPES_MAP['heading-three'],
};

export const withShortcuts = (editor: Editor) => {
  const { insertText } = editor;

  editor.insertText = (text: string) => {
    const { selection } = editor;

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;

      const block: any = Editor.above(editor, {
        match: (n) => Element.isElement(n) && Editor.isBlock(editor, n),
      });

      if (block?.[0].type === 'list-item') {
        return insertText(text);
      }

      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);

      const type = editor.shortcuts?.[beforeText];

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);

        Transforms.setNodes<Element>(
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

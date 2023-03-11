import { YoptaComponent, generateId, getNodeByPath } from '@yopta/editor';
import { memo } from 'react';
import { Editor, Element, Transforms } from 'slate';
import { RenderElementProps } from 'slate-react';
import s from './Paragraph.module.scss';

const ParagraphRender = ({ attributes, children, element }) => {
  return (
    <p draggable={false} className={s.paragraph} {...attributes}>
      {children}
    </p>
  );
};

ParagraphRender.displayName = 'Paragraph';

const Paragraph = new YoptaComponent({
  type: 'paragraph',
  renderer: (editor) => ParagraphRender,
  handlers: {
    onKeyDown:
      (editor, { hotkeys }) =>
      (event) => {
        if (!editor.selection) return;
        const node = getNodeByPath(editor, editor.selection.anchor.path, 'highest');

        if (node.type !== 'paragraph') return;

        const paragraphEntry = Editor.above(editor, {
          at: editor.selection.anchor.path,
          match: (n) => Element.isElement(n) && n.type === 'paragraph',
        });

        if (!paragraphEntry) return;

        const text = Editor.string(editor, paragraphEntry[1]);

        // if (hotkeys.isSelect(event)) {
        //   event.preventDefault();

        //   Transforms.select(editor, text.length === 0 ? [] : paragraphEntry[1]);
        //   return;
        // }

        // if (hotkeys.isSoftBreak(event)) {
        //   event.preventDefault();

        //   editor.insertText('\n');
        //   return;
        // }

        // if (hotkeys.isSplitBlock(event)) {
        //   event.preventDefault();

        //   Transforms.splitNodes(editor, { always: true });
        //   Transforms.setNodes(editor, { id: generateId() });
        //   return;
        // }
      },
  },
});

export { Paragraph };

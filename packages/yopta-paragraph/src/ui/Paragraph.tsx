import { createYoptaComponent, getNodeByPath } from '@yopta/editor';
import { memo } from 'react';
import { Editor, Element, Transforms } from 'slate';
import s from './Paragraph.module.scss';

const ParagraphRender = memo<any>(({ attributes, children, element }) => {
  return (
    <p draggable={false} className={s.paragraph} {...attributes}>
      {children}
    </p>
  );
});

ParagraphRender.displayName = 'Paragraph';

const Paragraph = createYoptaComponent({
  type: 'paragraph',
  renderer: (editor) => (props) => <ParagraphRender {...props} />,
  handlers: {
    onKeyDown:
      (editor, { hotkeys }) =>
      (event) => {
        if (!editor.selection) return;
        const node = getNodeByPath(editor, editor.selection.anchor.path, 'highest');

        if (hotkeys.isSelect(event)) {
          event.preventDefault();

          const codeEntry = Editor.above(editor, {
            at: editor.selection.anchor.path,
            match: (n) => Element.isElement(n) && n.type === 'paragraph',
          });

          if (!codeEntry) return;
          Transforms.select(editor, codeEntry[1]);
          return;
        }
      },
  },
});

export { Paragraph };

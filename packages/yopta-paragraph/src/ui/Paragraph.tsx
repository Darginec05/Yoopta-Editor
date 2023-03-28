import { YoptaPlugin, generateId } from '@yopta/editor';
import { Transforms } from 'slate';
import s from './Paragraph.module.scss';

const ParagraphRender = ({ attributes, children, element }) => {
  return (
    <p draggable={false} className={s.paragraph} {...attributes}>
      {children}
    </p>
  );
};

ParagraphRender.displayName = 'Paragraph';

const Paragraph = new YoptaPlugin({
  type: 'paragraph',
  renderer: (editor) => ParagraphRender,
  createNode: (editor, type, data) => {
    console.log('editor.selection?.anchor', editor.selection?.anchor);

    const node = {
      id: generateId(),
      type,
      ...data,
    };

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
});

export { Paragraph };

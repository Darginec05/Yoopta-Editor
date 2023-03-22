import { generateId, YoptaComponent } from '@yopta/editor';
import { Transforms } from 'slate';
import s from './Blockquote.module.scss';

const BlockquoteRender = ({ attributes, children, element }) => {
  return (
    <blockquote draggable={false} className={s.blockquote} {...attributes}>
      {children}
    </blockquote>
  );
};

BlockquoteRender.displayName = 'Blockquote';

const Blockquote = new YoptaComponent({
  type: 'block-quote',
  renderer: (editor) => BlockquoteRender,
  shortcut: '>',
  createNode: (editor, type, data) => {
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

export { Blockquote };

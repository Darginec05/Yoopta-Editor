import { createYoptaPlugin, generateId, RenderElementProps } from '@yopta/editor';
import { Transforms } from 'slate';
import { BlockquoteElement } from '../types';
import s from './Blockquote.module.scss';

const BlockquoteRender = ({ attributes, children, element }: RenderElementProps<BlockquoteElement>) => {
  return (
    <blockquote draggable={false} className={s.blockquote} {...attributes}>
      {children}
    </blockquote>
  );
};

BlockquoteRender.displayName = 'Blockquote';

const Blockquote = createYoptaPlugin<any, BlockquoteElement>({
  type: 'block-quote',
  renderer: (editor) => BlockquoteRender,
  shortcut: '>',
  createNode: (editor, type, data) => {
    const node: BlockquoteElement = {
      id: generateId(),
      type: 'blockquote',
      children: [{ text: '' }],
    };

    Transforms.setNodes<BlockquoteElement>(editor, node, {
      at: editor.selection?.anchor,
    });
  },
});

export { Blockquote };

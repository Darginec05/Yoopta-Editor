import { createYooptaPlugin, generateId, RenderYooptaElementProps } from '@yoopta/editor';
import { Transforms } from 'slate';
import { BlockquoteElement } from '../types';
import s from './Blockquote.module.scss';

const BlockquoteRender = ({ attributes, children, element }: RenderYooptaElementProps<BlockquoteElement>) => {
  return (
    <blockquote draggable={false} className={s.blockquote} {...attributes}>
      {children}
    </blockquote>
  );
};

BlockquoteRender.displayName = 'Blockquote';

const Blockquote = createYooptaPlugin<any, BlockquoteElement>({
  type: 'blockquote',
  renderer: (editor) => BlockquoteRender,
  shortcut: '>',
  defineElement: (): BlockquoteElement => ({
    id: generateId(),
    type: 'blockquote',
    children: [{ text: '' }],
    nodeType: 'block',
  }),
  createElement: (editor) => {
    const node: BlockquoteElement = Blockquote.getPlugin.defineElement();

    Transforms.setNodes<BlockquoteElement>(editor, node, {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    markdown: {
      serialize: (node, text) => `> ${text}`,
    },
    html: {
      serialize: (node, children) =>
        `<blockquote style="border-left: 3px solid; color: #292929; padding: 2px 14px; margin: 0">${children}</blockquote>`,
      deserialize: {
        nodeName: 'BLOCKQUOTE',
      },
    },
  },
});

export { Blockquote };

import { generateId, createYoptaPlugin, RenderElementProps } from '@yopta/editor';
import { Transforms } from 'slate';
import { ParagraphElement } from '../types';
import s from './Paragraph.module.scss';

const ParagraphRender = ({ attributes, children, element }: RenderElementProps<ParagraphElement>) => {
  return (
    <p draggable={false} className={s.paragraph} {...attributes}>
      {children}
    </p>
  );
};

ParagraphRender.displayName = 'Paragraph';

const Paragraph = createYoptaPlugin<any, ParagraphElement>({
  type: 'paragraph',
  renderer: (editor) => ParagraphRender,
  createNode: (editor, type, data) => {
    const node: ParagraphElement = {
      id: generateId(),
      type: 'paragraph',
      children: [{ text: '' }],
    };

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
});

export { Paragraph };

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
  getElement: (): ParagraphElement => ({
    id: generateId(),
    type: 'paragraph',
    children: [{ text: '' }],
    nodeType: 'block',
  }),
  createElement: function (editor, type, data) {
    const node: ParagraphElement = this.getElement();

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
});

export { Paragraph };

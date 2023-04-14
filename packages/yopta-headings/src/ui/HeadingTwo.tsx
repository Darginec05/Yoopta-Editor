import { createYoptaPlugin, generateId, RenderElementProps } from '@yopta/editor';
import { Transforms } from 'slate';
import { HeadingTwoElement } from '../types';
import s from './HeadingTwo.module.scss';

const HeadingTwoRender = ({ attributes, children, element }: RenderElementProps<HeadingTwoElement>) => {
  return (
    <h2 draggable={false} className={s['heading-two']} {...attributes}>
      {children}
    </h2>
  );
};

HeadingTwoRender.displayName = 'HeadingTwo';

const HeadingTwo = createYoptaPlugin<any, HeadingTwoElement>({
  type: 'heading-two',
  renderer: (editor) => HeadingTwoRender,
  shortcut: 'h2',
  defineElement: (): HeadingTwoElement => ({
    id: generateId(),
    type: 'heading-two',
    children: [{ text: '' }],
    nodeType: 'block',
  }),
  createElement: function (editor, type, data) {
    const node: HeadingTwoElement = HeadingTwo.getPlugin.defineElement();

    Transforms.setNodes<HeadingTwoElement>(editor, node, {
      at: editor.selection?.anchor,
    });
  },
});

export { HeadingTwo };

import { generateId, createYoptaPlugin, RenderElementProps } from '@yopta/editor';
import { Transforms } from 'slate';
import { HeadingThreeElement } from '../types';
import s from './HeadingThree.module.scss';

const HeadingThreeRender = ({ attributes, children, element }: RenderElementProps<HeadingThreeElement>) => {
  return (
    <h3 draggable={false} className={s['heading-three']} {...attributes}>
      {children}
    </h3>
  );
};

HeadingThreeRender.displayName = 'HeadingThree';

const HeadingThree = createYoptaPlugin<any, HeadingThreeElement>({
  type: 'heading-three',
  renderer: (editor) => HeadingThreeRender,
  shortcut: 'h3',
  placeholder: 'Heading 3',
  defineElement: (): HeadingThreeElement => ({
    id: generateId(),
    type: 'heading-three',
    children: [{ text: '' }],
    nodeType: 'block',
  }),
  createElement: function (editor) {
    const node: HeadingThreeElement = HeadingThree.getPlugin.defineElement();

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
});

export { HeadingThree };

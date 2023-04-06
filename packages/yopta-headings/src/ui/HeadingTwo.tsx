import { createYoptaPlugin, generateId } from '@yopta/editor';
import { Transforms } from 'slate';
import { RenderElementProps } from 'slate-react';
import { HeadingTwoElement } from '../types';
import s from './HeadingTwo.module.scss';

const HeadingTwoRender = ({ attributes, children, element }: RenderElementProps) => {
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
  createNode: (editor, type, data = null) => {
    const node: HeadingTwoElement = {
      id: generateId(),
      type: 'heading-two',
      children: [{ text: '' }],
    };

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
});

export { HeadingTwo };

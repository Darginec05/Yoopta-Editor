import { generateId, YoptaComponent } from '@yopta/editor';
import { Transforms } from 'slate';
import { RenderElementProps } from 'slate-react';
import s from './HeadingTwo.module.scss';

const HeadingTwoRender = ({ attributes, children, element }: RenderElementProps) => {
  return (
    <h2 draggable={false} className={s['heading-two']} {...attributes}>
      {children}
    </h2>
  );
};

HeadingTwoRender.displayName = 'HeadingTwo';

const HeadingTwo = new YoptaComponent({
  type: 'heading-two',
  renderer: (editor) => HeadingTwoRender,
  shortcut: 'h2',
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

export { HeadingTwo };

import { generateId, YoptaComponent } from '@yopta/editor';
import { Transforms } from 'slate';
import { RenderElementProps } from 'slate-react';
import s from './HeadingThree.module.scss';

const HeadingThreeRender = ({ attributes, children, element }: RenderElementProps) => {
  return (
    <h3 draggable={false} className={s['heading-three']} {...attributes}>
      {children}
    </h3>
  );
};

HeadingThreeRender.displayName = 'HeadingThree';

const HeadingThree = new YoptaComponent({
  type: 'heading-three',
  renderer: (editor) => HeadingThreeRender,
  shortcut: 'h3',
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

export { HeadingThree };

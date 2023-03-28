import { generateId, YoptaPlugin } from '@yopta/editor';
import { Transforms } from 'slate';
import { RenderElementProps } from 'slate-react';
import s from './HeadingOne.module.scss';

const HeadingRender = ({ attributes, children, element }: RenderElementProps) => {
  return (
    <h1 draggable={false} className={s['heading-one']} {...attributes}>
      {children}
    </h1>
  );
};

HeadingRender.displayName = 'HeadingOne';

const HeadingOne = new YoptaPlugin({
  type: 'heading-one',
  renderer: (editor) => HeadingRender,
  shortcut: 'h1',
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

export { HeadingOne };

import { createYoptaPlugin, generateId, RenderElementProps } from '@yopta/editor';
import { Transforms } from 'slate';
import { HeadingOneElement } from '../types';
import s from './HeadingOne.module.scss';

const HeadingRender = ({ attributes, children, element }: RenderElementProps<HeadingOneElement>) => {
  return (
    <h1 draggable={false} className={s['heading-one']} {...attributes}>
      {children}
    </h1>
  );
};

HeadingRender.displayName = 'HeadingOne';

const HeadingOne = createYoptaPlugin<any, HeadingOneElement>({
  type: 'heading-one',
  renderer: (editor) => HeadingRender,
  shortcut: 'h1',
  createNode: (editor, type, data) => {
    const node: HeadingOneElement = {
      id: generateId(),
      type: 'heading-one',
      children: [{ text: '' }],
    };

    Transforms.setNodes<HeadingOneElement>(editor, node, {
      at: editor.selection?.anchor,
    });
  },
});

export { HeadingOne };

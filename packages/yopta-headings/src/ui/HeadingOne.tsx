import { createYoptaPlugin, generateId, RenderElementProps } from '@yopta/editor';
import { Text, Transforms } from 'slate';
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
  shortcut: 'title',
  placeholder: 'Heading 1',

  defineElement: (): HeadingOneElement => ({
    id: generateId(),
    type: 'heading-one',
    children: [{ text: '' }],
    nodeType: 'block',
  }),
  createElement: function (editor) {
    const node: HeadingOneElement = HeadingOne.getPlugin.defineElement();

    Transforms.setNodes<HeadingOneElement>(editor, node, {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    markdown: {
      serialize: (node, text) => `# ${text}`,
      deserialize: (node) => '',
    },
    html: {
      serialize: (node) => 'lolkek',
      deserialize: (node) => '',
    },
  },
});

export { HeadingOne };

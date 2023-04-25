import { createYoptaPlugin, generateId, RenderElementProps } from '@yopta/editor';
import { Text, Transforms } from 'slate';
import { HeadingOneElement, HeadingOptions } from '../types';
import s from './HeadingOne.module.scss';

const HeadingOneRender = ({ attributes, children, element }: RenderElementProps<HeadingOneElement>) => {
  return (
    <h1 id={element.id} draggable={false} className={s['heading-one']} {...attributes}>
      {children}
    </h1>
  );
};

HeadingOneRender.displayName = 'HeadingOne';

const HeadingOne = createYoptaPlugin<HeadingOptions, HeadingOneElement>({
  type: 'heading-one',
  renderer: (editor) => HeadingOneRender,
  shortcut: ['title', 'h1', 'heading one', '#'],
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
  options: {
    anchor: '#',
  },
});

export { HeadingOne };

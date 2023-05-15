import { createYooptaPlugin, generateId, getElementClassname, RenderYooptaElementProps } from '@yoopta/editor';
import { Transforms } from 'slate';
import { HeadingOneElement, HeadingOptions } from '../types';
import s from './HeadingOne.module.scss';

const HeadingOneRender = ({
  attributes,
  children,
  element,
  HTMLAttributes,
}: RenderYooptaElementProps<HeadingOneElement>) => {
  return (
    <h1
      id={element.id}
      draggable={false}
      {...HTMLAttributes}
      className={getElementClassname<HeadingOneElement>({ element, HTMLAttributes, className: s['heading-one'] })}
      {...attributes}
    >
      {children}
    </h1>
  );
};

HeadingOneRender.displayName = 'HeadingOne';

const HeadingOne = createYooptaPlugin<HeadingOptions, HeadingOneElement>({
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
  createElement: (editor) => {
    const node: HeadingOneElement = HeadingOne.getPlugin.defineElement();

    Transforms.setNodes<HeadingOneElement>(editor, node, {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    markdown: {
      serialize: (node, text) => `# ${text}`,
    },
    html: {
      serialize: (node, children) => `<h1>${children}</h1>`,
      deserialize: {
        nodeName: 'H1',
      },
    },
  },
  options: {
    anchor: '#',
    searchString: 'h1 title',
    displayLabel: 'Heading 1',
  },
});

export { HeadingOne };

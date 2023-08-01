import { createYooptaPlugin, generateId, getElementClassname, RenderYooptaElementProps } from '@yoopta/editor';
import { Transforms } from 'slate';
import { HeadingOptions, HeadingTwoElement } from '../types';
import s from './HeadingTwo.module.scss';

const HeadingTwoRender = ({
  attributes,
  children,
  element,
  HTMLAttributes,
}: RenderYooptaElementProps<HeadingTwoElement>) => {
  return (
    <h2
      id={element.id}
      draggable={false}
      {...HTMLAttributes}
      className={getElementClassname<HeadingTwoElement>({ element, HTMLAttributes, className: s['heading-two'] })}
      {...attributes}
    >
      {children}
    </h2>
  );
};

HeadingTwoRender.displayName = 'HeadingTwo';

const HeadingTwo = createYooptaPlugin<HeadingOptions, HeadingTwoElement>({
  type: 'heading-two',
  renderer: (editor) => HeadingTwoRender,
  shortcut: ['h2', 'subtitle', '##'],
  placeholder: 'Heading 2',
  defineElement: (): HeadingTwoElement => ({
    id: generateId(),
    type: 'heading-two',
    children: [{ text: '' }],
    nodeType: 'block',
  }),
  createElement: (editor, elementData) => {
    const node: HeadingTwoElement = { ...HeadingTwo.getPlugin.defineElement(), ...elementData };

    Transforms.setNodes<HeadingTwoElement>(editor, node, {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    markdown: {
      serialize: (node, text) => `## ${text}`,
    },
    html: {
      serialize: (node, children) => `<h2>${children}</h2>`,
      deserialize: {
        nodeName: 'H2',
      },
    },
  },
  options: {
    anchor: '#',
    searchString: 'h2 subtitle',
    displayLabel: 'Heading 2',
  },
});

export { HeadingTwo };

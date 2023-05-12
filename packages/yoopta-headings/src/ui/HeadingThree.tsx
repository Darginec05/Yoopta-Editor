import { generateId, createYooptaPlugin, RenderYooptaElementProps, getElementClassname } from '@yoopta/editor';
import { Transforms } from 'slate';
import { HeadingOptions, HeadingThreeElement } from '../types';
import s from './HeadingThree.module.scss';

const HeadingThreeRender = ({
  attributes,
  children,
  element,
  HTMLAttributes,
}: RenderYooptaElementProps<HeadingThreeElement>) => {
  return (
    <h3
      id={element.id}
      draggable={false}
      {...HTMLAttributes}
      className={getElementClassname<HeadingThreeElement>({ element, HTMLAttributes, className: s['heading-three'] })}
      {...attributes}
    >
      {children}
    </h3>
  );
};

HeadingThreeRender.displayName = 'HeadingThree';

const HeadingThree = createYooptaPlugin<HeadingOptions, HeadingThreeElement>({
  type: 'heading-three',
  renderer: (editor) => HeadingThreeRender,
  shortcut: ['h3', 'subsubtitle', '###'],
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
  exports: {
    markdown: {
      serialize: (node, text) => `### ${text}`,
    },
    html: {
      serialize: (node, children) => `<h3>${children}</h3>`,
      deserialize: {
        nodeName: ['H3', 'H4', 'H5', 'H6'],
      },
    },
  },
  options: {
    anchor: '#',
  },
});

export { HeadingThree };

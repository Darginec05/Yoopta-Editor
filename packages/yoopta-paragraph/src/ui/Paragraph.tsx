import {
  generateId,
  createYooptaPlugin,
  RenderYooptaElementProps,
  getElementClassname,
  YooptaPluginBaseOptions,
} from '@yoopta/editor';
import { Transforms } from 'slate';
import { ParagraphElement } from '../types';
import s from './Paragraph.module.scss';

const ParagraphRender = ({
  attributes,
  children,
  element,
  HTMLAttributes,
}: RenderYooptaElementProps<ParagraphElement>) => {
  return (
    <p
      draggable={false}
      {...HTMLAttributes}
      className={getElementClassname<ParagraphElement>({ element, HTMLAttributes, className: s.paragraph })}
      {...attributes}
    >
      {children}
    </p>
  );
};

ParagraphRender.displayName = 'Paragraph';

const Paragraph = createYooptaPlugin<YooptaPluginBaseOptions, ParagraphElement>({
  type: 'paragraph',
  renderer: (editor) => ParagraphRender,
  defineElement: (): ParagraphElement => ({
    id: generateId(),
    type: 'paragraph',
    children: [{ text: '' }],
    nodeType: 'block',
  }),
  createElement: (editor, elementData) => {
    const node: ParagraphElement = { ...Paragraph.getPlugin.defineElement(), ...elementData };

    Transforms.setNodes(editor, node, {
      at: editor.selection?.anchor,
    });
  },
  exports: {
    markdown: {
      serialize: (node, text) => `${text}\n`,
    },
    html: {
      serialize: (node, children) => `<p>${children}</p>`,
      deserialize: {
        nodeName: 'P',
      },
    },
  },
  options: {
    searchString: 'text paragraph',
    displayLabel: 'Paragraph',
  },
});

export { Paragraph };

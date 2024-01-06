import { generateId } from '../../utils/generateId';

const codeText = `import { RenderElementProps } from 'slate-react';
import { createUltraPlugin } from '../../ultraPlugins';

const ParagraphRender = (props: RenderElementProps) => {
  return (
    <p data-element-type="Paragraph" {...props.attributes}>
      {props.children}
    </p>
  );
};

const Paragraph = createUltraPlugin({
  type: 'paragraph',
  render: ParagraphRender,
});

export { Paragraph };
`;

export const YOOPTA_ULTRA_VALUES = {
  paragraph: [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ],
  code: [
    {
      type: 'code',
      children: [{ text: codeText }],
    },
  ],
  blockquote: [
    {
      type: 'blockquote',
      children: [{ text: 'A line of text in a blockquote' }],
    },
  ],
};

export const DEFAULT_ULTRA_PLUGIN = {
  type: 'paragraph',
  children: [{ text: '' }],
};

export const YOOPTA_EDITOR_ULTRA_VALUE = {
  li3D16cCB7Ze5jxy8OwrN: YOOPTA_ULTRA_VALUES.paragraph,
  ir9BOyBAjjXB3NyjXfZXm: YOOPTA_ULTRA_VALUES.code,
  'Gci1KGGfnlup_h4Ta-AOI': YOOPTA_ULTRA_VALUES.blockquote,
  ATrb0U6MPHzdn8XRTm5M6: YOOPTA_ULTRA_VALUES.paragraph,
  HGQj3faHJkbMGFcBJNUgj: YOOPTA_ULTRA_VALUES.blockquote,
};

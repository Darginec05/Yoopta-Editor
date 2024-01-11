import { generateId } from '../../utils/generateId';
import { UltraYooptaContextPlugin } from './contexts/UltraYooptaContext/UltraYooptaContext';

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
  paragraph: () => ({
    value: [
      {
        id: generateId(),
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ],
    type: 'paragraph',
    meta: {
      order: 0,
    },
  }),
  code: () => ({
    value: [
      {
        id: generateId(),
        type: 'code',
        children: [{ text: codeText }],
      },
    ],
    type: 'code',
    meta: {
      order: 1,
    },
  }),
  blockquote: () => ({
    value: [
      {
        id: generateId(),
        type: 'blockquote',
        children: [{ text: 'A line of text in a blockquote' }],
      },
    ],
    type: 'blockquote',
    meta: {
      order: 2,
    },
  }),
  video: () => ({
    value: [
      {
        id: generateId(),
        type: 'video',
        children: [{ text: '' }],
        data: {
          src: 'https://www.youtube.com/embed/7FjgBBwKgJA',
          poster: 'https://i.ytimg.com/vi/7FjgBBwKgJA/maxresdefault.jpg',
          height: 315,
          width: 560,
        },
      },
    ],
    type: 'video',
    meta: {
      order: 3,
    },
  }),
};

export const DEFAULT_ULTRA_PLUGIN = {
  id: generateId(),
  type: 'paragraph',
  children: [{ text: 'DEFAULT_ULTRA_PLUGIN!' }],
};

export const YOOPTA_EDITOR_ULTRA_VALUE = {
  li3D16cCB7Ze5jxy8OwrN: YOOPTA_ULTRA_VALUES.paragraph(),
  ir9BOyBAjjXB3NyjXfZXm: YOOPTA_ULTRA_VALUES.code(),
  'Gci1KGGfnlup_h4Ta-AOI': YOOPTA_ULTRA_VALUES.blockquote(),
  ATrb0U6MPHzdn8XRTm5M6: YOOPTA_ULTRA_VALUES.paragraph(),
  HGQj3faHJkbMGFcBJNUgj: YOOPTA_ULTRA_VALUES.blockquote(),
  HGQj3faHJkbMGFcasdaBJNUgj: YOOPTA_ULTRA_VALUES.video(),
};

import { YooptaBlockPlugin, YooptaEditorSlateBaseData } from '../../editor/types';
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

export const YOOPTA_ULTRA_VALUES: Record<
  string,
  (id: string, meta: YooptaBlockPlugin['meta']) => YooptaBlockPlugin<YooptaEditorSlateBaseData>
> = {
  paragraph: (id, meta) => ({
    id,
    value: [
      {
        id: generateId(),
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ],
    type: 'paragraph',
    meta,
  }),
  code: (id, meta) => ({
    id,
    value: [
      {
        id: generateId(),
        type: 'code',
        children: [{ text: codeText }],
      },
    ],
    type: 'code',
    meta,
  }),
  blockquote: (id, meta) => ({
    id,
    value: [
      {
        id: generateId(),
        type: 'blockquote',
        children: [{ text: 'A line of text in a blockquote' }],
      },
    ],
    type: 'blockquote',
    meta,
  }),
  video: (id, meta) => ({
    id,
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
    meta,
  }),
  link: (id, meta) => ({
    id,
    value: [
      {
        id: generateId(),
        type: 'link',
        children: [{ text: '' }],
        data: {
          url: 'https://www.youtube.com/embed/7FjgBBwKgJA',
          target: '_blank',
          rel: 'noreferrer',
        },
      },
    ],
    type: 'link',
    meta,
  }),
};

export const DEFAULT_ULTRA_PLUGIN_ELEMENT = {
  id: generateId(),
  type: 'paragraph',
  children: [{ text: '' }],
};

export const getDefaultUltraBlock = () => ({
  id: generateId(),
  value: [DEFAULT_ULTRA_PLUGIN_ELEMENT],
  type: 'paragraph',
  meta: {},
});

export const YOOPTA_EDITOR_ULTRA_VALUE = {
  li3D16cCB7Ze5jxy8OwrN: YOOPTA_ULTRA_VALUES.paragraph('li3D16cCB7Ze5jxy8OwrN', { order: 0, depth: 0, type: 'block' }),
  ir9BOyBAjjXB3NyjXfZXm: YOOPTA_ULTRA_VALUES.code('ir9BOyBAjjXB3NyjXfZXm', { order: 1, depth: 0, type: 'block' }),
  'Gci1KGGfnlup_h4Ta-AOI': YOOPTA_ULTRA_VALUES.blockquote('Gci1KGGfnlup_h4Ta-AOI', {
    order: 2,
    depth: 0,
    type: 'block',
  }),
  ATrb0U6MPHzdn8XRTm5M6: YOOPTA_ULTRA_VALUES.paragraph('ATrb0U6MPHzdn8XRTm5M6', { order: 3, depth: 0, type: 'block' }),
  HGQj3faHJkbMGFcBJNUgj: YOOPTA_ULTRA_VALUES.blockquote('HGQj3faHJkbMGFcBJNUgj', { order: 4, depth: 0, type: 'block' }),
  HGQj3faHJkbVIDEO: YOOPTA_ULTRA_VALUES.video('HGQj3faHJkbMGFcasdaBJNUgj', {
    order: 5,
    depth: 0,
    type: 'void',
  }),
  HGQj3faHJkbMGFcasdLINK: YOOPTA_ULTRA_VALUES.link('HGQj3faHJkbMGFcasdLINK', { type: 'inline' }),
};

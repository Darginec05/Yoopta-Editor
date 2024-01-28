import { YooptaChildrenValue, YooptaEditorSlateBaseData } from '../../editor/types';
import { generateId } from '../../utils/generateId';

const codeText = `import { RenderElementProps } from 'slate-react';
import { createPlugin } from '../../ultraPlugins';

const ParagraphRender = (props: RenderElementProps) => {
  return (
    <p data-element-type="Paragraph" {...props.attributes}>
      {props.children}
    </p>
  );
};

const Paragraph = createPlugin({
  type: 'paragraph',
  render: ParagraphRender,
});

export { Paragraph };
`;

export const YOOPTA_ULTRA_VALUES: Record<
  string,
  (id: string, meta: YooptaChildrenValue['meta'], children?: any[]) => YooptaChildrenValue<YooptaEditorSlateBaseData>
> = {
  paragraph: (id, meta, children) => ({
    id,
    value: [
      {
        id: generateId(),
        type: 'paragraph',
        children: children || [
          { text: 'A line of text in a paragraph.' },
          INLINE_LINK_ELEMENT,
          { text: 'link via the toolbar icon above,' },
          INLINE_MENTION_ELEMENT,
        ],
      },
    ],
    type: 'ParagraphPlugin',
    meta,
  }),
  code: (id, meta, children) => ({
    id,
    value: [
      {
        id: generateId(),
        type: 'code',
        children: children || [{ text: codeText }],
      },
    ],
    type: 'Code',
    meta,
  }),
  blockquote: (id, meta, children) => ({
    id,
    type: 'BlockquotePlugin',
    value: [
      {
        id: generateId(),
        type: 'blockquote',
        children: children || [{ text: 'A line of text in a blockquote' }],
      },
    ],
    meta,
  }),
  video: (id, meta, children) => ({
    id,
    type: 'VideoPlugin',
    value: [
      {
        id: generateId(),
        type: 'video',
        children: children || [{ text: '' }],
        data: {
          src: 'https://www.youtube.com/embed/7FjgBBwKgJA',
          poster: 'https://i.ytimg.com/vi/7FjgBBwKgJA/maxresdefault.jpg',
          height: 315,
          width: 560,
        },
      },
    ],
    meta,
  }),
  // link: (id, meta) => ({
  //   id,
  //   value: [
  //     {
  //       id: generateId(),
  //       type: 'link',
  //       children: [{ text: '' }],
  //       data: {
  //         url: 'https://www.youtube.com/embed/7FjgBBwKgJA',
  //         target: '_blank',
  //         rel: 'noreferrer',
  //       },
  //     },
  //   ],
  //   type: 'link',
  //   meta,
  // }),
};

export const DEFAULT_ULTRA_PLUGIN_ELEMENT = {
  id: generateId(),
  type: 'paragraph',
  children: [{ text: '' }],
};

export const INLINE_LINK_ELEMENT = {
  id: generateId(),
  type: 'link',
  children: [{ text: 'Finally, here is our favorite dog video.' }],
  data: {
    url: 'https://twitter.com/JustMissEmma/status/1448679899531726852',
    target: '_blank',
    rel: 'noreferrer',
  },
};

export const INLINE_MENTION_ELEMENT = {
  id: generateId(),
  type: 'mention',
  children: [{ text: '@elon.musk' }],
  data: {
    url: 'https://twitter.com/teo_bale/',
    target: '_blank',
    rel: 'noreferrer',
  },
};

export const getDefaultYooptaChildrenValue = (id): YooptaChildrenValue => ({
  id,
  value: [DEFAULT_ULTRA_PLUGIN_ELEMENT],
  type: 'ParagraphPlugin',
  meta: {
    order: 0,
    depth: 0,
  },
});

export const getDefaultYooptaChildren = () => {
  const id = generateId();

  return {
    [id]: getDefaultYooptaChildrenValue(id),
  };
};

export const FAKE_YOOPTA_EDITOR_CHILDREN = {
  li3D16cCB7Ze5jxy8OwrN: YOOPTA_ULTRA_VALUES.paragraph('li3D16cCB7Ze5jxy8OwrN', { order: 0, depth: 0 }),
  ir9BOyBAjjXB3NyjXfZXm: YOOPTA_ULTRA_VALUES.code('ir9BOyBAjjXB3NyjXfZXm', { order: 1, depth: 0 }),
  'Gci1KGGfnlup_h4Ta-AOI': YOOPTA_ULTRA_VALUES.blockquote('Gci1KGGfnlup_h4Ta-AOI', {
    order: 2,
    depth: 0,
  }),
  ATrb0U6MPHzdn8XRTm5M6: YOOPTA_ULTRA_VALUES.paragraph('ATrb0U6MPHzdn8XRTm5M6', { order: 3, depth: 0 }, [
    {
      text: `I used slate for a small project last week and enjoyed it quite a bit at the beginning. I also have a sandbox to demonstrate the usage: `,
    },
    {
      text: `I wrote a util function to get around the shortcomings. For my case, a word includes EN letters, numbers, and dashes. `,
      italic: true,
    },
    {
      text: `(i.e. "hello-world-123")`,
      highlight: {
        color: 'red',
      },
    },
    { text: ' Sharing my util function in case it can help others.' },
    {
      type: 'link',
      children: [{ text: ' https://codesandbox.io/s/slatejs-word-selection-7j7j7' }],
      data: { url: 'https://codesandbox.io/s/slate-customize-word-f6vkbh' },
    },
    { text: ' .But it "word" only consider english letters bugged me when the selection' },
    {
      text: ' The idea is to first define a regular expression (a.k.a "regexp") for the word.',
      bold: true,
    },
    {
      text: ` Then use slate's Range.end(editor.selection) to get the current cursor position. Note the current cursor position. From current cursor and keep going left until the character doesn't match regexp.`,
    },
  ]),
  HGQj3faHJkbMGFcBJNUgj: YOOPTA_ULTRA_VALUES.blockquote('HGQj3faHJkbMGFcBJNUgj', { order: 4, depth: 0 }),
  // HGQj3faHJkbMGFcasdaBJNUgj: YOOPTA_ULTRA_VALUES.video('HGQj3faHJkbMGFcasdaBJNUgj', {
  //   order: 5,
  //   depth: 0,
  // }),
  // HGQj3faHJkbMGFcasdLINK: YOOPTA_ULTRA_VALUES.link('HGQj3faHJkbMGFcasdLINK', { type: 'inline' }),
};

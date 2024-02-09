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
          { text: ' last' },
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
    type: 'CodePlugin',
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
  callout: (id, meta, children) => ({
    id,
    type: 'CalloutPlugin',
    value: [
      {
        id: generateId(),
        type: 'callout',
        children: children || [{ text: 'A line of text in a callout' }],
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
        props: {
          src: 'https://www.youtube.com/embed/7FjgBBwKgJA',
          poster: 'https://i.ytimg.com/vi/7FjgBBwKgJA/maxresdefault.jpg',
          height: 315,
          width: 560,
        },
      },
    ],
    meta,
  }),
  numberedList: (id, meta, children) => ({
    id,
    type: 'NumberedListPlugin',
    value: [
      {
        id: generateId(),
        type: 'numbered-list',
        children: [
          {
            id: generateId(),
            type: 'list-item',
            children: [{ text: 'Select the text you want to change into a list.' }],
            props: { depth: 0 },
          },
          {
            id: generateId(),
            type: 'list-item',
            children: [{ text: 'To complete your list, press Enter until the bullets or numbering switch off.' }],
            props: { depth: 0 },
          },
          {
            id: generateId(),
            type: 'list-item',
            children: [{ text: 'Type* and a space before your text, and Word will make a bulleted list.' }],
            props: { depth: 0 },
          },
        ],
      },
    ],
    meta,
  }),
  table: (id, meta, children) => ({
    id,
    type: 'Table',
    value: [
      {
        id: generateId(),
        type: 'table',
        children: [
          {
            id: generateId(),
            type: 'table-row',
            children: [
              {
                id: generateId(),
                type: 'table-cell',
                children: [{ text: '' }],
              },
              {
                id: generateId(),
                type: 'table-cell',
                children: [{ text: 'Human', bold: true }],
              },
              {
                id: generateId(),
                type: 'table-cell',
                children: [{ text: 'Dog', bold: true }],
              },
              {
                id: generateId(),
                type: 'table-cell',
                children: [{ text: 'Cat', bold: true }],
              },
            ],
          },
          {
            id: generateId(),
            type: 'table-row',
            children: [
              {
                id: generateId(),
                type: 'table-cell',
                children: [{ text: '# of Feet', bold: true }],
              },
              {
                id: generateId(),
                type: 'table-cell',
                children: [{ text: '2' }],
              },
              {
                id: generateId(),
                type: 'table-cell',
                children: [{ text: '4' }],
              },
              {
                id: generateId(),
                type: 'table-cell',
                children: [{ text: '4' }],
              },
            ],
          },
          {
            id: generateId(),
            type: 'table-row',
            children: [
              {
                id: generateId(),
                type: 'table-cell',
                children: [{ text: '# of Lives', bold: true }],
              },
              {
                id: generateId(),
                type: 'table-cell',
                children: [{ text: '1' }],
              },
              {
                id: generateId(),
                type: 'table-cell',
                children: [{ text: '1' }],
              },
              {
                id: generateId(),
                type: 'table-cell',
                children: [{ text: '9' }],
              },
            ],
          },
        ],
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
  //       props: {
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
  props: {
    url: 'https://twitter.com/JustMissEmma/status/1448679899531726852',
    target: '_blank',
    rel: 'noreferrer',
  },
};

export const INLINE_MENTION_ELEMENT = {
  id: generateId(),
  type: 'mention',
  children: [{ text: '' }],
  props: {
    url: 'https://twitter.com/teo_bale/',
    target: '_blank',
    rel: 'noreferrer',
    character: 'elon.musk',
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
  li3D16cCB7Ze5jxy8OwrN_0: YOOPTA_ULTRA_VALUES.paragraph('li3D16cCB7Ze5jxy8OwrN_0', { order: 0, depth: 0 }),
  // [TODO]
  code_7: YOOPTA_ULTRA_VALUES.code('code_7', { order: 7, depth: 0 }),
  blockquote_1: YOOPTA_ULTRA_VALUES.blockquote(
    'blockquote_1',
    {
      order: 1,
      depth: 0,
    },
    [
      {
        text: `Finally, we'll need to set up event handlers on the DndContext provider in order to update the order of the items on drag end.`,
      },
    ],
  ),
  paragraph_2: YOOPTA_ULTRA_VALUES.paragraph('paragraph_2', { order: 2, depth: 0 }, [
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
      props: { url: 'https://codesandbox.io/s/slate-customize-word-f6vkbh' },
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
  callout_4: YOOPTA_ULTRA_VALUES.callout('callout_4', { order: 5, depth: 0 }, [
    {
      text: `To note, Redux has RTK, which helps with precisely this type of structure. It also has lots of helper functions to help you organize, select and update each entity. It's not an ORM, but you can use an ORM on top of it.`,
    },
  ]),
  blockquote_7: YOOPTA_ULTRA_VALUES.blockquote('blockquote_7', { order: 8, depth: 0 }),
  table_7: YOOPTA_ULTRA_VALUES.table('table_7', { order: 9, depth: 0 }),
  HGQj3faHJkbMGFcasdaBJNUgj_5: YOOPTA_ULTRA_VALUES.video('HGQj3faHJkbMGFcasdaBJNUgj_5', {
    order: 6,
    depth: 0,
  }),
  anotherway_3: YOOPTA_ULTRA_VALUES.blockquote(
    'anotherway_3',
    {
      order: 3,
      depth: 0,
    },
    [
      {
        text: `I am trying to use D3 parallel parcoords and Material-table together in one app. Each component works well individual. but when those are render together an issue is occurred inside react-beautiful-dnd. D3 parallel parcoords uses d3-dragging package inside and material-table uses react-beautiful-dnd package.`,
      },
    ],
  ),
  numbered_list_id: YOOPTA_ULTRA_VALUES.numberedList('numbered_list_id', { order: 4, depth: 0 }),
  // HGQj3faHJkbMGFcasdLINK: YOOPTA_ULTRA_VALUES.link('HGQj3faHJkbMGFcasdLINK', { type: 'inline' }),
};

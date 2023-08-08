import { Inter } from 'next/font/google';
import NextImage from 'next/image';
import { useState } from 'react';
import { Descendant } from 'slate';
import YooptaEditor from '@yoopta/editor';

import Paragraph from '@yoopta/paragraph';
import Blockquote from '@yoopta/blockquote';
import Code from '@yoopta/code';
import Embed from '@yoopta/embed';
import Image from '@yoopta/image';
import Link from '@yoopta/link';
import Callout from '@yoopta/callout';
import Video from '@yoopta/video';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import { Bold, Italic, CodeMark, Underline, Strike } from '@yoopta/marks';
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings';

import ActionMenu, { ActionMenuItem } from '@yoopta/action-menu-list';
import { uploadToCloudinary } from '@/utils/cloudinary';
import Toolbar from '@yoopta/toolbar';
import { yooptaInitData, YooptaValue } from '@/utils/initialData';
import { NotionActionMenu } from '@/components/SuggestionList/NotionActionMenu';
import { NotionToolbar } from '@/components/Toolbars/NotionToolbar';

const inter = Inter({ subsets: ['latin'] });

const INITIAL_VALUE: YooptaValue[] = [
  {
    id: '_d8RWaRAWV3Z3odUaIElv',
    type: 'heading-three',
    nodeType: 'block',
    children: [
      {
        text: 'With Notion style example',
      },
    ],
  },
  {
    id: 'vPt3vfSb2X6DXauKld1q3',
    type: 'paragraph',
    nodeType: 'block',
    children: [
      {
        text: 'In this example you can see notion-style rendering of ',
      },
      {
        text: 'ActionMenuList',
        bold: true,
        underline: true,
      },
      {
        text: ' (create new block and type ',
      },
      {
        text: '"/"',
        bold: true,
      },
      {
        text: ' to open menu list) and notion-style rendering of ',
      },
      {
        text: 'Toolbar',
        bold: true,
        underline: true,
      },
    ],
  },
];

const plugins = [
  Paragraph,
  Blockquote,
  Callout,
  Code,
  Link,
  NumberedList,
  BulletedList,
  TodoList,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Embed.extend({
    options: {
      maxWidth: 650,
      maxHeight: 750,
    },
  }),
  Image.extend({
    options: {
      maxWidth: 650,
      maxHeight: 650,
      onUpload: async (file: File) => {
        const response = await uploadToCloudinary(file, 'image');
        return { url: response.url, width: response.data.width, height: response.data.height };
      },
    },
  }),
  Video.extend({
    options: {
      maxWidth: 650,
      maxHeight: 650,
      onUpload: async (file: File) => {
        const response = await uploadToCloudinary(file, 'video');
        return { url: response.url, width: response.data.width, height: response.data.height };
      },
    },
  }),
];

const actionItems: ActionMenuItem<Record<'label' | 'description' | 'icon', string>>[] = [
  {
    plugin: Paragraph,
    searchString: 'text paragraph',
    label: 'Paragraph',
    description: 'Just start writing with plain text.',
    icon: '/text.png',
  },
  {
    plugin: HeadingOne,
    searchString: 'h1 title',
    label: 'Heading 1',
    description: 'Big section heading.',
    icon: '/header.png',
  },
  {
    plugin: HeadingTwo,
    searchString: 'h2 subtitle',
    label: 'Heading 2',
    description: 'Medium section heading.',
    icon: '/subheader.png',
  },
  {
    plugin: HeadingThree,
    searchString: 'h3 subsubtitle small heading',
    label: 'Heading 3',
    description: 'Small section heading.',
    icon: '/subsubheader.png',
  },
  {
    plugin: Image,
    searchString: 'image picture',
    label: 'Image',
    description: 'Upload or embed with a link.',
    icon: '/image.png',
  },
  {
    plugin: Video,
    searchString: 'video media',
    label: 'Video',
    description: 'Embed from YouTube, Vimeo...',
    icon: '/video.png',
  },
  {
    plugin: Embed,
    searchString: 'Embed media',
    label: 'Embed',
    description: 'Embed from YouTube, Vimeo...',
    icon: '/video.png',
  },
  { plugin: Blockquote, label: 'Blockquote', description: 'Capture a quote', icon: '/text.png' },
  { plugin: Callout, label: 'Callout', description: 'Just start writing with plain text.', icon: '/text.png' },
  {
    plugin: Code,
    searchString: 'hello world bug',
    label: 'Code',
    description: 'Write bugs.',
    icon: '/text.png',
  },
  {
    plugin: BulletedList,
    label: 'BulletedList',
    description: 'Just start writing with plain text.',
    icon: '/text.png',
  },
  {
    plugin: NumberedList,
    label: 'NumberedList',
    description: 'Just start writing with plain text.',
    icon: '/text.png',
  },
  {
    plugin: TodoList,
    searchString: 'todo check list',
    label: 'TodoList',
    description: 'Just start writing with plain text.',
    icon: '/text.png',
  },
];

const TOOLS = {
  Toolbar: <Toolbar type="bubble" render={NotionToolbar} />,
  ActionMenu: <ActionMenu render={NotionActionMenu} items={actionItems} />,
};

export default function WithNotionExample() {
  const [editorValue, setEditorValue] = useState<YooptaValue[]>(INITIAL_VALUE);
  const marks = [Bold, Italic, CodeMark, Underline, Strike];

  return (
    <main
      style={{ padding: '5rem 0' }}
      className={`flex min-h-screen w-full h-full flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="w-full h-full">
        <YooptaEditor<any>
          value={editorValue}
          onChange={(val: YooptaValue[]) => setEditorValue(val)}
          plugins={plugins}
          marks={marks}
          placeholder="Start typing..."
          offline="withNotionExample"
          autoFocus
          tools={TOOLS}
        />
      </div>
    </main>
  );
}

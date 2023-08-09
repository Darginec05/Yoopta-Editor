// import { Inter } from 'next/font/google';
import { useState } from 'react';
import YooptaEditor, { createYooptaMark } from '@yoopta/editor';

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

import ActionMenu from '@yoopta/action-menu-list';
import { uploadToCloudinary } from '@/utils/cloudinary';
import Toolbar from '@yoopta/toolbar';
import { yooptaInitData, YooptaValue } from '@/utils/initialData';
import { MediumToolbar } from '@/components/Toolbars/MediumToolbar';
import LinkTool from '@yoopta/link-tool';

const INITAL_VALUE: YooptaValue[] = [
  {
    id: 'byaLDi8f_moivVcJp2fKn',
    type: 'heading-three',
    nodeType: 'block',
    children: [
      {
        text: 'Example with custom render for Toolbar',
      },
    ],
  },
  {
    id: 'GfVX4aaQtecmB8nVluQIn',
    type: 'paragraph',
    nodeType: 'block',
    children: [
      {
        text: 'When you select the text, you can see the ',
      },
      {
        id: 'THTb35YxYtxPhmvhzwKp3',
        // @ts-ignore [TODO] - fix types for nested children
        type: 'link',
        data: {
          // @ts-ignore [TODO] - fix types for nested children
          url: 'https://medium.com/new-story',
          skipDrag: true,
        },
        children: [
          {
            text: 'Medium style',
          },
        ],
        nodeType: 'inline',
      },
      {
        text: ' toolbar',
      },
    ],
  },
];

const ColoredMark = createYooptaMark({
  type: 'colored',
  hotkey: 'shift+y',
  className: 'colored-red',
});

const plugins = [
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Callout,
  Code,
  Link,
  NumberedList,
  BulletedList,
  TodoList,
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

const TOOLS = {
  Toolbar: <Toolbar render={MediumToolbar} />,
  ActionMenu: <ActionMenu />,
  LinkTool: <LinkTool />,
};

export default function Home() {
  const [editorValue, setEditorValue] = useState<YooptaValue[]>(INITAL_VALUE);

  const marks = [Bold, Italic, CodeMark, Underline, Strike, ColoredMark];

  return (
    <main
      style={{ padding: '5rem 0' }}
      className={`flex min-h-screen w-full h-full flex-col items-center justify-between p-24 `}
    >
      <div className="w-full h-full">
        <YooptaEditor<any>
          value={editorValue}
          onChange={(val: YooptaValue[]) => setEditorValue(val)}
          plugins={plugins}
          marks={marks}
          placeholder="Start typing..."
          offline="withCustomToolbar"
          autoFocus
          tools={TOOLS}
        />
      </div>
    </main>
  );
}

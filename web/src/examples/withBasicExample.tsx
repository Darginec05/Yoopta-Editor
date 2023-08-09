// import { Inter } from 'next/font/google';
import { useState } from 'react';
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

import LinkTool from '@yoopta/link-tool';
import ActionMenu from '@yoopta/action-menu-list';
import Toolbar from '@yoopta/toolbar';

import { uploadToCloudinary } from '@/utils/cloudinary';
import { YooptaValue } from '@/utils/initialData';

const initalValue: YooptaValue[] = [
  {
    id: 'qvtaTP9dUnOb7xkLY17S2',
    type: 'heading-one',
    nodeType: 'block',
    children: [
      {
        text: 'Yoopta-Editor example',
      },
    ],
  },
  {
    id: 'HX7AEs89QDaKkmOdKUPYQ',
    type: 'paragraph',
    nodeType: 'block',
    children: [
      {
        text: 'This example shows a complete setup with a list of all plugins, all marks and tools.',
      },
    ],
  },
  {
    id: 'f8l9H3AIojzf0i3ZTRlGe',
    type: 'paragraph',
    nodeType: 'block',
    children: [
      {
        text: 'Create a new block and start testing all features ❤️',
      },
    ],
  },
  {
    id: 'r0K-5cSpKSAP-6Hw6fnUR',
    type: 'image',
    nodeType: 'void',
    children: [
      {
        text: '',
      },
    ],
    data: {
      url: 'https://res.cloudinary.com/ench-app/image/upload/v1691535280/9C3CB447-AB61-4644-BA3A-00F089BCD053_puugln.gif',
      size: {
        width: 606.2176165803108,
        height: 650,
      },
    },
  },
  {
    id: 'WbQW3IRtYCG769ELg7d8g',
    type: 'heading-two',
    children: [
      {
        text: 'Features',
      },
    ],
    nodeType: 'block',
  },
  {
    id: 'Fwgzm4kg2-JubFrmTLMYs',
    type: 'bulleted-list',
    children: [
      {
        id: 'kBwK_yXsOS31Q4zOGh9H7',
        type: 'list-item',
        children: [
          {
            text: 'Default list of plugins',
          },
        ],
        nodeType: 'block',
      },
      {
        id: 'C0ux5MOfZlkszh03NGMfB',
        type: 'bulleted-list',
        children: [
          {
            id: 'jDFIOGpzuNDUi-B3pL7Dz',
            type: 'list-item',
            children: [
              {
                text: 'Paragraph',
              },
            ],
            nodeType: 'block',
          },
          {
            id: '7P3TRRsW1k7nRCX5AyhLE',
            type: 'list-item',
            children: [
              {
                text: 'Headings',
              },
            ],
            nodeType: 'block',
          },
          {
            id: 'Ojb-GfJP0Vrenw8t7geBh',
            type: 'list-item',
            children: [
              {
                text: 'Lists',
              },
            ],
            nodeType: 'block',
          },
          {
            id: 'r-GWK8BW1d-q3XdsmPnfd',
            type: 'list-item',
            children: [
              {
                text: 'Blockquote',
              },
            ],
            nodeType: 'block',
          },
          {
            id: 'eH31ZzzXBrX4uLy_d26Um',
            type: 'list-item',
            children: [
              {
                text: 'Code',
              },
            ],
            nodeType: 'block',
          },
          {
            id: 'YXN3waAuGMR2a9hkZi8aC',
            type: 'list-item',
            children: [
              {
                text: 'Embed',
              },
            ],
            nodeType: 'block',
          },
          {
            id: '7CUii0m8Sse80_3NtXiDB',
            type: 'list-item',
            children: [
              {
                text: 'Image',
              },
            ],
            nodeType: 'block',
          },
          {
            id: '8B1eejyDNyfSoClHZh6E7',
            type: 'list-item',
            children: [
              {
                text: 'Video',
              },
            ],
            nodeType: 'block',
          },
          {
            id: 'GLhVDZZ0fL8VGFS3p_SmT',
            type: 'list-item',
            children: [
              {
                text: '...and other!',
              },
            ],
            nodeType: 'block',
          },
        ],
        nodeType: 'block',
        data: {
          depth: 1,
          skipDrag: true,
          skipSettings: true,
        },
      },
      {
        id: 'CQC22PLpMREizDtZLncwF',
        type: 'list-item',
        children: [
          {
            text: 'Each plugin can be easily customize and extensible',
          },
        ],
        nodeType: 'block',
      },
      {
        id: 'eqXer3h7scfhRWmumT40J',
        type: 'list-item',
        children: [
          {
            text: 'You can create your own plugin',
          },
        ],
        nodeType: 'block',
      },
      {
        id: 'MuojjJ4-S38eSDHqlQ4YO',
        type: 'list-item',
        children: [
          {
            text: 'Many solved typical UX problems',
          },
        ],
        nodeType: 'block',
      },
      {
        id: 'nEVtSqPzKMMKeFLTeBFxy',
        type: 'list-item',
        children: [
          {
            text: 'A list of useful tools for the convenience of working with the editor',
          },
        ],
        nodeType: 'block',
      },
      {
        id: 'YwsKKOVOYhN4z3Zm9q_wu',
        type: 'list-item',
        children: [
          {
            text: 'Automatic lazy loading for media components (eg. embeds)',
          },
        ],
        nodeType: 'block',
      },
      {
        id: 'RFFSlUcFPXmZydCwr10QN',
        type: 'list-item',
        children: [
          {
            text: 'Shortcuts and markdown style',
          },
        ],
        nodeType: 'block',
      },
      {
        id: 'XBbVzsf13UyAU8MVU1E4O',
        type: 'list-item',
        children: [
          {
            text: 'Offline mode',
          },
        ],
        nodeType: 'block',
      },
      {
        id: 'Gkmi_BR-XmXvcVAmlmfV6',
        type: 'list-item',
        children: [
          {
            text: 'Redo/undo changes',
          },
        ],
        nodeType: 'block',
      },
      {
        id: 'Cg6_IW-MzfQiYxztRmCH_',
        type: 'list-item',
        children: [
          {
            text: 'A cool representation of the data in JSON format, so you can easily save the content data to the database and validate',
          },
        ],
        nodeType: 'block',
      },
      {
        id: 'RMymsHJP6RoGL-3gKUPQg',
        type: 'list-item',
        children: [
          {
            text: 'ChatGPT tool (soon)',
          },
        ],
        nodeType: 'block',
      },
      {
        id: 'nadAH6yi4ClZ_zj5UIHh0',
        type: 'list-item',
        children: [
          {
            text: 'Component for just rendering your data without any editor tools for fast page loading\nUseful for blog platforms!',
          },
        ],
        nodeType: 'block',
      },
      {
        id: 'NgQlspwzWAIisd_5i3up3',
        type: 'list-item',
        children: [
          {
            text: 'Drag and drop, nested dnd is supported also',
          },
        ],
        nodeType: 'block',
      },
      {
        id: '7eO-n2Ys8z4qZRB2Ngka1',
        type: 'list-item',
        children: [
          {
            text: 'The soul invested in the development of this editor 💙',
          },
        ],
        nodeType: 'block',
      },
      {
        id: 'IiHvVB-C9D1K1Egx_VVSd',
        type: 'list-item',
        children: [
          {
            text: '...and other features',
          },
        ],
        nodeType: 'block',
      },
    ],
    nodeType: 'block',
    data: {
      depth: 1,
      skipDrag: true,
      skipSettings: true,
    },
  },
];

// list of plugins should be placed outside component
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

// tools should be placed outside your component
const TOOLS = {
  Toolbar: <Toolbar />,
  ActionMenu: <ActionMenu />,
  LinkTool: <LinkTool />,
};

export default function WithBasicExample() {
  const [editorValue, setEditorValue] = useState<YooptaValue[]>(initalValue);
  // list of marks should be placed inside your component
  const marks = [Bold, Italic, CodeMark, Underline, Strike];

  return (
    <main
      style={{ padding: '5rem 0' }}
      className={`flex min-h-screen w-full h-full flex-col items-center justify-between p-24`}
    >
      <div className="w-full h-full">
        <YooptaEditor<any>
          value={editorValue}
          onChange={(val: YooptaValue[]) => setEditorValue(val)}
          plugins={plugins}
          marks={marks}
          placeholder="Type '/' to start"
          tools={TOOLS}
          offline="withBasicExample"
        />
      </div>
    </main>
  );
}

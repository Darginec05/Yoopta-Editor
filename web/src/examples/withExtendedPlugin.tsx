// import { Inter } from 'next/font/google';
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

import ActionMenu from '@yoopta/action-menu-list';
import { uploadToCloudinary } from '@/utils/cloudinary';
import Toolbar from '@yoopta/toolbar';
import { YooptaValue } from '@/utils/initialData';

const INITIAL_VALUE: YooptaValue[] = [
  {
    id: 'lNhZtKVF-gcGmwysrUQCN',
    type: 'paragraph',
    nodeType: 'block',
    children: [
      {
        text: 'Here is example how you can rewrite default configuration for any plugin using ',
      },
      {
        text: '<plugin>.extend',
        code: true,
      },
      {
        text: ' method.',
      },
    ],
  },
  {
    id: 'alOjr3e7N3PImo1mvP7np',
    type: 'code',
    children: [
      {
        id: 'Dcc7j06tHkEepxAla9EXA',
        type: 'code-line',
        nodeType: 'block',
        children: [
          {
            text: 'const plugins = [',
          },
        ],
        data: {
          skipSettings: true,
          skipDrag: true,
        },
      },
      {
        id: 'xTArpV-obYMxudaO1ZOOZ',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '  ...otherPlugins,',
          },
        ],
      },
      {
        id: 'vS9a0UqrFI-dx2Ff8YY_C',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '  Callout.extend({ ',
          },
        ],
      },
      {
        id: 'ivFAlfhiv2AsvwrRJVcZ8',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: "    placeholder: 'This is callout placeholder',",
          },
        ],
      },
      {
        id: 'z4dXtSolZsvwc4oJufTQp',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: "    shortcut: '>>'",
          },
        ],
      },
      {
        id: 'PPSH-aRhUDvndKwJF2Vfu',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '  }),',
          },
        ],
      },
      {
        id: 'HzQJxCMIfJXMTONNxXEQd',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: ']',
          },
        ],
      },
    ],
    nodeType: 'block',
    data: {
      language: 'javascript',
    },
  },
  {
    id: 'N7ci7dUzT12oLU1enAo7K',
    type: 'callout',
    nodeType: 'block',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    id: 'ZeHDWam1jwiK7DE8fJxZS',
    type: 'paragraph',
    nodeType: 'block',
    children: [
      {
        text: 'Type ',
      },
      {
        text: '>>',
        underline: true,
      },
      {
        text: ' and then click on ',
      },
      {
        text: 'space',
        bold: true,
      },
      {
        text: ' button',
      },
    ],
  },
];

const plugins = [
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Callout.extend({
    placeholder: 'This is callout placeholder',
    shortcut: '>>',
  }),
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
  Toolbar: <Toolbar type="bubble" />,
  ActionMenu: <ActionMenu />,
};

export default function WithExtendedPlugin() {
  const [editorValue, setEditorValue] = useState<YooptaValue[]>(INITIAL_VALUE);
  const marks = [Bold, Italic, CodeMark, Underline, Strike];

  return (
    <main
      style={{ padding: '5rem 0' }}
      className={`flex min-h-screen w-full h-full flex-col items-center justify-between p-24 `}
    >
      <div className="w-full h-full">
        <YooptaEditor
          value={editorValue}
          onChange={(val: YooptaValue[]) => setEditorValue(val)}
          plugins={plugins}
          marks={marks}
          placeholder="Start typing..."
          offline="withExtendedPlugin"
          autoFocus
          tools={TOOLS}
        />
      </div>
    </main>
  );
}

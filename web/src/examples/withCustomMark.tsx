import { Inter } from 'next/font/google';
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
import { YooptaValue } from '@/utils/initialData';

const inter = Inter({ subsets: ['latin'] });
const INITIAL_VALUE = [
  {
    id: '4oqXTs74MdG5axST1YRBE',
    type: 'heading-three',
    nodeType: 'block',
    children: [
      {
        text: 'Example with custom Mark',
      },
    ],
  },
  {
    id: 'Qe9HvJi8jfWngWhi6drtx',
    type: 'code',
    children: [
      {
        id: '5UFmyJZtY_H6UwxgQFlT8',
        type: 'code-line',
        nodeType: 'block',
        children: [
          {
            text: 'const ColoredMark = createYooptaMark({',
          },
        ],
        data: {
          skipSettings: true,
          skipDrag: true,
        },
      },
      {
        id: 'o2bQG1TOMxcFRimEJsfVZ',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: "  type: 'colored',",
          },
        ],
      },
      {
        id: 'Qj5nqCwR4_QWz9vIPlWpn',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: "  hotkey: 'shift+y',",
          },
        ],
      },
      {
        id: 'OhJylFnAwfVxDebiYXNp_',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: "  className: 'colored-red'",
          },
        ],
      },
      {
        id: 'NcywbSuji2WNZ2FCiJlW7',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '});',
          },
        ],
      },
      {
        id: 'PYeB4aITbf52OlQH6Xaz_',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '',
          },
        ],
      },
      {
        id: '2zXck-CEQtXaNqpv7JD5L',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: 'const EditorComponent = () => {',
          },
        ],
      },
      {
        id: 'OsKj2ZjrwW3eMqIDqSjWs',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '  const marks = [...defaultMarks, ColoredMark];',
          },
        ],
      },
      {
        id: 'JMt2aesvFbB7uPtJU7wcT',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '',
          },
        ],
      },
      {
        id: '0uQdSAkCN2BXj3iPEGcrd',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '  return (',
          },
        ],
      },
      {
        id: '6Pi0MKh7jaJeO6EIdCWGp',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '    <YooptaEditor',
          },
        ],
      },
      {
        id: 'qgIzpi2J-oTHHIIPyCsci',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '      ...props',
          },
        ],
      },
      {
        id: '-fpvQB2Ku1RfDmSUmzZqI',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '      marks={marks}',
          },
        ],
      },
      {
        id: '0chQxD50ZqlqRO5fjKsmF',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '    />',
          },
        ],
      },
      {
        id: 'TnlFirGSvE0yRdKAHWKLl',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '  )',
          },
        ],
      },
      {
        id: '3EtYLX6rArWnTa0_PB_Gj',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '}',
          },
        ],
      },
    ],
    nodeType: 'block',
    data: {
      language: 'tsx',
    },
  },
  {
    id: '4fckhtG-kfpTwcSmkcnVJ',
    type: 'paragraph',
    nodeType: 'block',
    children: [
      {
        text: 'Type something, select text and trigger hotkey ',
      },
      {
        text: 'shift+y',
        code: true,
      },
      {
        text: ' on selected text.',
      },
    ],
  },
  {
    id: 'G7_7k1PqZ9-BaDmKM26nW',
    type: 'blockquote',
    nodeType: 'block',
    children: [
      {
        text: 'And you will have access to this marks using ',
      },
      {
        text: 'useMarks',
        code: true,
      },
      {
        text: ' hook',
      },
    ],
  },
  {
    id: 'EUFl_J8XSY8pFU-8i6RVz',
    type: 'code',
    children: [
      {
        id: 'td8erhddCO8ZZzzt-saIn',
        type: 'code-line',
        nodeType: 'block',
        children: [
          {
            text: 'const MyCustomToolbar = () => {',
          },
        ],
        data: {
          skipSettings: true,
          skipDrag: true,
        },
      },
      {
        id: 'H2npSzVh1F64t-rdIKQJf',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '  const marks = useMarks();',
          },
        ],
      },
      {
        id: '2JfhXCLPPNxsNs65a2gDZ',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '  ',
          },
        ],
      },
      {
        id: 'vTcpNtEpOYh4Luz4L30av',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '  return (',
          },
        ],
      },
      {
        id: 'zmSRd_tObb60ywCvcCuXf',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: "    <button style={{ textDecoration: marks.colored.isActive ? 'underline' : 'none' }} onClick={() => marks.colored.toggle()}>Make text red</button>",
          },
        ],
      },
      {
        id: 'lAKgUDGlxLCjV2BpIPEGn',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '  )',
          },
        ],
      },
      {
        id: 'BLj9V61PgHMdGYmH2kWro',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '}',
          },
        ],
      },
    ],
    nodeType: 'block',
    data: {
      language: 'jsx',
    },
  },
];

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
  Toolbar: <Toolbar />,
  ActionMenu: <ActionMenu />,
};

const ColoredMark = createYooptaMark({
  type: 'colored',
  hotkey: 'shift+y',
  className: 'colored-red',
});

export default function WithCustomMark() {
  const [editorValue, setEditorValue] = useState<YooptaValue[]>(INITIAL_VALUE);
  const marks = [Bold, Italic, CodeMark, Underline, Strike, ColoredMark];

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
          tools={TOOLS}
          offline="withCustomMark"
        />
      </div>
    </main>
  );
}

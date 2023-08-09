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
    id: '4-n8gHVqmuk0XhmiGp9Km',
    type: 'heading-three',
    nodeType: 'block',
    children: [
      {
        text: 'This example shows you how it works with media plugins',
      },
    ],
  },
  {
    id: '4DGYx737Bu5shdST3wTwW',
    type: 'paragraph',
    nodeType: 'block',
    children: [
      {
        text: 'Currently Yoopta-Editor have three media plugins:',
      },
    ],
  },
  {
    id: 'jRafJTr7sb-W51w7ESl-O',
    type: 'numbered-list',
    children: [
      {
        id: 'UFlVDyZ2Hl2GYZ-5qCuko',
        type: 'list-item',
        nodeType: 'block',
        children: [
          {
            text: 'Video',
            bold: true,
          },
          {
            text: ' - you can upload video from device or add embed using link in editor',
          },
        ],
      },
      {
        id: 'KfbWRDrF-YRHmldrBgdQt',
        type: 'numbered-list',
        children: [
          {
            id: 'RukdKIAv4PWq7gwkSUfen',
            type: 'list-item',
            children: [
              {
                text: 'Uploading from device',
              },
            ],
            nodeType: 'block',
          },
          {
            id: '8wtrycNWtEVDMf5AazX30',
            type: 'list-item',
            children: [
              {
                text: 'Adding video using link',
              },
            ],
            nodeType: 'block',
          },
          {
            id: 'q6bGZki9tr28FqsjKZuYW',
            type: 'list-item',
            children: [
              {
                text: 'Accept embed urls (',
              },
              {
                text: 'youtube, dailymotion, vimeo',
                underline: true,
              },
              {
                text: ')',
              },
            ],
            nodeType: 'block',
          },
          {
            id: 'ITf_ZugHsrFup5EWPeWuU',
            type: 'list-item',
            children: [
              {
                text: 'Lazy loading',
              },
            ],
            nodeType: 'block',
          },
        ],
        nodeType: 'block',
        data: {
          depth: 2,
          skipDrag: true,
        },
      },
      {
        id: 'HTB0EO272qzbrRTcxPUhq',
        type: 'list-item',
        nodeType: 'block',
        children: [
          {
            text: 'Image',
            bold: true,
          },
        ],
      },
      {
        id: 'hs4NdKRic4K2SFH6bJzBr',
        type: 'numbered-list',
        children: [
          {
            id: '403NrISGsCpJ4rCHInnTD',
            type: 'list-item',
            nodeType: 'block',
            children: [
              {
                text: 'Uploading from device',
              },
            ],
          },
          {
            id: 'XqcWC7hd43M4dVe_lCs7z',
            type: 'list-item',
            nodeType: 'block',
            children: [
              {
                text: 'Adding image using link ',
              },
            ],
          },
          {
            id: 'brAYTfMaJCWIfoohhYGS3',
            type: 'list-item',
            nodeType: 'block',
            children: [
              {
                text: 'Resizing ',
              },
            ],
          },
          {
            id: '0TWheMZtkDAGcHrW9DFV-',
            type: 'list-item',
            nodeType: 'block',
            children: [
              {
                text: 'Lazy loading',
              },
            ],
          },
        ],
        nodeType: 'block',
        data: {
          depth: 2,
          skipDrag: true,
        },
      },
      {
        id: 'I0qYNyD6Evr_hGL5uPyXL',
        type: 'list-item',
        nodeType: 'block',
        children: [
          {
            text: 'Embed',
            bold: true,
          },
        ],
      },
      {
        id: 'gBCJAQl_WvUcN9Dsy1AyY',
        type: 'numbered-list',
        children: [
          {
            id: '35kk-TSFJDFmlkyp3J8F-',
            type: 'list-item',
            nodeType: 'block',
            children: [
              {
                text: 'Adding embed using link in editor',
              },
            ],
          },
          {
            id: 'xN0vptOEuGOfXuyIyrVmG',
            type: 'list-item',
            nodeType: 'block',
            children: [
              {
                text: 'There are default embed handlers: ',
              },
              {
                text: 'youtube, vimeo, dailymotion, twitter, figma',
                underline: true,
              },
            ],
          },
          {
            id: 'K8KTSf3PQloF0PHDlKjKB',
            type: 'list-item',
            nodeType: 'block',
            children: [
              {
                text: 'Lazy loading',
              },
            ],
          },
        ],
        nodeType: 'block',
        data: {
          depth: 2,
          skipDrag: true,
        },
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
    id: '0lfJiK298JlxHXPm9Gv-6',
    type: 'paragraph',
    nodeType: 'block',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    id: 'yuqcE1VHmrIycBJfoHt3m',
    type: 'callout',
    nodeType: 'block',
    children: [
      {
        text: "❗When you uploading image or video from don't forget add ",
      },
      {
        text: 'onUpload',
        bold: true,
      },
      {
        text: ' function.\nCheck example below or check source code.',
      },
    ],
  },
  {
    id: 'y6VtdVRe12aZlgjGBKoKw',
    type: 'code',
    children: [
      {
        id: 'e-Ydy2svPLSiKh9LnHvwY',
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
        id: 'Ghy3iqwtkrL5ETccDA_ca',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '  ...,',
          },
        ],
      },
      {
        id: 'cpgPL_YrlIK2Lax7EOSLA',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '  Image.extend({',
          },
        ],
      },
      {
        id: 'KyRBumOj4uS4epyJnOlnm',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '   options: { ',
          },
        ],
      },
      {
        id: 'v0wPpQVvT4qfEHbDUxtdF',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '     maxWidth: 650,',
          },
        ],
      },
      {
        id: 'zWmnTuthyM8MtOvZtCozf',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '     maxHeight: 650,',
          },
        ],
      },
      {
        id: 'zCt17nidXm0TfnaJwIdt4',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '     // Required handler when you uploading from device',
          },
        ],
      },
      {
        id: 'AkXpft_cFSD0jv8ZNjWeK',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '     onUpload: async (file: File) => {',
          },
        ],
      },
      {
        id: 'ZZiKT7ZlBI4Qy-79m5me_',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: "      const response = await uploadToCloudinary(file,'image');",
          },
        ],
      },
      {
        id: 'fk13H0vrlonMZ6O0gjVjZ',
        type: 'code-line',
        nodeType: 'block',
        data: {
          skipSettings: true,
          skipDrag: true,
        },
        children: [
          {
            text: '      return { url: response.url, width: response.data.width, height: response.data.height };},},}),',
          },
        ],
      },
      {
        id: '1i2iMXMn_YY0sKd4nwJIP',
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

export default function WithMedia() {
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
          offline="withMedia"
        />
      </div>
    </main>
  );
}

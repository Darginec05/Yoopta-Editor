// import { Inter } from 'next/font/google';
import { useState } from 'react';
import NextImage from 'next/image';

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

const initalData: YooptaValue[] = [
  {
    id: 'w8KBqhH7kE1rdJgPBuj_E',
    type: 'heading-one',
    children: [{ text: 'With custom component' }],
    nodeType: 'block',
  },
  {
    id: 'KrGMxiCZVUlGOP9IZ3PcF',
    type: 'paragraph',
    nodeType: 'block',
    children: [
      { text: 'Here is example with ' },
      {
        id: 'uKE1Hz3hhKR_cgILdhcLL',
        type: 'link',
        data: { url: 'https://nextjs.org/docs/pages/api-reference/components/image', skipDrag: true },
        children: [{ text: 'next/image' }],
        nodeType: 'inline',
      },
      { text: ' component ' },
    ],
  },
  {
    id: 'jfwOBOqmtEtmZ4nyS64Hx',
    type: 'image',
    nodeType: 'void',
    data: {
      url: 'https://tx.shadcn.com/_next/image?url=%2Fimages%2Fblog%2Fblog-post-4.jpg&w=1920&q=75',
      size: { width: 650, height: 403 },
    },
    children: [{ text: '' }],
  },
  {
    id: 'w8KBqhH7kE1rdJgPBuj_E',
    type: 'heading-one',
    children: [{ text: '' }],
    nodeType: 'block',
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
    renderer: {
      editor: Image.getPlugin.renderer.editor,
      render: (props) => {
        const { element, children, attributes, size } = props;

        if (!element.data.url) return null;

        return (
          <div {...attributes} contentEditable={false} style={{ display: 'block', marginTop: 20 }}>
            <NextImage
              src={element.data.url || element.data['data-src']}
              width={size?.width || element.data.size.width}
              height={size?.height || element.data.size.height}
              alt="super iamge"
            />
            {children}
          </div>
        );
      },
    },
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
  LinkTool: <LinkTool />,
};

export default function WithCustomComponent() {
  const [editorValue, setEditorValue] = useState<YooptaValue[]>(initalData);
  const marks = [Bold, Italic, CodeMark, Underline, Strike];

  return (
    <main
      style={{ padding: '5rem 0' }}
      className={`p-24 flex min-h-screen w-full h-full flex-col items-center justify-between `}
    >
      <div className="w-full h-full">
        <YooptaEditor<any>
          value={editorValue}
          onChange={(val: YooptaValue[]) => setEditorValue(val)}
          plugins={plugins}
          marks={marks}
          placeholder="Start typing..."
          offline="withCustomComponent"
          autoFocus
          tools={TOOLS}
        />
      </div>
    </main>
  );
}

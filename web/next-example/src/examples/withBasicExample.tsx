'use client';

import { useEffect, useMemo, useState } from 'react';
import YooptaEditor, { createYooptaEditor, generateId, SlateElement, YooptaBlockData } from '@yoopta/editor';

import Paragraph from '@yoopta/paragraph';
import Blockquote from '@yoopta/blockquote';
import Embed from '@yoopta/embed';
import Image from '@yoopta/image';
import Link from '@yoopta/link';
import Callout from '@yoopta/callout';
import Video from '@yoopta/video';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings';

import { uploadToCloudinary } from '@/utils/cloudinary';
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import Code from '@yoopta/code';
import File from '@yoopta/file';

// list of plugins should be placed outside component
const plugins = [
  File.extend({
    options: {
      onUpload: async (file: File) => {
        const response = await uploadToCloudinary(file, 'auto');
        return { url: response.url };
      },
    },
  }),
  Code,
  Paragraph,
  HeadingOne.extend({
    options: {
      HTMLAttributes: {
        className: 'text-red-500',
        draggable: true,
        'aria-haspopup': true,
        'aria-atomic': true,
      },
    },
  }),
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Callout,
  Link,
  NumberedList,
  BulletedList,
  TodoList,
  Embed,
  Image.extend({
    options: {
      async onUpload(file) {
        const data = await uploadToCloudinary(file, 'image');
        console.log('data', data);

        return {
          src: data.secure_url,
          alt: 'cloudinary',
          sizes: {
            width: data.width,
            height: data.height,
          },
        };
      },
    },
  }),
  Video.extend({
    options: {
      onUpload: async (file: File) => {
        const data = await uploadToCloudinary(file, 'video');
        return {
          src: data.secure_url,
          alt: 'cloudinary',
          sizes: {
            width: data.width,
            height: data.height,
          },
        };
      },
    },
  }),
];

const TOOLS = {
  ActionMenu: {
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
  },
  Toolbar: {
    render: DefaultToolbarRender,
    tool: Toolbar,
  },
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
};

const marks = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

const getDefaultBlockData = (): YooptaBlockData => {
  const id = generateId();
  const slateValue: SlateElement[] = [
    {
      id: generateId(),
      type: 'paragraph',
      children: [{ text: 'asdsdadads' }],
      props: {
        nodeType: 'block',
      },
    },
  ];

  return {
    id,
    type: 'Paragraph',
    value: slateValue,
    meta: {
      order: 0,
      depth: 0,
    },
  };
};

const defaultBlock = getDefaultBlockData();
const value = { [defaultBlock.id]: defaultBlock };

const NoSSR = ({ children }: any) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return children;
};

export default function YooptaBasicExample() {
  const editor = useMemo(() => createYooptaEditor(), []);

  useEffect(() => {
    editor.on('change', (value) => {
      console.log('CHANGED value', value);
    });

    editor.on('block:copy', (block) => {
      console.log('COPY block', block);
    });
  }, []);

  return (
    <main
      style={{ padding: '5rem 0' }}
      className={`flex min-h-screen w-full h-full flex-col items-center justify-between p-24`}
    >
      <div className="w-full h-full flex justify-center">
        <YooptaEditor
          editor={editor}
          plugins={plugins}
          value={value}
          marks={marks}
          tools={TOOLS}
          autoFocus
          selectionBoxRoot={false}
          className="my-0 mx-auto"
        />
      </div>
    </main>
  );
}
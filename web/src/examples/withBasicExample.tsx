// import { Inter } from 'next/font/google';
import { useEffect, useMemo } from 'react';
import YooptaEditor, { createYooptaEditor, YooptaPlugin } from '@yoopta/editor';

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
// import File from '@yoopta/file';
// import Code from '@yoopta/code';

// import LinkTool from '@yoopta/link-tool';
// import ActionMenu from '@yoopta/action-menu-list';
// import Toolbar from '@yoopta/toolbar';

import { uploadToCloudinary } from '@/utils/cloudinary';
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';

// list of plugins should be placed outside component
const plugins = [
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Callout,
  // Code,
  Link,
  NumberedList,
  BulletedList,
  TodoList,
  // File.extend({
  //   options: {
  //     onUpload: async (file: File) => {
  //       const response = await uploadToCloudinary(file, 'auto');
  //       return { url: response.url };
  //     },
  //   },
  // }),
  Embed,
  Image.extend({
    onUpload: async (file: File) => {
      const data = await uploadToCloudinary(file, 'image');
      return {
        src: data.secure_url,
        alt: 'cloudinary',
        sizes: {
          width: data.width,
          height: data.height,
        },
      };
    },
  }),
  Video.extend({
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
};

const marks = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

export default function WithBasicExample() {
  const editor = useMemo(() => createYooptaEditor(), []);

  useEffect(() => {
    editor.on('editor:change', (value) => {
      console.log('CHANGED value', value);
    });

    editor.on('block:update', (block) => {
      console.log('BLOCK UPDATED', block);
    });
  }, []);

  return (
    <main
      style={{ padding: '5rem 0' }}
      className={`flex min-h-screen w-full h-full flex-col items-center justify-between p-24`}
    >
      <div className="w-full h-full">
        <YooptaEditor editor={editor} plugins={plugins} marks={marks} tools={TOOLS} />
      </div>
    </main>
  );
}

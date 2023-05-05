import { Inter } from 'next/font/google';
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
import Video from '@yoopta/Video';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import { Bold, Italic, CodeMark, Underline, Strike } from '@yoopta/marks';
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings';

import ActionMenu from '@yoopta/action-menu-list';
import { uploadToCloudinary } from '@/utils/cloudinary';
// import Toolbar from '@yoopta/toolbar';

const inter = Inter({ subsets: ['latin'] });

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
      maxWidth: 800,
      maxHeight: 750,
    },
  }),
  Image.extend({
    options: {
      maxWidth: 750,
      maxHeight: 800,
      onUpload: async (file: File) => {
        const response = await uploadToCloudinary(file, 'image');
        return { url: response.url, width: response.data.width, height: response.data.height };
      },
    },
  }),
  Video.extend({
    options: {
      maxWidth: 750,
      maxHeight: 800,
      onUpload: async (file: File) => {
        const response = await uploadToCloudinary(file, 'video');
        return { url: response.url, width: response.data.width, height: response.data.height };
      },
    },
  }),
];

const marks = [Bold, Italic, CodeMark, Underline, Strike];

export default function Home() {
  const [editorValue, setEditorValue] = useState<Descendant[]>([]);

  return (
    <main
      style={{ backgroundColor: 'hsl(224 71% 4%)', color: 'white' }}
      className={`flex min-h-screen w-full h-full flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="w-full h-full">
        <YooptaEditor
          value={editorValue}
          onChange={(val: Descendant[]) => setEditorValue(val)}
          plugins={plugins}
          marks={marks}
          placeholder="Start typing..."
          offline
          autoFocus
        >
          {/* <Toolbar type="bubble" /> */}
          <ActionMenu />
        </YooptaEditor>
      </div>
    </main>
  );
}

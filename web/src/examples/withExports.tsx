import { useState } from 'react';
import { yooptaInitData, YooptaValue } from '@/utils/initialData';

// import { Inter } from 'next/font/google';
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
import { ExportButtons } from '@/components/ExportButtons/ExportButtons';

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
  LinkTool: <LinkTool />,
};

const OFFLINE_KEY = 'withExports';

export default function WithExports() {
  const [editorValue, setEditorValue] = useState<YooptaValue[]>(yooptaInitData);
  const marks = [Bold, Italic, CodeMark, Underline, Strike];

  const onChange = (val: YooptaValue[]) => setEditorValue(val);

  console.log('editorValue', editorValue);

  return (
    <main
      style={{ padding: '5rem 0' }}
      className={`flex min-h-screen w-full h-full flex-col items-center justify-between p-24 `}
    >
      <div className="w-full h-full">
        <ExportButtons editorValue={editorValue} plugins={plugins} offlineKey={OFFLINE_KEY} onChange={onChange} />
        <YooptaEditor<any>
          value={editorValue}
          onChange={onChange}
          plugins={plugins}
          marks={marks}
          placeholder="Type '/' to start"
          tools={TOOLS}
          offline={OFFLINE_KEY}
        />
      </div>
    </main>
  );
}

// import { Inter } from 'next/font/google';
import { useState } from 'react';
import { Descendant } from 'slate';
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

import ActionMenu from '@yoopta/action-menu-list';
import { uploadToCloudinary } from '@/utils/cloudinary';
import Toolbar from '@yoopta/toolbar';
import { yooptaInitData, YooptaValue } from '@/utils/initialData';

const plugins = [
  Paragraph.extend({
    options: {
      HTMLAttributes: {
        spellCheck: false,
        className: 'text-white leading-7',
      },
    },
  }),
  Blockquote,
  Callout,
  Code,
  Link,
  NumberedList.extend({
    options: {
      HTMLAttributes: {
        spellCheck: false,
        className: 'font-heading text-4xl',
      },
    },
  }),
  BulletedList.extend({
    options: {
      HTMLAttributes: {
        spellCheck: false,
        className: 'font-heading text-4xl',
      },
    },
  }),
  TodoList.extend({
    options: {
      HTMLAttributes: {
        spellCheck: false,
        className: 'font-heading text-4xl',
      },
    },
  }),
  HeadingOne.extend({
    options: {
      HTMLAttributes: {
        spellCheck: false,
        className: 'font-heading text-4xl',
      },
    },
  }),
  HeadingTwo.extend({
    options: {
      HTMLAttributes: {
        spellCheck: false,
        className: 'font-heading text-3xl',
      },
    },
  }),
  HeadingThree.extend({
    options: {
      HTMLAttributes: {
        spellCheck: false,
        className: 'font-heading text-2xl',
      },
    },
  }),
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

type Props = {
  value?: YooptaValue[];
  onChange?: (val: YooptaValue[]) => void;
  localStorageName?: string;
};

export default function WithDarkTheme({ value, onChange, localStorageName }: Props) {
  const [editorValue, setEditorValue] = useState<YooptaValue[]>(value || yooptaInitData);
  const marks = [Bold, Italic, CodeMark, Underline, Strike];

  const onChangeValue = (val: YooptaValue[]) => {
    if (onChange) return onChange(val);
    setEditorValue(val);
  };

  return (
    <main
      style={{ backgroundColor: 'hsl(224 71% 4%)', color: 'white', padding: '5rem 0' }}
      className={`flex min-h-screen w-full h-full flex-col items-center justify-between p-24 `}
    >
      <div className="w-full h-full">
        <YooptaEditor<any>
          value={editorValue}
          onChange={onChangeValue}
          plugins={plugins}
          marks={marks}
          placeholder="Start typing..."
          offline={localStorageName || 'withDarkTheme'}
          autoFocus
          tools={TOOLS}
        />
      </div>
    </main>
  );
}

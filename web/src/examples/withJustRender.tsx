// import { Inter } from 'next/font/google';
import NextImage from 'next/image';

import YoptaRenderer from '@yoopta/renderer';
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
import { yooptaInitData, YooptaValue } from '../utils/initialData';
import { uploadToCloudinary } from '@/utils/cloudinary';
import { generateId } from '@yoopta/editor';

const DATA_FROM_DB: YooptaValue[] = [
  {
    id: generateId(),
    type: 'heading-three',
    nodeType: 'block',
    children: [{ text: 'Example with rendering your content without editor tools' }],
  },
  ...yooptaInitData,
];

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
    renderer: {
      editor: Image.getPlugin.renderer.editor,
      render: (props) => {
        const { element, children, attributes, size } = props;

        if (!element.data.url) return null;

        return (
          <div {...attributes} contentEditable={false}>
            <NextImage
              src={element.data.url || element.data['data-src']}
              width={size?.width || element.data.size.width}
              height={size?.height || element.data.size.height}
              alt="supe iamge"
              style={{ display: 'block', marginTop: 20 }}
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
    },
  }),
];

const marks = [Bold, Italic, CodeMark, Underline, Strike];

export default function Home() {
  return (
    <main
      style={{ backgroundColor: 'hsl(224 71% 4%)', color: 'white', padding: '5rem 0' }}
      className={`flex min-h-screen w-full h-full flex-col items-center justify-between p-24 `}
    >
      <div className="w-full h-full">
        <YoptaRenderer data={DATA_FROM_DB} plugins={plugins} marks={marks} />
      </div>
    </main>
  );
}

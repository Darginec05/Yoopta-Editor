import YooptaEditor, { createYooptaEditor, Elements, YooEditor } from '@yoopta/editor';

import Paragraph from '@yoopta/paragraph';
import Blockquote from '@yoopta/blockquote';
import Embed from '@yoopta/embed';
import Image from '@yoopta/image';
import Link from '@yoopta/link';
import Callout from '@yoopta/callout';
import Video from '@yoopta/video';
import File from '@yoopta/file';
import Accordion from '@yoopta/accordion';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings';
import Code from '@yoopta/code';
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';

import { uploadToCloudinary } from '@/utils/cloudinary';
import { value } from './value';

const plugins = [
  Paragraph,
  Accordion,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote.extend({
    options: {
      HTMLAttributes: {
        className: 'yoopta-main-page-blockquote',
        spellCheck: true,
      },
      shortcuts: ['>', 'bq'],
    },
  }),
  Callout,
  NumberedList,
  BulletedList,
  TodoList,
  Code,
  Link,
  Embed,
  Image.extend({
    options: {
      async onUpload(file) {
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
    },
  }),
  Video.extend({
    options: {
      onUpload: async (file) => {
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
  File.extend({
    options: {
      onUpload: async (file) => {
        const response = await uploadToCloudinary(file, 'auto');
        return { src: response.url };
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

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight];

type Props = {
  editor: YooEditor;
  selectionRef: React.RefObject<HTMLDivElement>;
};

export const LandingEditor = ({ selectionRef, editor }: Props) => {
  return (
    <YooptaEditor
      editor={editor}
      plugins={plugins}
      marks={MARKS}
      tools={TOOLS}
      selectionBoxRoot={selectionRef}
      value={value}
      autoFocus={false}
      className="py-4 !h-full md:max-w-none max-w-[100vw] md:px-0 px-2"
    />
  );
};

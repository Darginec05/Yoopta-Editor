import YooptaEditor, { createYooptaEditor } from '@yoopta/editor';

import Paragraph from '@yoopta/paragraph';
import Blockquote from '@yoopta/blockquote';
import Embed from '@yoopta/embed';
import Image from '@yoopta/image';
import Link from '@yoopta/link';
import Callout from '@yoopta/callout';
import Video from '@yoopta/video';
import File from '@yoopta/file';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings';
import Code from '@yoopta/code';
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
// import { DividerPlugin } from './customPlugins/Divider';

import { Sheet } from '@/components/ui/sheet';

import { uploadToCloudinary } from '@/utils/cloudinary';
import { useEffect, useMemo, useRef } from 'react';
import { WITH_EDITOR_CONTROL_INIT_VALUE } from './initValue';

const plugins = [
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
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

function WithBasicUsageExample() {
  const editor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef(null);

  useEffect(() => {
    function handleChange(value) {
      console.log('value', value);
    }
    editor.on('change', handleChange);
    return () => {
      editor.off('change', handleChange);
    };
  }, [editor]);

  return (
    <div
      className="md:py-[100px] md:pl-[200px] md:pr-[80px] px-[20px] pt-[80px] pb-[40px] flex justify-center flex-col items-center"
      ref={selectionRef}
    >
      <div className="flex">
        <button
          type="button"
          className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
          onClick={() => editor.moveBlock('d72ebaae-50cc-4985-8915-a0af43877d71', [1])}
        >
          Move Block
        </button>
        <button
          type="button"
          className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
          onClick={() => editor.duplicateBlock({ blockId: 'd72ebaae-50cc-4985-8915-a0af43877d71' })}
        >
          Duplicate block
        </button>
        <button
          type="button"
          className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
          onClick={() => editor.blocks.Callout.create({ focus: true })}
        >
          Insert block Callout
        </button>
        <button
          type="button"
          className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
          onClick={() => editor.setBlockSelected([0, 1])}
        >
          Select first three blocks
        </button>
      </div>
      <YooptaEditor
        editor={editor}
        plugins={plugins}
        tools={TOOLS}
        marks={MARKS}
        selectionBoxRoot={selectionRef}
        value={WITH_EDITOR_CONTROL_INIT_VALUE}
      />
    </div>
  );
}

export default WithBasicUsageExample;

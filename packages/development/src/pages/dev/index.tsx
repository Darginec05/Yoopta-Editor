'use client';

import YooptaEditor, { createYooptaEditor, Tools, YooEditor } from '@yoopta/editor';
import Blockquote from '@yoopta/blockquote';
import Paragraph from '@yoopta/paragraph';
import Headings from '@yoopta/headings';
import Image from '@yoopta/image';
import { Bold, Italic, Highlight, CodeMark, Strike, Underline } from '@yoopta/marks';
import Callout from '@yoopta/callout';
import Lists from '@yoopta/lists';
import Link from '@yoopta/link';
import Video from '@yoopta/video';
import Table from '@yoopta/table';
import Embed from '@yoopta/embed';
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import { ComponentType, useEffect, useMemo, useRef, useState } from 'react';
import { uploadToCloudinary } from '../../utils/cloudinary';

// import Code from '@yoopta/code';
// import Mention from '@yoopta/mention';

const plugins = [
  // Code,
  // Mention,
  Paragraph,
  Image.extend({
    onUpload: async (file: File) => {
      const data = await uploadToCloudinary(file);

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
  Headings.HeadingOne,
  Headings.HeadingTwo,
  Headings.HeadingThree,
  Blockquote,
  Callout,
  Lists.BulletedList,
  Lists.NumberedList,
  Lists.TodoList,
  Table,
  Embed,
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
  Link,
];

const MARKS = [Bold, Italic, Highlight, CodeMark, Strike, Underline];

const TOOLS: Tools = {
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

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const rootRef = useRef<HTMLDivElement>(null);

  const onSubmit = () => {
    const editorData = editor.getEditorValue();
    console.log('EDITOR DATA', editorData);
  };

  useEffect(() => {
    editor.once('change', (val) => {
      console.log('on change value', val);
    });
  }, [editor]);

  return (
    <div className="px-[100px] max-w-[900px] mx-auto my-10" ref={rootRef}>
      <div className="flex mb-10">
        <button
          className="bg-blue-500 mr-4 text-white px-4 py-2 rounded-md"
          onClick={() => {
            editor.formats.highlight?.update({ color: 'rgb(176, 171, 250)' });
          }}
        >
          Highlight text
        </button>
        <button
          className="bg-blue-500 mr-4 text-white px-4 py-2 rounded-md"
          onClick={() => {
            editor.blocks.Image.create();
          }}
        >
          Add Image
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={onSubmit}>
          Get editor data
        </button>
      </div>
      <YooptaEditor
        editor={editor}
        plugins={plugins}
        selectionBoxRoot={rootRef}
        marks={MARKS}
        autoFocus
        placeholder="Type / to open menu"
        tools={TOOLS}
      />
    </div>
  );
};

export default BasicExample;

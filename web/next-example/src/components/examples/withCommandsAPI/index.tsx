import YooptaEditor, { createYooptaEditor, Elements, Blocks, useYooptaEditor, YooEditor } from '@yoopta/editor';

import Paragraph, { ParagraphCommands } from '@yoopta/paragraph';
import Blockquote, { BlockquoteCommands } from '@yoopta/blockquote';
import Embed, { EmbedCommands } from '@yoopta/embed';
import Image, { ImageCommands } from '@yoopta/image';
import Link, { LinkCommands } from '@yoopta/link';
import Callout, { CalloutCommands } from '@yoopta/callout';
import Video from '@yoopta/video';
import File from '@yoopta/file';
import Accordion, { AccordionCommands } from '@yoopta/accordion';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import { Bold, Italic, CodeMark, Underline, Strike, Highlight } from '@yoopta/marks';
import { HeadingOne, HeadingOneCommands, HeadingThree, HeadingTwo } from '@yoopta/headings';
import Code from '@yoopta/code';
import Table, { TableCommands } from '@yoopta/table';
import Divider, { DividerCommands } from '@yoopta/divider';
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';

import { uploadToCloudinary } from '@/utils/cloudinary';
import { useEffect, useMemo, useRef } from 'react';
import { WITH_BASIC_COMMANDS_API_VALUE } from './initValue';

const plugins = [
  Paragraph,
  Table,
  Divider,
  Accordion,
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
      onUploadPoster: async (file) => {
        const image = await uploadToCloudinary(file, 'image');
        return image.secure_url;
      },
    },
  }),
  File.extend({
    options: {
      onUpload: async (file) => {
        const response = await uploadToCloudinary(file, 'auto');
        return { src: response.secure_url, format: response.format, name: response.name, size: response.bytes };
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

function WithCommandsAPI() {
  const editor = useMemo(() => createYooptaEditor(), []);
  const selectionRef = useRef(null);

  useEffect(() => {
    editor.on('change', (value) => {
      console.log('value', value);
    });
  }, []);

  return (
    <div
      className="md:py-[100px] md:pl-[200px] md:pr-[80px] px-[20px] pt-[80px] pb-[40px] flex flex-col items-center justify-center"
      ref={selectionRef}
    >
      <FixedToolbar editor={editor} />
      <YooptaEditor
        editor={editor}
        plugins={plugins}
        tools={TOOLS}
        marks={MARKS}
        selectionBoxRoot={selectionRef}
        value={WITH_BASIC_COMMANDS_API_VALUE}
        autoFocus
      />
    </div>
  );
}

type Props = {
  editor: YooEditor;
};

const FixedToolbar = ({ editor }: Props) => {
  return (
    <div className="bg-white z-50">
      <div className="flex justify-center mb-2">
        <button
          type="button"
          onClick={() => {
            ImageCommands.insertImage(editor, {
              at: [1],
              props: {
                src: 'https://res.cloudinary.com/ench-app/image/upload/v1713028758/Cheems_doge_fx8yvq.jpg',
                alt: 'Insert image',
                fit: 'cover',
                bgColor: '#f3f4f6',
              },
            });
          }}
          className="p-2 text-xs shadow-md border-r hover:bg-[#64748b] hover:text-[#fff]"
        >
          Insert Image
        </button>
        <button
          type="button"
          onClick={() => {
            TableCommands.insertTable(editor, { rows: 3, columns: 3, headerRow: true, at: [1] });
          }}
          className="p-2 text-xs shadow-md border-r hover:bg-[#64748b] hover:text-[#fff]"
        >
          Insert Table 3x3
        </button>
        <button
          type="button"
          onClick={() => {
            TableCommands.insertTable(editor, { rows: 6, columns: 4, at: [0] });
          }}
          className="p-2 text-xs shadow-md border-r hover:bg-[#64748b] hover:text-[#fff]"
        >
          Insert Table 6x4
        </button>
        <button
          type="button"
          onClick={() => {
            DividerCommands.updateDivider(editor, '2b54fac2-d026-4cd5-b9ff-d39db20a6b39', {
              color: 'red',
              theme: 'gradient',
            });
          }}
          className="p-2 text-xs shadow-md border-r hover:bg-[#64748b] hover:text-[#fff]"
        >
          Update Divider
        </button>
        <button
          type="button"
          onClick={() => {
            EmbedCommands.insertEmbed(editor, {
              at: [1],
              props: {
                provider: {
                  url: 'https://youtu.be/TzRm01Gm_0k?si=wnGyvg2kel7zCiVq',
                },
              },
            });
          }}
          className="p-2 text-xs shadow-md border-r hover:bg-[#64748b] hover:text-[#fff]"
        >
          Insert Embed
        </button>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            ParagraphCommands.insertParagraph(editor, { at: [0], focus: true });
            const block = Blocks.getBlock(editor, { at: [0] });
            const slate = Blocks.getSlate(editor, { at: [0] });

            if (!slate || !block) return;

            // [BUG] Need to wait for the block to be focused
            setTimeout(() => {
              LinkCommands.insertLink(editor, {
                slate,
                props: { url: 'https://yoopta.dev', target: '_blank', rel: 'noopener noreferrer' },
              });
            }, 0);
          }}
          className="p-2 text-xs shadow-md border-r hover:bg-[#64748b] hover:text-[#fff]"
        >
          Insert Link
        </button>
        <button
          type="button"
          onClick={() => {
            AccordionCommands.insertAccordion(editor, { at: [1], items: 4 });
          }}
          className="p-2 text-xs shadow-md border-r hover:bg-[#64748b] hover:text-[#fff]"
        >
          Insert Accordion with 4 items
        </button>
        <button
          type="button"
          onClick={() => {
            HeadingOneCommands.insertHeadingOne(editor, { at: [1], text: 'Heading with text', focus: true });
          }}
          className="p-2 text-xs shadow-md border-r hover:bg-[#64748b] hover:text-[#fff]"
        >
          Insert Heading 1 with text
        </button>
        <button
          type="button"
          onClick={() => {
            editor.commands.insertBlockquote({ at: [1], text: 'Blockquote with text', focus: true });
          }}
          className="p-2 text-xs shadow-md border-r hover:bg-[#64748b] hover:text-[#fff]"
        >
          Insert Blockquote with text
        </button>
        <button
          type="button"
          onClick={() => {
            CalloutCommands.updateCalloutTheme(editor, '46f231b7-74c0-4c2d-ba29-2e192e5720a3', 'warning');
          }}
          className="p-2 text-xs shadow-md hover:bg-[#64748b] hover:text-[#fff]"
        >
          Update Callout theme
        </button>
      </div>
    </div>
  );
};

export default WithCommandsAPI;

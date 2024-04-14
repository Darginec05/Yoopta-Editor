import YooptaEditor, { createYooptaEditor, Tools, YooEditor, YooptaBlockData } from '@yoopta/editor';
import Blockquote from '@yoopta/blockquote';
import Paragraph from '@yoopta/paragraph';
import Headings from '@yoopta/headings';
import Image from '@yoopta/image';
import { Bold, Italic, Highlight, CodeMark, Strike, Underline } from '@yoopta/marks';
import Callout from '@yoopta/callout';
import Lists from '@yoopta/lists';
import Link from '@yoopta/link';
import Video from '@yoopta/video';
import File from '@yoopta/file';
import Embed from '@yoopta/embed';
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import { useEffect, useMemo, useRef, useState } from 'react';
import { uploadToCloudinary } from '../../utils/cloudinary';

import Code from '@yoopta/code';
import { BaseElement } from 'slate';
import { ActionNotionMenuExample } from '../../components/ActionMenuExamples/NotionExample/ActionNotionMenuExample';
import { SlackChat } from '../../components/Chats/SlackChat/SlackChat';
import { NotionToolbar } from '../../components/Toolbars/NotionToolbar/NotionToolbar';
// import Mention from '@yoopta/mention';

const plugins = [
  Code,
  File.extend({
    options: {
      onUpload: async (file: File) => {
        const data = await uploadToCloudinary(file, 'auto');

        return {
          src: data.secure_url,
          format: data.format,
          name: data.name,
          size: data.bytes,
        };
      },
    },
  }),
  Paragraph.extend({
    options: {
      HTMLAttributes: {
        className: 'paragraph-element',
      },
      display: {
        title: 'THIS IS CHANGED TITLE',
        description: 'Ooh.. It seems extending plugin is works!',
      },
    },
  }),
  Image.extend({
    // renders: {
    //   image: ({ attributes, children, element, blockId }) => {
    //     return (
    //       <div>
    //         <img
    //           draggable={false}
    //           data-element-type={element.type}
    //           className="yoo-h-mt-6 yoo-h-scroll-m-20"
    //           {...attributes}
    //         />
    //         {children}
    //       </div>
    //     );
    //   },
    // },
    options: {
      HTMLAttributes: {
        className: 'image-element',
      },
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
    },
  }),
  Headings.HeadingOne.extend({
    options: {
      HTMLAttributes: {
        className: 'heading-one-element',
        style: {
          color: 'red !important',
        },
      },
    },
  }),
  Headings.HeadingTwo.extend({
    options: {
      HTMLAttributes: {
        className: 'heading-two-element-extended',
      },
    },
  }),
  Headings.HeadingThree,
  Blockquote,
  Callout,
  Lists.BulletedList.extend({
    options: {
      HTMLAttributes: {
        className: 'bulleted-list-element',
      },
    },
  }),
  Lists.NumberedList,
  Lists.TodoList,
  Embed,
  Video.extend({
    options: {
      HTMLAttributes: {
        className: 'video-element',
      },
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
  Link.extend({
    options: {
      HTMLAttributes: {
        className: 'link-element',
      },
    },
  }),
];

const MARKS = [Bold, Italic, Highlight, CodeMark, Strike, Underline];

const TOOLS: Tools = {
  ActionMenu: {
    // render: ActionNotionMenuExample,
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
    props: {
      // items: ['Callout', 'Blockquote', 'HeadingOne', 'HeadingTwo', 'HeadingThree', 'Image', 'File'],
    },
  },
  Toolbar: {
    // render: DefaultToolbarRender,
    render: NotionToolbar,
    tool: Toolbar,
  },
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
};

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const rectangleSelectionRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);

  useEffect(() => {
    editor.on('block:copy', (value) => console.log('BLOCK COPY', value));
  }, []);

  const onSubmit = () => {
    const editorData = editor.getEditorValue();
    console.log('EDITOR DATA', editorData);
  };

  return (
    <div className="px-[100px]  max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={rectangleSelectionRef}>
      <YooptaEditor
        editor={editor}
        plugins={plugins}
        selectionBoxRoot={rectangleSelectionRef}
        marks={MARKS}
        autoFocus
        placeholder="Type / to open menu"
        tools={TOOLS}
        readOnly={readOnly}
        width={750}
        // value={value}
      >
        <div className="flex mb-8">
          <button
            className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
            onClick={() => {
              editor.formats.highlight?.update({ color: 'rgb(176, 171, 250)' });
            }}
          >
            Highlight text
          </button>
          <button
            className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
            onClick={() => {
              editor.blocks.Image.create();
            }}
          >
            Add Image
          </button>
          <button
            className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
            onClick={() => {
              editor.blocks.Blockquote.toggle({
                focus: true,
              });
            }}
          >
            Toggle block
          </button>
          <button className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md" onClick={onSubmit}>
            Get editor data
          </button>
          <button className="bg-[#007aff] text-[#fff] px-4 py-2 rounded-md" onClick={() => setReadOnly((p) => !p)}>
            Switch readOnly mode
          </button>
        </div>
      </YooptaEditor>
    </div>
  );
};

export default BasicExample;

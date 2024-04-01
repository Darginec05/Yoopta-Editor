import YooptaEditor, {
  buildBlockData,
  createYooptaEditor,
  generateId,
  Tools,
  YooEditor,
  YooptaBlockData,
} from '@yoopta/editor';
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
        className: 'heading-two-element',
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
  // Table,
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

export type YooptaBaseElementV2 = {
  id: string;
  type: string;
  children: BaseElement['children'] | YooptaBaseElementV2[];
  data?: any;
  nodeType: 'block' | 'inline' | 'void';
};

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const value = {
  'd09a9db9-3a1c-4249-a72c-fcf52b297196': {
    id: 'd09a9db9-3a1c-4249-a72c-fcf52b297196',
    value: [
      {
        id: '4de6acfd-6795-46ca-bcbb-a9ee5aebfb11',
        type: 'file',
        children: [
          {
            text: '',
          },
        ],
        props: {
          nodeType: 'void',
          size: 11949,
          name: 'page-v2',
          src: 'https://res.cloudinary.com/ench-app/raw/upload/v1711831874/page-v2_qexcw3.json',
          format: 'json',
        },
      },
    ],
    type: 'File',
    meta: {
      order: 0,
      depth: 0,
    },
  },
  'ddf5ba7f-984d-4605-b237-db387efc7129': {
    id: 'ddf5ba7f-984d-4605-b237-db387efc7129',
    value: [
      {
        id: '73c8c234-1ba5-4abd-b88b-6fd9b49aaac8',
        type: 'paragraph',
        children: [
          {
            text: '.cm-cursor { border-left-color: orange }',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 1,
      depth: 0,
    },
  },
  '823bfa3e-82c1-4e33-98b3-e1c20b85b4be': {
    id: '823bfa3e-82c1-4e33-98b3-e1c20b85b4be',
    value: [
      {
        id: '7bab8e93-0444-4d6d-9607-055d9f79b1f1',
        type: 'code',
        children: [
          {
            text: 'asdasdsadsada',
          },
        ],
        props: {
          nodeType: 'void',
          language: 'javascript',
          theme: 'VSCode',
        },
      },
    ],
    type: 'Code',
    meta: {
      order: 2,
      depth: 0,
    },
  },
};
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
        <button className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md" onClick={onSubmit}>
          Get editor data
        </button>
        <button className="bg-[#007aff] text-[#fff] px-4 py-2 rounded-md" onClick={() => setReadOnly((p) => !p)}>
          Switch readOnly mode
        </button>
      </div>
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
        value={value}
      />
    </div>
  );
};

export default BasicExample;

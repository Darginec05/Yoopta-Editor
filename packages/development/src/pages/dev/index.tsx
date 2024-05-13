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
        className: 'paragraph-element-extended',
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
        className: 'image-element-extended',
      },
      onUpload: async (file: File) => {
        const data = await uploadToCloudinary(file);

        return {
          src: data.secure_url,
          alt: 'cloudinary',
          fit: 'fill',
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
        className: 'heading-one-element-extended',
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
  Blockquote.extend({
    options: {
      HTMLAttributes: {
        className: 'blockquote-element-extended',
      },
    },
  }),
  Callout.extend({
    options: {
      HTMLAttributes: {
        className: 'callout-element-extended',
      },
    },
  }),
  Lists.BulletedList.extend({
    options: {
      HTMLAttributes: {
        className: 'bulleted-list-element-extended',
      },
    },
  }),
  Lists.NumberedList,
  Lists.TodoList,
  Embed,
  Video.extend({
    options: {
      HTMLAttributes: {
        className: 'video-element-extended',
      },
      onUpload: async (file: File) => {
        const data = await uploadToCloudinary(file, 'video');
        return {
          src: data.secure_url,
          alt: 'cloudinary',
          fit: 'cover',
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
    render: DefaultToolbarRender,
    // render: NotionToolbar,
    tool: Toolbar,
  },
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
};

export type YooptaChildrenValue = Record<string, YooptaBlockData>;

const value = {
  '2af886bf-6e25-45d5-a82c-292546f6515c': {
    id: '2af886bf-6e25-45d5-a82c-292546f6515c',
    type: 'HeadingOne',
    meta: {
      order: 1,
      depth: 0,
    },
    value: [
      {
        id: '0508777e-52a4-4168-87a0-bc7661e57aab',
        type: 'heading-one',
        children: [
          {
            text: 'Example with full setup of Yoopta-Editor',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
  },
  '7b6fbbfe-1270-4f08-ace0-f78d0423cf4d': {
    id: '7b6fbbfe-1270-4f08-ace0-f78d0423cf4d',
    type: 'HeadingTwo',
    meta: {
      order: 2,
      depth: 0,
    },
    value: [
      {
        id: '284667f9-8b8f-4839-839d-73b5f1966752',
        type: 'heading-two',
        children: [
          {
            text: 'Example with full setup of Yoopta-Editor',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
  },
  '90c7ffee-8ce0-418f-8e10-10da8dd7b428': {
    id: '90c7ffee-8ce0-418f-8e10-10da8dd7b428',
    value: [
      {
        id: 'd2107094-8385-48bd-8222-23b0b55d9151',
        type: 'paragraph',
        children: [
          {
            text: 'Example with full setup of Yoopta-Editor',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 0,
      depth: 0,
    },
  },
  '987305a2-b7af-4b00-8c99-8db1662d1261': {
    id: '987305a2-b7af-4b00-8c99-8db1662d1261',
    type: 'HeadingThree',
    meta: {
      order: 3,
      depth: 0,
    },
    value: [
      {
        id: '86597d6b-8f40-45f2-b380-a3413434e1c5',
        type: 'heading-three',
        children: [
          {
            text: 'Example with full setup of Yoopta-Editor',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
  },
  '37245c24-62f4-4315-ba22-9f02d7fb61df': {
    id: '37245c24-62f4-4315-ba22-9f02d7fb61df',
    type: 'Blockquote',
    meta: {
      order: 4,
      depth: 0,
    },
    value: [
      {
        id: 'f4d3a978-eea3-48d4-ad3c-b350fa3783a4',
        type: 'blockquote',
        children: [
          {
            text: 'Example with full setup of Yoopta-Editor',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
  },
  '1ab297a4-b746-4825-842c-c1fbfab1d93a': {
    id: '1ab297a4-b746-4825-842c-c1fbfab1d93a',
    type: 'Callout',
    meta: {
      order: 5,
      depth: 0,
    },
    value: [
      {
        id: '4f038362-109e-44ac-aae5-4ee3b9e6a12a',
        type: 'callout',
        children: [
          {
            text: 'Example with full setup of Yoopta-Editor',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
  },
  '8c18747e-039a-4a5d-ac78-b923c2d9f567': {
    id: '8c18747e-039a-4a5d-ac78-b923c2d9f567',
    type: 'BulletedList',
    meta: {
      order: 7,
      depth: 0,
    },
    value: [
      {
        id: '89a52422-41fd-4bcf-b896-40dd1c5a4427',
        type: 'bulleted-list',
        children: [
          {
            text: 'Example with full setup of Yoopta-Editor',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
  },
  'ab2738ae-283e-4892-8572-f7dcc72096e5': {
    id: 'ab2738ae-283e-4892-8572-f7dcc72096e5',
    value: [
      {
        id: '807c7625-5cdf-42ea-bcb6-94837e34662a',
        type: 'bulleted-list',
        children: [
          {
            text: 'Example with full setup of Yoopta-Editor',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'BulletedList',
    meta: {
      order: 8,
      depth: 0,
    },
  },
  '15c1bccf-2559-43fa-8708-bc92704acfc0': {
    id: '15c1bccf-2559-43fa-8708-bc92704acfc0',
    value: [
      {
        id: '9a82c42d-3d82-46c0-a288-18ceb737d6dd',
        type: 'numbered-list',
        children: [
          {
            text: 'Example with full setup of Yoopta-Editor',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'NumberedList',
    meta: {
      order: 9,
      depth: 0,
    },
  },
  'd44659d4-1ec0-4785-b606-99f260ede883': {
    id: 'd44659d4-1ec0-4785-b606-99f260ede883',
    value: [
      {
        id: 'dd6e4ae1-ce5f-4549-81dd-7f95cf227e93',
        type: 'numbered-list',
        children: [
          {
            text: 'Example with full setup of Yoopta-Editor',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'NumberedList',
    meta: {
      order: 10,
      depth: 0,
    },
  },
  'dc0fed6b-3a39-4aef-800c-2e69926f22f5': {
    id: 'dc0fed6b-3a39-4aef-800c-2e69926f22f5',
    value: [
      {
        id: '6b1d5736-97c0-4fa8-84d5-ba9ab39423d6',
        type: 'todo-list',
        children: [
          {
            text: 'Example with full setup of Yoopta-Editor',
          },
        ],
        props: {
          nodeType: 'block',
          checked: false,
        },
      },
    ],
    type: 'TodoList',
    meta: {
      order: 11,
      depth: 0,
    },
  },
  'b4566f8b-6796-4d34-87d3-dc3e0183b20b': {
    id: 'b4566f8b-6796-4d34-87d3-dc3e0183b20b',
    value: [
      {
        id: '67825b50-bdd9-472c-8e90-c5d9bb3b59c9',
        type: 'todo-list',
        children: [
          {
            text: 'Example with full setup of Yoopta-Editor',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'TodoList',
    meta: {
      order: 12,
      depth: 0,
    },
  },
  '5cd4e842-97c6-4858-aaac-1ee52a7166d7': {
    id: '5cd4e842-97c6-4858-aaac-1ee52a7166d7',
    value: [
      {
        id: 'c2a8422d-c472-4eb7-98bf-7779d30caf0e',
        type: 'image',
        children: [
          {
            text: '',
          },
        ],
        props: {
          nodeType: 'void',
          src: 'https://res.cloudinary.com/ench-app/image/upload/v1715632817/GNYvP3UXUAAbPKZ_yd1yws.jpg',
          alt: 'cloudinary',
          srcSet: null,
          fit: 'fill',
          sizes: {
            width: 1170,
            height: 1162,
          },
        },
      },
    ],
    type: 'Image',
    meta: {
      order: 14,
      depth: 0,
    },
  },
  '19a53b1b-8bcc-48d0-b0b2-729f83efa669': {
    id: '19a53b1b-8bcc-48d0-b0b2-729f83efa669',
    type: 'Callout',
    meta: {
      order: 6,
      depth: 0,
    },
    value: [
      {
        id: '8893ddab-211a-4c7c-ae5f-86fc42bd66f0',
        type: 'callout',
        children: [
          {
            text: 'Example with full setup of Yoopta-Editor',
          },
        ],
        props: {
          nodeType: 'block',
          theme: 'info',
        },
      },
    ],
  },
  '1c645fd1-05fd-46f3-9207-05e2f0ccded5': {
    id: '1c645fd1-05fd-46f3-9207-05e2f0ccded5',
    value: [
      {
        id: '7df52958-629a-4299-a0eb-5d061a9fa737',
        type: 'code',
        children: [
          {
            text: "const TOOLS: Tools = {\n  ActionMenu: {\n    // render: ActionNotionMenuExample,\n    render: DefaultActionMenuRender,\n    tool: ActionMenuList,\n    props: {\n      // items: ['Callout', 'Blockquote', 'HeadingOne', 'HeadingTwo', 'HeadingThree', 'Image', 'File'],\n    },\n  },\n  Toolbar: {\n    render: DefaultToolbarRender,\n    // render: NotionToolbar,\n    tool: Toolbar,\n  },\n  LinkTool: {\n    render: DefaultLinkToolRender,\n    tool: LinkTool,\n  },\n};",
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
      order: 13,
      depth: 0,
    },
  },
  '5ddf9adf-e2c1-4adf-a6f6-7ca32420c4a6': {
    id: '5ddf9adf-e2c1-4adf-a6f6-7ca32420c4a6',
    value: [
      {
        id: 'ffb4741c-5322-4423-9026-80d8c4902611',
        type: 'video',
        children: [
          {
            text: '',
          },
        ],
        props: {
          nodeType: 'void',
          src: 'https://res.cloudinary.com/ench-app/video/upload/v1715632823/Yoopta_Intro_ndwglr_mtptgj.mp4',
          srcSet: null,
          sizes: {
            width: 2252,
            height: 1624,
          },
          provider: {
            type: null,
            id: '',
          },
          settings: {
            controls: false,
            loop: true,
            muted: true,
            autoPlay: true,
          },
          fit: 'cover',
        },
      },
    ],
    type: 'Video',
    meta: {
      order: 15,
      depth: 0,
    },
  },
  '71bec89c-0a58-47aa-a895-15253ce72831': {
    id: '71bec89c-0a58-47aa-a895-15253ce72831',
    value: [
      {
        id: 'f1128e50-6302-4fe9-bc5d-0a673c45afe1',
        type: 'file',
        children: [
          {
            text: '',
          },
        ],
        props: {
          nodeType: 'void',
          size: 96443,
          name: 'GNYvP3UXUAAbPKZ',
          src: 'https://res.cloudinary.com/ench-app/image/upload/v1715632830/GNYvP3UXUAAbPKZ_cgvvwb.jpg',
          format: 'jpg',
        },
      },
    ],
    type: 'File',
    meta: {
      order: 16,
      depth: 0,
    },
  },
  '499480f6-b8f9-4495-afdf-d860a23bb37e': {
    id: '499480f6-b8f9-4495-afdf-d860a23bb37e',
    value: [
      {
        id: '8f80f994-b665-4566-96de-8eca9e8c77f8',
        type: 'embed',
        children: [
          {
            text: '',
          },
        ],
        props: {
          nodeType: 'void',
          sizes: {
            width: 532,
            height: 327,
          },
          provider: {
            type: 'youtube',
            id: 'O8ErPJqW67A',
            url: 'https://www.youtube.com/watch?v=O8ErPJqW67A&list=RDCkx0ZdKzkbc&index=3&ab_channel=Hajime',
          },
        },
      },
    ],
    type: 'Embed',
    meta: {
      order: 17,
      depth: 0,
    },
  },
  '5c97c726-fe7e-4cb3-8486-52b1060757c0': {
    id: '5c97c726-fe7e-4cb3-8486-52b1060757c0',
    value: [
      {
        id: '1a8648f1-400a-4928-a604-730cf343c7c9',
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 18,
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
              editor.setEditorValue(value);
            }}
          >
            Set value
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

import YooptaEditor, {
  createYooptaEditor,
  Tools,
  useYooptaEditor,
  useYooptaFocused,
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
import AccordionPlugin from '@yoopta/accordion';
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import { useEffect, useMemo, useRef, useState } from 'react';
import { uploadToCloudinary } from '../../utils/cloudinary';

import Code from '@yoopta/code';
import { ActionNotionMenuExample } from '../../components/ActionMenuExamples/NotionExample/ActionNotionMenuExample';
import { NotionToolbar } from '../../components/Toolbars/NotionToolbar/NotionToolbar';
import { ACCORDION_BLOCK } from '../../components/customPlugins/Accordion/Accordion';
// import Accordion from '../../components/customPlugins/Accordion/src';
// import Mention from '@yoopta/mention';

const plugins = [
  AccordionPlugin,
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
    //           className="yoo-h-mt-6 yoo-h-scroll-m-20"
    //           {...attributes}
    //         />
    //         {children}
    //       </div>
    //     );
    //   },
    // },
    options: {
      maxSizes: {
        maxHeight: 800,
      },
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
  '9b291f39-d5d0-4927-9ae3-cca900937955': {
    id: '9b291f39-d5d0-4927-9ae3-cca900937955',
    value: [
      {
        id: '1f973a32-90f6-45f6-9310-2de1da4f10a3',
        type: 'accordion-list',
        children: [
          {
            id: 'd8e917e8-fe31-46bd-8076-226d2d76237d',
            type: 'accordion-list-item',
            children: [
              {
                id: '76d6ba08-40b2-45da-80f9-17a954e3e82c',
                type: 'accordion-list-item-heading',
                children: [
                  {
                    text: 'asdsad',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
              {
                id: '6599fa62-0da4-4ca0-9279-551828ec9255',
                type: 'accordion-list-item-content',
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
            props: {
              nodeType: 'block',
              isExpanded: true,
            },
          },
          {
            id: '705baea1-b0a0-4562-87d7-a0a61e38aa9b',
            type: 'accordion-list-item',
            children: [
              {
                id: '18e8dba7-bb35-4914-968f-357c50a5a897',
                type: 'accordion-list-item-heading',
                children: [
                  {
                    text: 'asdsadasadasds',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
              {
                id: '951a8842-ae7a-495e-b574-9f9f0a497842',
                type: 'accordion-list-item-content',
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
            props: {
              nodeType: 'block',
              isExpanded: true,
            },
          },
          {
            id: '80cee518-63e5-47ec-8455-49a5acfe27b3',
            type: 'accordion-list-item',
            children: [
              {
                id: 'b9f6beed-968f-4636-a439-9575084fcd76',
                type: 'accordion-list-item-heading',
                children: [
                  {
                    text: '',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
              {
                id: '16ae9f42-459a-4eb9-a937-a8d44da19f00',
                type: 'accordion-list-item-content',
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
            props: {
              nodeType: 'block',
              isExpanded: true,
            },
          },
        ],
      },
    ],
    type: 'Accordion',
    meta: {
      order: 4,
      depth: 0,
    },
  },
  'd670dc65-0dea-4c95-a806-46b912ca58eb': {
    id: 'd670dc65-0dea-4c95-a806-46b912ca58eb',
    value: [
      {
        id: '48f7e7af-c173-4381-a28c-88ff538262ae',
        type: 'paragraph',
        children: [
          {
            text: 'asdsad',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 6,
      depth: 0,
    },
  },
  'c83f5cb4-2672-402e-960f-775ae57ef1a0': {
    id: 'c83f5cb4-2672-402e-960f-775ae57ef1a0',
    value: [
      {
        id: 'e8fbbc87-31d6-4c0d-8292-5b170913274e',
        type: 'paragraph',
        children: [
          {
            text: 'asdaasdsad',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 7,
      depth: 0,
    },
  },
  '2efa2d2e-1fdd-4c52-b4a6-4f49eb14b623': {
    id: '2efa2d2e-1fdd-4c52-b4a6-4f49eb14b623',
    value: [
      {
        id: '3f8207f1-8a5f-4fa5-ba89-cec6b378d27f',
        type: 'paragraph',
        children: [
          {
            text: 'sdasdsad',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 8,
      depth: 0,
    },
  },
  '55daff58-28e5-4b5e-be4e-3188c6873195': {
    id: '55daff58-28e5-4b5e-be4e-3188c6873195',
    value: [
      {
        id: '64354934-4895-4bba-8432-d9fed11f7d90',
        type: 'heading-one',
        props: {
          nodeType: 'block',
        },
        children: [
          {
            text: '',
          },
        ],
      },
    ],
    type: 'HeadingOne',
    meta: {
      order: 5,
      depth: 0,
    },
  },
  'd57ca7fd-2197-4296-86a4-3570e0dad3d3': {
    id: 'd57ca7fd-2197-4296-86a4-3570e0dad3d3',
    value: [
      {
        id: '49d09142-5ed9-4780-8d20-1707ab7fb3bb',
        type: 'paragraph',
        children: [
          {
            text: 'lk',
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
  '3fd0ea93-13a4-4b83-8b00-72cac06c6ae6': {
    id: '3fd0ea93-13a4-4b83-8b00-72cac06c6ae6',
    type: 'Paragraph',
    meta: {
      order: 1,
      depth: 0,
    },
    value: [
      {
        id: '49d09142-5ed9-4780-8d20-1707ab7fb3bb',
        type: 'paragraph',
        props: {
          nodeType: 'block',
        },
        children: [
          {
            text: 'lj',
          },
        ],
      },
    ],
  },
  'a28fdfde-3504-4d7a-84d2-2da951a9e757': {
    id: 'a28fdfde-3504-4d7a-84d2-2da951a9e757',
    type: 'Paragraph',
    meta: {
      order: 2,
      depth: 0,
    },
    value: [
      {
        id: '49d09142-5ed9-4780-8d20-1707ab7fb3bb',
        type: 'paragraph',
        props: {
          nodeType: 'block',
        },
        children: [
          {
            text: 'lk',
          },
        ],
      },
    ],
  },
  'c5269d3b-3e7a-4fec-825b-74fb50ec5174': {
    id: 'c5269d3b-3e7a-4fec-825b-74fb50ec5174',
    type: 'Paragraph',
    meta: {
      order: 3,
      depth: 0,
    },
    value: [
      {
        id: '49d09142-5ed9-4780-8d20-1707ab7fb3bb',
        type: 'paragraph',
        props: {
          nodeType: 'block',
        },
        children: [
          {
            text: 'jk;',
          },
        ],
      },
    ],
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
    <div className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={rectangleSelectionRef}>
      <YooptaEditor
        editor={editor}
        plugins={plugins}
        selectionBoxRoot={rectangleSelectionRef}
        marks={MARKS}
        autoFocus={true}
        placeholder="Type / to open menu"
        tools={TOOLS}
        readOnly={readOnly}
        width={750}
        value={value}
      >
        <Buttons onSubmit={onSubmit} />
      </YooptaEditor>
    </div>
  );
};

const Buttons = ({ onSubmit }: any) => {
  const editor = useYooptaEditor();
  const isFocused = useYooptaFocused();

  return (
    <div className="flex mt-4 mb-8">
      <button className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md" onClick={editor.focus}>
        Focus
      </button>
      <button className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md" onClick={() => editor.blur()}>
        Blur
      </button>
      <button
        className="bg-[#007aff] mr-4 text-[#fff] px-4 py-2 rounded-md"
        onClick={() => console.log('editor.isFocused', isFocused)}
      >
        {isFocused ? 'editor is focused' : 'editor is blurred'}
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
    </div>
  );
};

export default BasicExample;

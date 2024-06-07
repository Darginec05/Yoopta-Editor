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
        value={{
          '9d98408d-b990-4ffc-a1d7-387084291b00': {
            id: '9d98408d-b990-4ffc-a1d7-387084291b00',
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
            type: 'HeadingOne',
            meta: {
              order: 0,
              depth: 0,
            },
          },
          'f99045cc-2391-4917-949d-ee3d2f6754b4': {
            id: 'f99045cc-2391-4917-949d-ee3d2f6754b4',
            value: [
              {
                id: '82587f96-506e-4e89-b958-61acd3ce881a',
                type: 'callout',
                children: [
                  {
                    text: 'This example shows you full setup with all features of Yoopta-Editor',
                  },
                ],
                props: {
                  nodeType: 'block',
                  theme: 'info',
                },
              },
            ],
            type: 'Callout',
            meta: {
              order: 1,
              depth: 0,
            },
          },
          '7e3ef31f-a72d-467d-b17e-e09d2b0f9475': {
            id: '7e3ef31f-a72d-467d-b17e-e09d2b0f9475',
            type: 'HeadingTwo',
            meta: {
              order: 7,
              depth: 0,
            },
            value: [
              {
                id: '147cd6ed-9e12-4664-bebf-0a97808bca56',
                type: 'heading-two',
                children: [
                  {
                    text: 'Features',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
          },
          '128d0660-6cc8-4f6a-be2a-ecb48cc7e9ce': {
            id: '128d0660-6cc8-4f6a-be2a-ecb48cc7e9ce',
            value: [
              {
                id: '3a629393-8cd5-4223-995e-28cc0515affc',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Default list of powerful plugins',
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
          '5b09de9d-5b43-4bbc-bc62-6aaec15cf0e7': {
            id: '5b09de9d-5b43-4bbc-bc62-6aaec15cf0e7',
            value: [
              {
                id: '9acd0f10-fee2-49ed-8deb-8501f7e92847',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Each plugin can be easily customized and extensible',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 14,
              depth: 0,
            },
          },
          'ea5096c5-15cf-4fe6-81b7-0bc71abd3ced': {
            id: 'ea5096c5-15cf-4fe6-81b7-0bc71abd3ced',
            value: [
              {
                id: 'f735b8ee-6c3d-436f-896e-43b8a4a7ed67',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'You can create your own plugin',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 17,
              depth: 0,
            },
          },
          'b43cc723-a915-464f-af77-b0f83650da14': {
            id: 'b43cc723-a915-464f-af77-b0f83650da14',
            value: [
              {
                id: '8ff8b383-13c9-404b-a8ab-0565808ac301',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Many typical solved problems in UX behavior.',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 11,
              depth: 0,
            },
          },
          '09ed1fc5-2fd8-45b0-aad9-7bfe7e3689be': {
            id: '09ed1fc5-2fd8-45b0-aad9-7bfe7e3689be',
            value: [
              {
                id: '63b50284-400e-4016-81f0-6c31637632f9',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'A list of useful tools (ActionMenu, Toolbar etc.) for the convenience of working with the editor',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 18,
              depth: 0,
            },
          },
          '2efdb828-68e1-4363-be9a-6b7953193c74': {
            id: '2efdb828-68e1-4363-be9a-6b7953193c74',
            value: [
              {
                id: 'e72663a8-2f06-4236-aa57-e4a591af8337',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Automatic lazy loading for media components (eg. embeds)',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 19,
              depth: 0,
            },
          },
          '9f9e2589-73aa-439f-a085-a2865310c2fd': {
            id: '9f9e2589-73aa-439f-a085-a2865310c2fd',
            value: [
              {
                id: '784d2f79-5351-4b36-8b19-24b9b8292061',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Exports in markdown, plain text, html - ',
                  },
                  {
                    text: '[in progress. Currently available only HTML exports]',
                    italic: true,
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 26,
              depth: 0,
            },
          },
          'a08e859a-a507-463f-97d0-0d6635f2f81d': {
            id: 'a08e859a-a507-463f-97d0-0d6635f2f81d',
            value: [
              {
                id: '12a07f75-c2c3-4365-9896-8f1e77ab3302',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Redo/undo changes - ',
                  },
                  {
                    text: '[not stable, in progress]',
                    italic: true,
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 27,
              depth: 0,
            },
          },
          '7baf535b-9fab-4d0a-af79-f692ff232a72': {
            id: '7baf535b-9fab-4d0a-af79-f692ff232a72',
            value: [
              {
                id: 'b463bcce-73e2-4165-bd72-4c29c726d3d0',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Drag and drop, nested dnd is supported also',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 15,
              depth: 0,
            },
          },
          'c1a91408-a4db-40ff-aaef-2c6b12fdbb3b': {
            id: 'c1a91408-a4db-40ff-aaef-2c6b12fdbb3b',
            value: [
              {
                id: '3a3abc76-fc49-4237-9c50-12cab84203ab',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'The soul invested in the development of this editor 💙',
                    highlight: {
                      color: '#B35588',
                    },
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 30,
              depth: 0,
            },
          },
          '8c86afe7-cbda-444c-8a45-2c79d23566ee': {
            id: '8c86afe7-cbda-444c-8a45-2c79d23566ee',
            value: [
              {
                id: '9c1b5074-2103-485d-a7b6-5271d88ee5db',
                type: 'bulleted-list',
                children: [
                  {
                    text: '... and other features that I forgot to write about in this list 😅. Just check it!',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 31,
              depth: 0,
            },
          },
          '6c33ed40-9ccf-469f-bad3-b62dac06ef3a': {
            id: '6c33ed40-9ccf-469f-bad3-b62dac06ef3a',
            value: [
              {
                id: 'fd7fb13a-3fb4-4b1a-b3a4-4f084de90e2c',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Media plugins on steroids with optimization and lazy loadings',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 12,
              depth: 0,
            },
          },
          '5d98062b-be38-4765-a157-c95432abf3d9': {
            id: '5d98062b-be38-4765-a157-c95432abf3d9',
            value: [
              {
                id: '38dd2ace-842d-4bce-aeb4-f2c077087681',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Editor events for saving to DB in real-time',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 25,
              depth: 0,
            },
          },
          '719e2b92-709b-42ff-a3f9-ad4823ebee97': {
            id: '719e2b92-709b-42ff-a3f9-ad4823ebee97',
            value: [
              {
                id: 'efe50756-27ae-4392-a08d-1360c7f2e111',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Shortcuts, hotkeys. And customization for this!',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 28,
              depth: 0,
            },
          },
          'aa9b295f-492f-4e54-9b98-7ec51887c752': {
            id: 'aa9b295f-492f-4e54-9b98-7ec51887c752',
            value: [
              {
                id: '1f5093d5-b20b-44bf-af2c-5c63d293758e',
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
              order: 32,
              depth: 0,
            },
          },
          '6a505208-bb4d-4177-9d22-15b65b04f98d': {
            id: '6a505208-bb4d-4177-9d22-15b65b04f98d',
            value: [
              {
                id: '57fbf30d-100b-4636-9ea9-02b1f1b753c0',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Code plugin on steroids with themes and languages',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 13,
              depth: 0,
            },
          },
          '477b0734-a7ed-44e2-a009-15a078e994b4': {
            id: '477b0734-a7ed-44e2-a009-15a078e994b4',
            value: [
              {
                id: '2d9babc8-e4ca-475b-b1ca-6d92236e87d8',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Large documents ',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 20,
              depth: 0,
            },
          },
          'e4c5f3b8-d712-483d-9c22-97a61d039779': {
            id: 'e4c5f3b8-d712-483d-9c22-97a61d039779',
            value: [
              {
                id: '7aec7681-3d85-464c-b257-a6487702ae28',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Get editor instance to programmatically control your content',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 24,
              depth: 0,
            },
          },
          'ae33b042-9c0e-4276-94ed-197ff778cc72': {
            id: 'ae33b042-9c0e-4276-94ed-197ff778cc72',
            value: [
              {
                id: 'b2e371f7-0c01-4722-9d37-413757e7a608',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Everything is customizable for custom renders ',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 29,
              depth: 0,
            },
          },
          '6184a767-f56e-4856-bed4-82f970b5fce8': {
            id: '6184a767-f56e-4856-bed4-82f970b5fce8',
            type: 'Blockquote',
            meta: {
              order: 6,
              depth: 0,
            },
            value: [
              {
                id: '0163554a-74a3-4eaa-a4f2-0ec3ad9e7ab9',
                type: 'blockquote',
                children: [
                  {
                    text: '- Our life is what our thoughts make it',
                    bold: true,
                  },
                  {
                    text: '\n(c) Marcus Aurelius',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
          },
          '78c8e461-d7cd-474d-97c9-773550bd2ca9': {
            id: '78c8e461-d7cd-474d-97c9-773550bd2ca9',
            value: [
              {
                id: 'c734ccd2-38f1-4f7b-9c84-45098100f901',
                type: 'image',
                children: [
                  {
                    text: '',
                  },
                ],
                props: {
                  nodeType: 'void',
                  src: 'https://res.cloudinary.com/ench-app/image/upload/v1713028758/Cheems_doge_fx8yvq.jpg',
                  alt: 'cloudinary',
                  srcSet: null,
                  fit: 'contain',
                  sizes: {
                    width: 334,
                    height: 368,
                  },
                },
              },
            ],
            type: 'Image',
            meta: {
              order: 44,
              depth: 0,
            },
          },
          'cec531df-cb6a-473e-807b-26be460cb391': {
            id: 'cec531df-cb6a-473e-807b-26be460cb391',
            value: [
              {
                id: 'cd8eb268-836f-4148-a965-49f2f12b065e',
                type: 'heading-three',
                children: [
                  {
                    text: 'Do you like it? Please star ',
                  },
                  {
                    type: 'link',
                    children: [
                      {
                        text: 'our repo in Github',
                      },
                    ],
                    props: {
                      url: 'https://github.com/Darginec05/Yoopta-Editor',
                      target: '_blank',
                      rel: 'noreferrer',
                    },
                  },
                  {
                    text: ' ',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'HeadingThree',
            meta: {
              order: 43,
              depth: 0,
            },
          },
          '8ec75789-e8b1-4bb4-8561-e30f0ee0cddb': {
            id: '8ec75789-e8b1-4bb4-8561-e30f0ee0cddb',
            value: [
              {
                id: 'd7a45452-6488-45fc-b220-7adb93901f2e',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Indent and outdent for every plugin by tabs and shift+tabs',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 23,
              depth: 0,
            },
          },
          '3d61674a-8d55-4b6f-9ff3-eb1518ec22b0': {
            id: '3d61674a-8d55-4b6f-9ff3-eb1518ec22b0',
            value: [
              {
                id: '6060760c-8dfb-4c75-9b70-2a6bc04c16b6',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'A completely rewritten architecture to increase perfomance',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 21,
              depth: 0,
            },
          },
          'ad9febba-dc2d-49fc-9a08-0728c9d498d3': {
            id: 'ad9febba-dc2d-49fc-9a08-0728c9d498d3',
            value: [
              {
                id: '13086615-fc12-49b6-a9fe-c6871b3bba3c',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Easy setup!',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 9,
              depth: 0,
            },
          },
          'ea205e9e-2a9e-4a99-ab52-6d713d423860': {
            id: 'ea205e9e-2a9e-4a99-ab52-6d713d423860',
            value: [
              {
                id: '269a9bf3-34e9-4def-98e7-5ecd94110cd4',
                type: 'image',
                children: [
                  {
                    text: '',
                  },
                ],
                props: {
                  nodeType: 'void',
                  src: 'https://res.cloudinary.com/ench-app/image/upload/v1713029072/ImageTransformer_hlr9eo.jpg',
                  alt: 'cloudinary',
                  srcSet: null,
                  fit: 'contain',
                  sizes: {
                    width: 448,
                    height: 379,
                  },
                },
              },
            ],
            type: 'Image',
            meta: {
              order: 46,
              depth: 0,
            },
          },
          '7d3f395b-656d-46af-924c-b88b9974f631': {
            id: '7d3f395b-656d-46af-924c-b88b9974f631',
            type: 'HeadingThree',
            meta: {
              order: 45,
              depth: 0,
            },
            value: [
              {
                id: 'f5e0eaae-c64f-495c-99d4-ab4a780889eb',
                type: 'heading-three',
                children: [
                  {
                    text: 'Any bugs or did we miss something? Just ',
                  },
                  {
                    type: 'link',
                    children: [
                      {
                        text: 'create issue in repo!',
                      },
                    ],
                    props: {
                      url: 'https://github.com/Darginec05/Yoopta-Editor/issues',
                      target: '_blank',
                      rel: 'noreferrer',
                      title: 'issue in repo!',
                    },
                  },
                  {
                    text: '',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
          },
          '17fc0ceb-6898-4684-9b9b-7612f4bf735f': {
            id: '17fc0ceb-6898-4684-9b9b-7612f4bf735f',
            value: [
              {
                id: 'a6e1e9b4-6fe1-4cb7-afad-632d4e1b26c1',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Selection box for manipulating with multiple blocks at once',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 16,
              depth: 0,
            },
          },
          '73ef95c8-6971-4481-846c-5b5f34d1cd13': {
            id: '73ef95c8-6971-4481-846c-5b5f34d1cd13',
            value: [
              {
                id: '20fb9c63-6a18-45fd-97ac-9880cd47161c',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Mobile friendly',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 22,
              depth: 0,
            },
          },
          '95e9b5ab-2158-48da-9196-6079a33508f2': {
            id: '95e9b5ab-2158-48da-9196-6079a33508f2',
            value: [
              {
                id: 'dac238c2-0db7-4a0d-9b4b-543e340f935b',
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
              order: 47,
              depth: 0,
            },
          },
          '697aa54b-aea0-4a88-82e5-ec5a6f2c5791': {
            id: '697aa54b-aea0-4a88-82e5-ec5a6f2c5791',
            type: 'HeadingThree',
            meta: {
              order: 3,
              depth: 0,
            },
            value: [
              {
                id: 'e7cfd6da-0ed1-4849-ae05-f52b9e65c87b',
                type: 'heading-three',
                children: [
                  {
                    text: 'FAQs',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
          },
          'd19fe347-ae2f-469d-85f4-a66d63a2fd40': {
            id: 'd19fe347-ae2f-469d-85f4-a66d63a2fd40',
            value: [
              {
                id: 'c2a68b34-3efa-4c1f-9616-3e4ceb727b94',
                type: 'heading-two',
                children: [
                  {
                    text: 'Roadmap',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'HeadingTwo',
            meta: {
              order: 33,
              depth: 0,
            },
          },
          'be5fad74-46ed-4a77-b121-953d2db30141': {
            id: 'be5fad74-46ed-4a77-b121-953d2db30141',
            value: [
              {
                id: '5ab4ef22-8b2e-4618-bbae-cd07d1a059d6',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Develop other powerful plugins',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 34,
              depth: 0,
            },
          },
          '6a432e66-8627-45ae-8e36-52fa7cab2cc5': {
            id: '6a432e66-8627-45ae-8e36-52fa7cab2cc5',
            value: [
              {
                id: '6d37bea6-b21d-413a-b7ad-5994bb12b0ee',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Super AI tools not for HYPE, but for real useful work with editor content',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 35,
              depth: 0,
            },
          },
          'a1ce732c-8b2c-447f-9938-af719becf846': {
            id: 'a1ce732c-8b2c-447f-9938-af719becf846',
            value: [
              {
                id: '96ddb3d0-808f-48e0-8994-f1b63af0d49a',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Simplify API for creating plugins',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 36,
              depth: 0,
            },
          },
          'eb883c05-9984-4972-864f-81ffdfc93bf4': {
            id: 'eb883c05-9984-4972-864f-81ffdfc93bf4',
            value: [
              {
                id: '751adb79-ee2b-4855-ab00-cdf8f2ec9354',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Collabrative mode',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 37,
              depth: 0,
            },
          },
          '8dc4f112-0210-41c0-a1e8-2e6da120ba41': {
            id: '8dc4f112-0210-41c0-a1e8-2e6da120ba41',
            value: [
              {
                id: '8de5305f-2b22-46c9-9941-bcca78992955',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Plugin system',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 38,
              depth: 0,
            },
          },
          '28dac558-f474-4198-b267-3b95bdd1016c': {
            id: '28dac558-f474-4198-b267-3b95bdd1016c',
            value: [
              {
                id: '3ea8b393-70dc-4c69-a370-17373cc4dab5',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Optimizations for media components (',
                  },
                  {
                    text: 'srcSet ',
                    bold: true,
                  },
                  {
                    text: 'for image and ',
                  },
                  {
                    text: 'sources',
                    bold: true,
                  },
                  {
                    text: ' for video)',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 39,
              depth: 0,
            },
          },
          'f33fc1b8-bf3b-4e63-b540-41f257410719': {
            id: 'f33fc1b8-bf3b-4e63-b540-41f257410719',
            value: [
              {
                id: '87c80c0b-1abf-4a86-bc77-9be9d7415199',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Rethink approach for just rendering to increase SEO perfomance',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 40,
              depth: 0,
            },
          },
          '653ec531-73c7-4d54-ba9c-0d7456cf7eaf': {
            id: '653ec531-73c7-4d54-ba9c-0d7456cf7eaf',
            value: [
              {
                id: '95428d0c-36be-4cb9-b0c3-8df15077a742',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Continue improving the project. We are listening to you and your requests 💙',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 41,
              depth: 0,
            },
          },
          '7ac415e1-4788-4864-8f28-f82bfaa1a253': {
            id: '7ac415e1-4788-4864-8f28-f82bfaa1a253',
            value: [
              {
                id: '0feff7ea-24a3-436e-88e2-83346e9cb3c5',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Redo/undo between blocks',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 49,
              depth: 0,
            },
          },
          '3fd638ae-fb2f-433d-976a-f2d5f82f2822': {
            id: '3fd638ae-fb2f-433d-976a-f2d5f82f2822',
            value: [
              {
                id: 'c659d066-5f50-4583-afd8-3b09b2fcbd87',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Selection between blocks',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 50,
              depth: 0,
            },
          },
          'd62df7dd-8560-445b-8374-fcd5299029d3': {
            id: 'd62df7dd-8560-445b-8374-fcd5299029d3',
            value: [
              {
                id: 'e8510c43-606c-430d-ac81-87f29cacf65e',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Copy/paste with selected blocks',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 51,
              depth: 0,
            },
          },
          '9095bf5d-b6d6-4815-bd6a-bf06fe97affd': {
            id: '9095bf5d-b6d6-4815-bd6a-bf06fe97affd',
            value: [
              {
                id: 'cb362a05-a783-478f-bbad-78d08e263bee',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Tests',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 54,
              depth: 0,
            },
          },
          '8120e3f9-fef0-44bd-ad86-ee26f45cdad9': {
            id: '8120e3f9-fef0-44bd-ad86-ee26f45cdad9',
            value: [
              {
                id: '73a001b1-9620-4484-a128-c78076d27831',
                type: 'heading-two',
                children: [
                  {
                    text: 'Currently known issues',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'HeadingTwo',
            meta: {
              order: 48,
              depth: 0,
            },
          },
          '95f23367-0837-440a-b778-a95c09df2b09': {
            id: '95f23367-0837-440a-b778-a95c09df2b09',
            value: [
              {
                id: '7423d69d-bb48-4733-8f33-05d82e759d91',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Dragndrop with selected blocks',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 52,
              depth: 0,
            },
          },
          'c5fc9364-93ab-4e48-83bb-f5d5a8fb3c23': {
            id: 'c5fc9364-93ab-4e48-83bb-f5d5a8fb3c23',
            value: [
              {
                id: '18fc43c2-efb8-4b18-936a-a41e4acb304c',
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
              order: 42,
              depth: 0,
            },
          },
          '784122f7-2b72-4b19-a1e7-c4a06c013662': {
            id: '784122f7-2b72-4b19-a1e7-c4a06c013662',
            value: [
              {
                id: 'c2b86108-7236-4a07-9440-f327ab3b16af',
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
              order: 55,
              depth: 0,
            },
          },
          '8bf97157-698f-4365-882a-68e6eff020fb': {
            id: '8bf97157-698f-4365-882a-68e6eff020fb',
            value: [
              {
                id: '5fad6d4d-eee1-4998-9613-80bdc4134abb',
                type: 'bulleted-list',
                children: [
                  {
                    text: 'Focusing blocks with custom editor',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'BulletedList',
            meta: {
              order: 53,
              depth: 0,
            },
          },
          'ad15458a-10c9-41fa-8193-e86e393fc9d6': {
            id: 'ad15458a-10c9-41fa-8193-e86e393fc9d6',
            value: [
              {
                id: '3f9508b0-ac86-49e3-9ad3-5c22575d4b2a',
                type: 'code',
                children: [
                  {
                    text: '// pass props to main component and that all\nfunction YouThinkThisIsJoke() {\n  const editor = useMemo(() => createYooptaEditor(), []);\n\n  return (\n    <div>\n      <YooptaEditor\n        editor={editor}\n        plugins={plugins}\n        tools={TOOLS}\n        marks={MARKS}\n      />\n    </div>\n  );\n}',
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
              order: 10,
              depth: 1,
            },
          },
          'ffb4470c-d951-4ed2-b446-c1a07650c550': {
            id: 'ffb4470c-d951-4ed2-b446-c1a07650c550',
            value: [
              {
                id: '7dee490c-3f3a-419b-b5d4-7915650cdb3c',
                type: 'paragraph',
                children: [
                  {
                    text: '---',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'Paragraph',
            meta: {
              order: 5,
              depth: 0,
            },
          },
          '62bcd227-f42c-426d-8b3a-9bff70b5308d': {
            id: '62bcd227-f42c-426d-8b3a-9bff70b5308d',
            value: [
              {
                id: '557497a0-0bc7-493b-920b-23a0698479d2',
                type: 'accordion-list',
                children: [
                  {
                    id: '0b8e4c12-198a-4883-b578-6aae9a141121',
                    type: 'accordion-list-item',
                    children: [
                      {
                        id: '4bbe8fbd-8180-47bd-a65c-b3480cf7f4f4',
                        type: 'accordion-list-item-heading',
                        children: [
                          {
                            text: 'Can I relax with Yoopta-Editor?',
                          },
                        ],
                        props: {
                          nodeType: 'block',
                        },
                      },
                      {
                        id: 'a203259d-f075-44a3-a557-7d89f15a3501',
                        type: 'accordion-list-item-content',
                        children: [
                          {
                            text: 'Definitely, yes. We are aiming to ensure that you never worry about developing rich-text editors, but just focus on business logic when writing your super applications.',
                          },
                        ],
                        props: {
                          nodeType: 'block',
                        },
                      },
                      {
                        id: 'a203259d-f075-44a3-a557-7d89f15a3501',
                        type: 'accordion-list-item-content',
                        props: {
                          nodeType: 'block',
                        },
                        children: [
                          {
                            text: 'Just install the needed packages, make the necessary configuration and relax',
                            underline: true,
                          },
                        ],
                      },
                    ],
                    props: {
                      nodeType: 'block',
                      isExpanded: true,
                    },
                  },
                  {
                    id: '7580532b-fe45-41fd-a394-9775526ee8e2',
                    type: 'accordion-list-item',
                    children: [
                      {
                        id: 'ac050b26-5502-43e6-9244-9749c5f0a5cc',
                        type: 'accordion-list-item-heading',
                        children: [
                          {
                            text: 'Can I create custom plugins?',
                          },
                        ],
                        props: {
                          nodeType: 'block',
                        },
                      },
                      {
                        id: '623e5ce5-22a6-493c-8263-24ed356078f6',
                        type: 'accordion-list-item-content',
                        children: [
                          {
                            text: 'Yes, yes, and yes again. You will be able to create a custom plugin of any complexity',
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
                    id: '2ee0104f-1946-49a5-8fdd-bfd2d32e3d50',
                    type: 'accordion-list-item',
                    children: [
                      {
                        id: '1a9e575f-2c19-442c-9a72-84cabe2619c3',
                        type: 'accordion-list-item-heading',
                        children: [
                          {
                            text: 'What about AI?',
                          },
                        ],
                        props: {
                          nodeType: 'block',
                        },
                      },
                      {
                        id: 'd50c8d92-b5cd-4f0c-8d60-00e5b5cba844',
                        type: 'accordion-list-item-content',
                        children: [
                          {
                            text: '1. We have plans to create AI text input for creating your custom plugins\n2. AI tools for helping you with your content\n3. AI tool which can help translate content\n4. ...and other super useful tools 😉',
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
                    id: 'ec4816dd-c646-43c8-90cf-30fe02b2a93f',
                    type: 'accordion-list-item',
                    children: [
                      {
                        id: '53a34ea7-773c-4ea0-ac46-93d3bb26d4ac',
                        type: 'accordion-list-item-heading',
                        props: {
                          nodeType: 'block',
                        },
                        children: [
                          {
                            text: 'What is best football club?',
                          },
                        ],
                      },
                      {
                        id: 'e0eff75b-4239-499b-81d9-d13a77070ff1',
                        type: 'accordion-list-item-content',
                        children: [
                          {
                            text: 'Chelsea FC',
                            underline: true,
                            highlight: {
                              color: '#477DA5',
                            },
                          },
                          {
                            highlight: {
                              color: '#477DA5',
                            },
                            text: ' 💙',
                          },
                        ],
                        props: {
                          nodeType: 'block',
                        },
                      },
                    ],
                    props: {
                      nodeType: 'block',
                      isExpanded: false,
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
          '39f639c6-219f-4cb7-a817-cb9f4d6ea07c': {
            id: '39f639c6-219f-4cb7-a817-cb9f4d6ea07c',
            value: [
              {
                id: '022419d3-449c-4bfd-b4fb-e87060083aea',
                type: 'paragraph',
                children: [
                  {
                    text: '---',
                  },
                ],
                props: {
                  nodeType: 'block',
                },
              },
            ],
            type: 'Paragraph',
            meta: {
              order: 2,
              depth: 0,
            },
          },
        }}
        style={{
          width: 750,
        }}
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

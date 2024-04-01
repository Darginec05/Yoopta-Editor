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
  '9bff29a6-63d3-4b4e-8815-2389a53e7c3f': {
    id: '9bff29a6-63d3-4b4e-8815-2389a53e7c3f',
    value: [
      {
        id: '83dde100-984f-4823-a82e-287e304002f2',
        type: 'callout',
        children: [
          {
            text: 'dia queries like responsive breakpoints, dark mode, prefers-reduced-motion, and more. For example, use md:border-dotted to apply the border-dotted utility at only medium screen sizes and above.',
          },
        ],
        props: {
          nodeType: 'block',
          theme: 'default',
        },
      },
    ],
    type: 'Callout',
    meta: {
      order: 3,
      depth: 0,
    },
  },
  '914071bc-f201-4258-a25a-02c89aa630bf': {
    id: '914071bc-f201-4258-a25a-02c89aa630bf',
    value: [
      {
        id: '545b4939-4a35-49ae-b95f-4850d0d36aa8',
        type: 'image',
        children: [
          {
            text: '',
          },
        ],
        props: {
          nodeType: 'void',
          src: 'https://res.cloudinary.com/ench-app/image/upload/v1712003876/dacia-duster_mnitvf.jpg',
          alt: 'cloudinary',
          srcSet: null,
          fit: 'contain',
          sizes: {
            width: 1200,
            height: 675,
          },
        },
      },
    ],
    type: 'Image',
    meta: {
      order: 4,
      depth: 0,
    },
  },
  'c7aa76ab-15f7-4fd2-95b8-74b719e97b86': {
    id: 'c7aa76ab-15f7-4fd2-95b8-74b719e97b86',
    value: [
      {
        id: 'a2059a29-7680-447b-9740-e4ebd90f302d',
        type: 'video',
        children: [
          {
            text: '',
          },
        ],
        props: {
          nodeType: 'void',
          src: 'https://res.cloudinary.com/ench-app/video/upload/v1712003894/Sequence_01_2_qc8rvj.mp4',
          srcSet: null,
          sizes: {
            width: 720,
            height: 1280,
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
        },
      },
    ],
    type: 'Video',
    meta: {
      order: 5,
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
        value={[
          {
            id: 'oc-M_t0aiz14M8SNyeUau',
            type: 'heading-one',
            nodeType: 'block',
            children: [{ text: 'Підготовка до інтенсиву' }],
          },
          {
            id: '5qsjQC7t_E9L8nLTxWlGT',
            type: 'embed',
            nodeType: 'void',
            children: [{ text: '' }],
            data: {
              url: 'https://iframe.mediadelivery.net/embed/71252/cacab43a-be45-44c2-9088-fc228d4321e4?autoplay=false&loop=false&muted=false&preload=true',
              size: { width: 'auto', height: 'auto' },
              providerId: null,
              provider: null,
            },
          },
          {
            id: 'bDjWT-qinHyus2tjWsdjP',
            type: 'heading-two',
            nodeType: 'block',
            children: [{ text: 'ТУТ Я ЗІБРАЛА ВСІ КОРИСНІ ПОСИЛАННЯ, ЧЕК ЛИСТИ І ВОРКБУКИ' }],
          },
          {
            id: 'T0YFyhk7fzkPqoDlhslw8',
            type: 'paragraph',
            children: [
              { text: 'Але спершу я хочу тебе попросити прописати свій ' },
              { text: 'намір на інтенсив', bold: true },
              {
                text: ". Всі ми купуючи якийсь курс, наставництво, йдемо туди від наміру: дізнатися нове, бути частиною ком'юніті, розібратися в якомусь питанні. Тому дуже важливо розуміти твій намір, бо саме він буде допомагати не заходити з дистанції ✨",
              },
            ],
            nodeType: 'block',
          },
          {
            id: 'YVgbTw8yZ5EDuvg68FlAl',
            type: 'paragraph',
            children: [
              {
                text: 'Нижче ти знайдеш ворк буки, які можеш роздрукувати чи зберегти на пристрій.',
              },
            ],
            nodeType: 'block',
          },
          {
            id: 'pQgkxXKJ7F-Y-H8XMDNWs',
            type: 'paragraph',
            children: [{ text: 'Ну все, поїхали! Бажаю успіхів!', bold: true }],
            nodeType: 'block',
          },
          {
            id: 'eNJfMbtu7nrLiqAih32Qa',
            type: 'paragraph',
            children: [
              { text: '' },
              {
                id: 'S3wpu1qVvf-ddTjwsgIJa',
                type: 'link',
                data: {
                  url: 'https://drive.google.com/drive/folders/1GpY6RY9MCxhwJOPnAGDJD4ZNoHW30fRi',
                  skipDrag: true,
                },
                children: [{ text: 'Посилання на завантажування воркбуків' }],
                nodeType: 'inline',
              },
              { text: ' ✍🏼' },
            ],
            nodeType: 'block',
          },
          {
            id: 'r9kxsOKfOjTP-aYRmPstM',
            type: 'paragraph',
            nodeType: 'block',
            children: [{ text: '' }],
          },
          {
            id: 'wxWw9CkO7Nr_g8yJBh928',
            type: 'paragraph',
            children: [
              {
                text: 'Якщо ви купили тариф BASIC чи VIP і у вас є можливість отримувати зворотній звʼязок напишіть мені особисто. ',
              },
            ],
            nodeType: 'block',
          },
          {
            id: 'Xl4lF12ikmkAXW0NXj5Re',
            type: 'paragraph',
            children: [
              {
                text: 'Якщо у вас тариф лайт, але виникнуть якісь труднощі зі завданням чи платформою, також ви можете звʼязатись зі мною по посиланню нижче 👇🏼',
              },
            ],
            nodeType: 'block',
          },
          {
            id: 'W5i2Opyey3FqYJ1H2p6gg',
            type: 'paragraph',
            nodeType: 'block',
            children: [
              { text: '' },
              {
                id: 'X40-Ld5p0eC5z99a4ecpd',
                type: 'link',
                data: { url: 'https://t.me/alinakosmoss', skipDrag: true },
                children: [{ text: 'https://t.me/alinakosmoss' }],
                nodeType: 'inline',
              },
              { text: '' },
            ],
          },
        ]}
      />
    </div>
  );
};

export default BasicExample;

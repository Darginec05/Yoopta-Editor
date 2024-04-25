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
        title: 'Super Ultra Blockquote',
        description: 'Yay 🎉 It seems, that extending the plugin works!',
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

const value = {
  'f2cc1b99-1c77-49d4-90b9-f76cf7f28757': {
    id: 'f2cc1b99-1c77-49d4-90b9-f76cf7f28757',
    value: [
      {
        id: '9183fd7d-1c8b-4653-b0d5-01bc27f07d95',
        type: 'heading-two',
        children: [
          {
            text: 'Description',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'HeadingTwo',
    meta: {
      order: 0,
      depth: 0,
    },
  },
  'cec7abb6-bff8-4911-bfda-a6c05227621f': {
    id: 'cec7abb6-bff8-4911-bfda-a6c05227621f',
    value: [
      {
        id: '0ce2e21f-15a6-4102-916a-4ed74cee3669',
        type: 'paragraph',
        children: [
          {
            text: 'Fixes',
          },
          {
            text: ' ',
          },
          {
            text: '#27481',
          },
          {
            text: '.',
          },
          {
            text: '\n',
          },
          {
            text: 'See also',
          },
          {
            text: ' ',
          },
          {
            text: '#3629',
          },
          {
            text: '.',
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
  '53b44347-9c9a-408e-834d-269d0fa17a48': {
    id: '53b44347-9c9a-408e-834d-269d0fa17a48',
    value: [
      {
        id: '6c53740d-3688-44d2-b6db-e0f182224e9d',
        type: 'paragraph',
        children: [
          {
            text: 'These changes allow the user to select multiple blocks without selecting the blocks as a whole. This is done by allowing native selection across block boundaries, detecting the selection start and end in the appropriate rich text instances, and handling actions for this selection.',
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
  '5c5e2bf6-50d1-4f72-bb33-7cfb38be480f': {
    id: '5c5e2bf6-50d1-4f72-bb33-7cfb38be480f',
    value: [
      {
        id: 'f70411a6-661b-4c87-9bc2-90b9c474b670',
        type: 'paragraph',
        children: [
          {
            text: 'This PR implements',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: 'Enter',
          },
          {
            text: ',',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: 'Backspace',
          },
          {
            text: ',',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: 'Delete',
          },
          {
            text: ' ',
          },
          {
            text: '(forward merge) and any input (typing) over the selection.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 3,
      depth: 0,
    },
  },
  '1908fd68-e42f-485b-b4ca-7cbbc2626eae': {
    id: '1908fd68-e42f-485b-b4ca-7cbbc2626eae',
    value: [
      {
        id: '13172da8-afef-42fa-a5d1-0b138260195f',
        type: 'paragraph',
        children: [
          {
            text: 'You can select partially by mouse (drag), shift + click, and also the keyboard (shift + arrow).',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'Paragraph',
    meta: {
      order: 4,
      depth: 0,
    },
  },
  'be87a81a-0e17-4efe-bebd-17d56f122df3': {
    id: 'be87a81a-0e17-4efe-bebd-17d56f122df3',
    value: [
      {
        id: '41b3e0d9-0d81-4ceb-b85c-79ea1212a1d9',
        type: 'paragraph',
        children: [
          {
            text: 'It works in all browsers including Firefox.',
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
  'b2572c5f-8258-466f-af7e-631ce00f9e10': {
    id: 'b2572c5f-8258-466f-af7e-631ce00f9e10',
    value: [
      {
        id: 'c223492e-1abe-41df-a305-9a6a04d9025a',
        type: 'paragraph',
        children: [
          {
            text: 'We use the',
          },
          {
            text: ' ',
          },
          {
            code: true,
            text: 'merge',
          },
          {
            text: ' ',
          },
          {
            text: 'function on the block type to handle merges and detect if two blocks are mergeable. If two blocks are not mergeable, we fall back to the current behaviour, which is to select the blocks entirely.',
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
  '391fd7a6-efc1-4c6e-b5ad-06449d447296': {
    id: '391fd7a6-efc1-4c6e-b5ad-06449d447296',
    value: [
      {
        id: '6a7c25ba-253b-4e07-844c-c161c41fdaf5',
        type: 'heading-two',
        children: [
          {
            text: 'Checklist:',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'HeadingTwo',
    meta: {
      order: 7,
      depth: 0,
    },
  },
  '223c0a79-e9f6-4892-b314-46abae2b3f10': {
    id: '223c0a79-e9f6-4892-b314-46abae2b3f10',
    value: [
      {
        id: 'a010ac22-228f-48a1-83b9-85c50916208e',
        type: 'bulleted-list',
        children: [
          {
            text: ' My code is tested.',
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
  '7ea2f516-59d3-4cda-aa03-86b77ddf9f82': {
    id: '7ea2f516-59d3-4cda-aa03-86b77ddf9f82',
    value: [
      {
        id: 'e230a425-7cac-4bcf-bd21-bd565f5e03de',
        type: 'bulleted-list',
        children: [
          {
            text: ' My code follows the WordPress code style.',
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
  '1a199ea1-7120-4c10-9b41-c2c0fffcdecc': {
    id: '1a199ea1-7120-4c10-9b41-c2c0fffcdecc',
    value: [
      {
        id: '5bffabf2-d08c-4cef-acff-c6a799ac1fe4',
        type: 'bulleted-list',
        children: [
          {
            text: ' My code follows the accessibility standards.',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'BulletedList',
    meta: {
      order: 10,
      depth: 0,
    },
  },
  '65263b95-2037-4eec-a079-0a8896bf558f': {
    id: '65263b95-2037-4eec-a079-0a8896bf558f',
    value: [
      {
        id: '28098640-a649-4f04-b5ee-5a45bccfe904',
        type: 'bulleted-list',
        children: [
          {
            text: " I've tested my changes with keyboard and screen readers.",
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
  '9a469643-c29c-457d-92ad-b03a6f9adeec': {
    id: '9a469643-c29c-457d-92ad-b03a6f9adeec',
    value: [
      {
        id: '5b82ca2f-87d1-40fc-98ea-23b6826174c6',
        type: 'bulleted-list',
        children: [
          {
            text: ' My code has proper inline documentation.',
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
  'b89f8ac1-6760-4294-b1a3-c77b8cc01a10': {
    id: 'b89f8ac1-6760-4294-b1a3-c77b8cc01a10',
    value: [
      {
        id: '27148ba4-41cf-4203-924f-6a03108dc1ca',
        type: 'bulleted-list',
        children: [
          {
            text: " I've included developer documentation if appropriate.",
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
  'f907d9d2-1026-4266-a7ba-d9be081ffb1d': {
    id: 'f907d9d2-1026-4266-a7ba-d9be081ffb1d',
    value: [
      {
        id: 'fc0ee172-9a9c-4304-877d-7dffec711a51',
        type: 'bulleted-list',
        children: [
          {
            text: " I've updated all React Native files affected by any refactorings/renamings in this PR (please manually search all *.native.js files for terms that need renaming or removal).",
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
  'f96f1b75-282f-405d-a5ae-69d0aafde8d1': {
    id: 'f96f1b75-282f-405d-a5ae-69d0aafde8d1',
    value: [
      {
        id: 'ab2c7a10-33b1-4283-a33c-4b77c4634cd0',
        type: 'bulleted-list',
        children: [
          {
            text: " I've updated related schemas if appropriate.",
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

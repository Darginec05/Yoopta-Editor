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
// import Table from '@yoopta/table';
import Embed from '@yoopta/embed';
import ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';
import LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';
import Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';
import { useMemo, useRef, useState } from 'react';
import { uploadToCloudinary } from '../../utils/cloudinary';

import Code from '@yoopta/code';
// import Mention from '@yoopta/mention';

const plugins = [
  Code,
  // Mention,
  Paragraph,
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
    renders: {
      'heading-one': ({ attributes, children, element, blockId }) => {
        return (
          <h1
            id={element.id}
            draggable={false}
            data-element-type={element.type}
            className="yoo-h-mt-6 yoo-h-scroll-m-20 yoo-h-text-4xl yoo-h-font-bold yoo-h-tracking-tight yoo-h-lg:text-5xl"
            {...attributes}
          >
            {children}
          </h1>
        );

        // return defaultRenderer({ attributes, children, element, blockId });
      },
    },
  }),
  Headings.HeadingTwo,
  Headings.HeadingThree,
  Blockquote,
  Callout,
  Lists.BulletedList,
  Lists.NumberedList,
  Lists.TodoList,
  // Table,
  Embed,
  Video.extend({
    options: {
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

const value = {
  'H9vcJ81Pn_-762myw3_ag': {
    id: 'H9vcJ81Pn_-762myw3_ag',
    value: [
      {
        id: 'C4NKxXt-ipn3L7vbNkCuP',
        type: 'code',
        children: [
          {
            text: "import YooptaEditor, { createYooptaEditor, Tools, YooEditor } from '@yoopta/editor';\nimport Blockquote from '@yoopta/blockquote';\nimport Paragraph from '@yoopta/paragraph';\nimport Headings from '@yoopta/headings';\nimport Image from '@yoopta/image';\nimport { Bold, Italic, Highlight, CodeMark, Strike, Underline } from '@yoopta/marks';\nimport Callout from '@yoopta/callout';\nimport Lists from '@yoopta/lists';\nimport Link from '@yoopta/link';\nimport Video from '@yoopta/video';\n// import Table from '@yoopta/table';\nimport Embed from '@yoopta/embed';\nimport ActionMenuList, { DefaultActionMenuRender } from '@yoopta/action-menu-list';\nimport LinkTool, { DefaultLinkToolRender } from '@yoopta/link-tool';\nimport Toolbar, { DefaultToolbarRender } from '@yoopta/toolbar';\nimport { useMemo, useRef } from 'react';\nimport { uploadToCloudinary } from '../../utils/cloudinary';\n\nimport Code from '@yoopta/code';\n// import Mention from '@yoopta/mention';\n\nconst plugins = [\n  Code,\n  // Mention,\n  Paragraph,\n  Image.extend({\n    // renders: {\n    //   image: ({ attributes, children, element, blockId }) => {\n    //     return (\n    //       <div>\n    //         <img\n    //           draggable={false}\n    //           data-element-type={element.type}\n    //           className=\"yoo-h-mt-6 yoo-h-scroll-m-20\"\n    //           {...attributes}\n    //         />\n    //         {children}\n    //       </div>\n    //     );\n    //   },\n    // },\n    options: {\n      onUpload: async (file: File) => {\n        const data = await uploadToCloudinary(file);\n\n        return {\n          src: data.secure_url,\n          alt: 'cloudinary',\n          sizes: {\n            width: data.width,\n            height: data.height,\n          },\n        };\n      },\n    },\n  }),\n  Headings.HeadingOne.extend({\n    renders: {\n      'heading-one': ({ attributes, children, element, blockId }) => {\n        return (\n          <h1\n            id={element.id}\n            draggable={false}\n            data-element-type={element.type}\n            className=\"yoo-h-mt-6 yoo-h-scroll-m-20 yoo-h-text-4xl yoo-h-font-bold yoo-h-tracking-tight yoo-h-lg:text-5xl\"\n            {...attributes}\n          >\n            {children}\n          </h1>\n        );\n\n        // return defaultRenderer({ attributes, children, element, blockId });\n      },\n    },\n  }),\n  Headings.HeadingTwo,\n  Headings.HeadingThree,\n  Blockquote,\n  Callout,\n  Lists.BulletedList,\n  Lists.NumberedList,\n  Lists.TodoList,\n  // Table,\n  Embed,\n  Video.extend({\n    options: {\n      onUpload: async (file: File) => {\n        const data = await uploadToCloudinary(file, 'video');\n        return {\n          src: data.secure_url,\n          alt: 'cloudinary',\n          sizes: {\n            width: data.width,\n            height: data.height,\n          },\n        };\n      },\n    },\n  }),\n  Link,\n];\n\nconst MARKS = [Bold, Italic, Highlight, CodeMark, Strike, Underline];\n\nconst TOOLS: Tools = {\n  ActionMenu: {\n    render: DefaultActionMenuRender,\n    tool: ActionMenuList,\n  },\n  Toolbar: {\n    render: DefaultToolbarRender,\n    tool: Toolbar,\n  },\n  LinkTool: {\n    render: DefaultLinkToolRender,\n    tool: LinkTool,\n  },\n};\n\nconst BasicExample = () => {\n  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);\n  const rootRef = useRef<HTMLDivElement>(null);\n\n  const onSubmit = () => {\n    const editorData = editor.getEditorValue();\n    console.log('EDITOR DATA', editorData);\n  };\n\n  // useEffect(() => {\n  //   editor.on('change', (val) => {\n  //     console.log('on change value', val);\n  //   });\n  // }, [editor]);\n\n  return (\n    <div className=\"px-[100px] max-w-[900px] mx-auto my-10\" ref={rootRef}>\n      <div className=\"flex mb-10\">\n        <button\n          className=\"bg-blue-500 mr-4 text-white px-4 py-2 rounded-md\"\n          onClick={() => {\n            editor.formats.highlight?.update({ color: 'rgb(176, 171, 250)' });\n          }}\n        >\n          Highlight text\n        </button>\n        <button\n          className=\"bg-blue-500 mr-4 text-white px-4 py-2 rounded-md\"\n          onClick={() => {\n            editor.blocks.Image.create();\n          }}\n        >\n          Add Image\n        </button>\n        <button className=\"bg-blue-500 text-white px-4 py-2 rounded-md\" onClick={onSubmit}>\n          Get editor data\n        </button>\n      </div>\n      <YooptaEditor\n        editor={editor}\n        plugins={plugins}\n        selectionBoxRoot={rootRef}\n        marks={MARKS}\n        autoFocus\n        placeholder=\"Type / to open menu\"\n        tools={TOOLS}\n        // readOnly\n      />\n    </div>\n  );\n};\n\nexport default BasicExample;\n",
          },
        ],
        props: {
          nodeType: 'void',
          language: 'JavaScript',
          theme: 'VSCode',
        },
      },
    ],
    type: 'Code',
    meta: {
      order: 0,
      depth: 0,
    },
  },
  ImjOdxcuZRy7BzoRAkBf0: {
    id: 'ImjOdxcuZRy7BzoRAkBf0',
    value: [
      {
        id: 'dZDG9gS619IjWVei24fVq',
        type: 'image',
        children: [
          {
            text: '',
          },
        ],
        props: {
          nodeType: 'void',
          src: 'https://res.cloudinary.com/ench-app/image/upload/v1711145652/Screen_Shot_2024-03-16_at_19.16.46_akfgdk.png',
          alt: 'cloudinary',
          srcSet: null,
          fit: 'contain',
          sizes: {
            width: 2880,
            height: 1800,
          },
        },
      },
    ],
    type: 'Image',
    meta: {
      order: 1,
      depth: 0,
    },
  },
  ikkrcJlp0Z1t4gHd2jWcU: {
    id: 'ikkrcJlp0Z1t4gHd2jWcU',
    value: [
      {
        id: 'e1NJ0p0OnRZ1cU9ZYG0BS',
        type: 'video',
        children: [
          {
            text: '',
          },
        ],
        props: {
          nodeType: 'void',
          src: 'https://www.youtube.com/watch?v=nkCx3ckCB4w&ab_channel=%D0%A0%D1%8D%D0%BF%D0%B0%D0%BB%D1%8C%D0%B1%D0%BE%D0%BC%D1%8B%D0%B8%D1%81%D0%B1%D0%BE%D1%80%D0%BD%D0%B8%D0%BA%D0%B8',
          srcSet: null,
          bgColor: null,
          sizes: {
            width: 650,
            height: 400,
          },
          settings: {
            controls: false,
            loop: true,
            muted: true,
            autoPlay: true,
          },
          provider: {
            type: 'youtube',
            id: 'nkCx3ckCB4w',
          },
        },
      },
    ],
    type: 'Video',
    meta: {
      order: 2,
      depth: 0,
    },
  },
  tVHIpfL64c10eaa_O6P0A: {
    id: 'tVHIpfL64c10eaa_O6P0A',
    value: [
      {
        id: '9QoZ8FHushe-JIJQ3K99Q',
        type: 'heading-one',
        children: [
          {
            text: 'Heading',
          },
        ],
        props: {
          nodeType: 'block',
        },
      },
    ],
    type: 'HeadingOne',
    meta: {
      order: 3,
      depth: 0,
    },
  },
};

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const rootRef = useRef<HTMLDivElement>(null);
  const [readOnly, setReadOnly] = useState(false);

  const onSubmit = () => {
    const editorData = editor.getEditorValue();
    console.log('EDITOR DATA', editorData);
  };

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
        <button className="bg-blue-500 mr-4 text-white px-4 py-2 rounded-md" onClick={onSubmit}>
          Get editor data
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setReadOnly((p) => !p)}>
          Switch readOnly mode
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
        value={value}
        readOnly={readOnly}
      />
    </div>
  );
};

export default BasicExample;

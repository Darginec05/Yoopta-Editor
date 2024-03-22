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
import { useMemo, useRef } from 'react';
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
  Table,
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

const defaultEditorBlock = {
  id: '5e7WPDNzpUFnL0b4ZXh90',
  value: [
    {
      id: 'ncADBSizIkLaOWxk_kl5Y',
      type: 'code',
      children: [
        {
          text: "import { UI, YooEditor, YooptaBlockData } from '@yoopta/editor';\nimport { Select } from './Select';\nimport { themes } from '../utils/themes';\n\nimport { Trigger } from '@radix-ui/react-select';\nimport { LANGUAGES } from '../utils/languages';\nimport CopyIcon from '../icons/copy.svg';\nimport CodeIcon from '../icons/code.svg';\nimport ThemeIcon from '../icons/theme.svg';\nimport { CodeElement } from '../types';\n\nconst { ExtendedBlockActions, BlockOptionsMenuGroup, BlockOptionsMenuItem, BlockOptionsSeparator } = UI;\n\ntype Props = {\n  editor: YooEditor;\n  block: YooptaBlockData;\n  element: CodeElement;\n};\n\nexport const CodeBlockOptions = ({ block, editor, element }: Props) => {\n  const onChangeTheme = (theme: string) => {\n    editor.updateBlock(block.id, { value: [{ ...element, props: { ...element.props, theme } }] });\n  };\n\n  const onChangeLanguage = (language: string) => {\n    editor.updateBlock(block.id, { value: [{ ...element, props: { ...element.props, language } }] });\n  };\n\n  return (\n    <ExtendedBlockActions className=\"yoopta-code-options\">\n      <BlockOptionsSeparator />\n      <BlockOptionsMenuGroup>\n        <BlockOptionsMenuItem>\n          <button\n            type=\"button\"\n            className=\"yoo-code-rounded-sm hover:yoo-code-bg-[#37352f14] yoo-code-leading-[120%] yoo-code-px-2 yoo-code-py-1.5 yoo-code-mx-[4px] yoo-code-cursor-pointer yoo-code-w-full yoo-code-flex yoo-code-justify-start\"\n          >\n            <CopyIcon className=\"yoo-code-w-4 yoo-code-h-4 yoo-code-mr-2\" />\n            Copy code content\n          </button>\n        </BlockOptionsMenuItem>\n        <BlockOptionsMenuItem>\n          <Select\n            options={Object.keys(LANGUAGES).map((lang) => ({ value: lang, label: lang }))}\n            onChange={onChangeLanguage}\n            value={element.props?.language || 'JavaScript'}\n          >\n            <Trigger className=\"yoo-code-rounded-sm hover:yoo-code-bg-[#37352f14] yoo-code-leading-[120%] yoo-code-px-2 yoo-code-py-1.5 yoo-code-mx-[4px] yoo-code-cursor-pointer yoo-code-w-full yoo-code-flex yoo-code-justify-start\">\n              <CodeIcon className=\"yoo-code-w-4 yoo-code-h-4 yoo-code-mr-2\" />\n              Language\n            </Trigger>\n          </Select>\n        </BlockOptionsMenuItem>\n        <BlockOptionsMenuItem>\n          <Select\n            options={Object.keys(themes).map((theme) => ({ value: theme, label: theme }))}\n            onChange={onChangeTheme}\n            value={element.props?.theme || 'VSCode'}\n          >\n            <Trigger className=\"yoo-code-rounded-sm hover:yoo-code-bg-[#37352f14] yoo-code-leading-[120%] yoo-code-px-2 yoo-code-py-1.5 yoo-code-mx-[4px] yoo-code-cursor-pointer yoo-code-w-full yoo-code-flex yoo-code-justify-start\">\n              <ThemeIcon className=\"yoo-code-w-4 yoo-code-h-4 yoo-code-mr-2\" />\n              Theme\n            </Trigger>\n          </Select>\n        </BlockOptionsMenuItem>\n      </BlockOptionsMenuGroup>\n    </ExtendedBlockActions>\n  );\n};\n",
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
};

const BasicExample = () => {
  const editor: YooEditor = useMemo(() => createYooptaEditor(), []);
  const rootRef = useRef<HTMLDivElement>(null);

  const onSubmit = () => {
    const editorData = editor.getEditorValue();
    console.log('EDITOR DATA', editorData);
  };

  // useEffect(() => {
  //   editor.on('change', (val) => {
  //     console.log('on change value', val);
  //   });
  // }, [editor]);

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
        value={{ [defaultEditorBlock.id]: defaultEditorBlock }}
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

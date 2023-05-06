import YooptaEditor, { createYooptaPlugin, generateId } from '@yoopta/editor';
import Blockquote, { BlockquoteElement } from '@yoopta/blockquote';
import Paragraph, { ParagraphElement } from '@yoopta/paragraph';
import Callout, { CalloutElement } from '@yoopta/callout';
import Code from '@yoopta/code';
import Link, { LinkElement } from '@yoopta/link';
import Lists from '@yoopta/lists';
import Headings, { HeadingOneElement, HeadingThreeElement, HeadingTwoElement } from '@yoopta/headings';
import Image, { ImageElement, ImagePluginOptions } from '@yoopta/image';
import Video, { VideoElement } from '@yoopta/video';
import Embed, { EmbedElement } from '@yoopta/embed';
import Toolbar from '@yoopta/toolbar';
import YooptaRenderer from '@yoopta/renderer';
import { Bold, Italic, CodeMark, Underline, Strike } from '@yoopta/marks';
import ActionMenu, { ActionMenuItem } from '@yoopta/action-menu-list';
import { useMemo, useState } from 'react';

import { Descendant } from 'slate';
import { uploadToCloudinary } from '../../utils';
import s from './styles.module.scss';

type PluginOptions = ImagePluginOptions | Record<string, unknown>;
type PluginElements =
  | ParagraphElement
  | BlockquoteElement
  | CalloutElement
  // | CodeElement
  | LinkElement
  | HeadingOneElement
  | HeadingTwoElement
  | HeadingThreeElement
  | ImageElement
  | VideoElement
  | EmbedElement;

const MyPlugin = createYooptaPlugin<any, any>({
  type: 'myplugin',
  renderer: {
    render: (props) => {
      return <div>sadsadsad</div>;
    },
    editor: (editor) => (props) => {
      return <div></div>;
    },
  },
  defineElement: () => ({
    id: generateId(),
    type: 'myplugin',
  }),
  options: {},
});

const BasicExample = () => {
  const [editorValue, setEditorValue] = useState<Descendant[]>([]);
  const [mode, toggleMode] = useState<'render' | 'edit'>('edit');

  const plugins = useMemo(() => {
    return [
      Paragraph.extend({
        options: {
          HTMLAttributes: {
            spellCheck: true,
            className: 's.paragraph',
          },
        },
      }),
      Blockquote,
      Callout,
      Code,
      Link,
      Lists.NumberedList,
      Lists.BulletedList,
      Lists.TodoList,
      Headings.HeadingOne,
      Headings.HeadingTwo,
      Headings.HeadingThree,
      Embed.extend({
        options: {
          maxWidth: 800,
          maxHeight: 750,
          HTMLAttributes: {
            spellCheck: true,
            className: 's.paragraph',
          },
        },
      }),
      Image.extend({
        options: {
          maxWidth: 750,
          maxHeight: 800,
          onUpload: async (file: File) => {
            const response = await uploadToCloudinary(file, 'image');
            return { url: response.url, width: response.data.width, height: response.data.height };
          },
          HTMLAttributes: {
            spellCheck: true,
            className: 's.paragraph',
          },
        },
      }),
      Video.extend({
        options: {
          maxWidth: 750,
          maxHeight: 800,
          onUpload: async (file: File) => {
            const response = await uploadToCloudinary(file, 'video');
            return { url: response.url, width: response.data.width, height: response.data.height };
          },
        },
      }),
    ];
  }, []);

  const actionItems: ActionMenuItem<Record<'label' | 'description' | 'icon', string>>[] = [
    {
      plugin: Paragraph,
      searchString: 'text paragraph',
      label: 'Paragraph',
      description: 'Just start writing with plain text.',
      icon: '/text.png',
    },
    {
      plugin: Headings.HeadingOne,
      searchString: 'h1 title',
      label: 'Heading 1',
      description: 'Big section heading.',
      icon: '/header.png',
    },
    {
      plugin: Headings.HeadingTwo,
      searchString: 'h2 subtitle',
      label: 'Heading 2',
      description: 'Medium section heading.',
      icon: '/subheader.png',
    },
    {
      plugin: Headings.HeadingThree,
      searchString: 'h3 subsubtitle small heading',
      label: 'Heading 3',
      description: 'Small section heading.',
      icon: '/subsubheader.png',
    },
    {
      plugin: Image,
      searchString: 'image picture',
      label: 'Image',
      description: 'Upload or embed with a link.',
      icon: '/image.png',
    },
    {
      plugin: Video,
      searchString: 'video media',
      label: 'Video',
      description: 'Embed from YouTube, Vimeo...',
      icon: '/video.png',
    },
    {
      plugin: Embed,
      searchString: 'Embed media',
      label: 'Embed',
      description: 'Embed from YouTube, Vimeo...',
      icon: '/video.png',
    },
    { plugin: Blockquote, label: 'Blockquote', description: 'Capture a quote', icon: '/text.png' },
    { plugin: Callout, label: 'Callout', description: 'Just start writing with plain text.', icon: '/text.png' },
    {
      plugin: Code,
      searchString: 'hello world bug',
      label: 'Code',
      description: 'Write bugs.',
      icon: '/text.png',
    },
    {
      plugin: Lists.BulletedList,
      label: 'BulletedList',
      description: 'Just start writing with plain text.',
      icon: '/text.png',
    },
    {
      plugin: Lists.NumberedList,
      label: 'NumberedList',
      description: 'Just start writing with plain text.',
      icon: '/text.png',
    },
    {
      plugin: Lists.TodoList,
      searchString: 'todo check list',
      label: 'TodoList',
      description: 'Just start writing with plain text.',
      icon: '/text.png',
    },
  ];

  const isEdit = mode === 'edit';
  const marks = [Bold, Italic, CodeMark, Underline, Strike];

  return (
    <div className={s.container}>
      <YooptaEditor
        value={editorValue}
        onChange={(val: Descendant[]) => setEditorValue(val)}
        plugins={plugins}
        marks={marks}
        placeholder="Start typing..."
        offline="custom"
        autoFocus
      >
        <Toolbar />
        <ActionMenu />
      </YooptaEditor>

      {/* <YooptaEditor
        value={editorValue}
        onChange={(val: Descendant[]) => setEditorValue(val)}
        plugins={plugins}
        marks={marks}
        offline={{ name: 'yoopta-dev' }}
        placeholder="Type / to open menu"
        // [WIP]
        nodeElementSettings={{
          options: {
            handlers: {
              onCopy: () => console.log('do something'),
              onDelete: () => console.log('do somenthing'),
              onDuplicate: () => console.log('do something'),
            },
          },
          drag: false,
          plus: false,
        }}
      >
        <ActionMenu items={actionItems} />
        <Toolbar type="bubble" /> */}
      {/* // [WIP] */}
      {/* <ChatGPT /> */}
      {/* </YooptaEditor> */}
    </div>
  );
};

export default BasicExample;

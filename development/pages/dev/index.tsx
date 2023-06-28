import YooptaEditor, { createYooptaMark, createYooptaPlugin } from '@yoopta/editor';
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
import ChatGPT from '@yoopta/chat-gpt-assistant';
import YooptaRenderer from '@yoopta/renderer';
import { Bold, Italic, CodeMark, Underline, Strike } from '@yoopta/marks';
import ActionMenu, { ActionMenuItem } from '@yoopta/action-menu-list';
import LinkTool from '@yoopta/link-tool';
import { useState } from 'react';
import NextImage from 'next/image';
import { MediumToolbar } from '../../components/Toolbars/MediumToolbar';

import { Descendant } from 'slate';
import { uploadToCloudinary } from '../../utils';
import { NotionActionMenu } from '../../components/SuggestionList/NotionActionMenu';
import { NotionToolbar } from '../../components/Toolbars/NotionToolbar';
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

const plugins = [
  Paragraph.extend({
    options: {
      HTMLAttributes: {
        spellCheck: false,
        className: 's.Paragraph',
      },
    },
  }),
  Headings.HeadingOne.extend({
    options: {
      HTMLAttributes: {
        spellCheck: false,
      },
    },
  }),
  Headings.HeadingTwo.extend({
    options: {
      HTMLAttributes: {
        spellCheck: false,
      },
    },
  }),
  Headings.HeadingThree.extend({
    options: {
      HTMLAttributes: {
        spellCheck: false,
      },
    },
  }),
  Blockquote,
  Callout.extend({
    options: {
      HTMLAttributes: {
        spellCheck: false,
        className: s.callout,
      },
    },
  }),
  Code,
  Link,
  Lists.NumberedList.extend({
    options: {
      HTMLAttributes: {
        spellCheck: false,
      },
    },
  }),
  Lists.BulletedList.extend({
    options: {
      HTMLAttributes: {
        spellCheck: false,
      },
    },
  }),
  Lists.TodoList.extend({
    options: {
      HTMLAttributes: {
        spellCheck: false,
      },
    },
  }),
  Embed.extend({
    options: {
      maxWidth: 650,
      maxHeight: 750,
    },
  }),
  Image.extend({
    renderer: {
      editor: Image.getPlugin.renderer.editor,
      render: (props) => {
        const { element, children, attributes, size } = props;

        if (!element.data.url) return null;

        return (
          <div {...attributes} contentEditable={false}>
            <NextImage
              src={element.data.url || element.data['data-src']}
              width={size?.width || element.data.size.width}
              height={size?.height || element.data.size.height}
              alt="supe iamge"
              style={{ display: 'block', marginTop: 20 }}
            />
            {children}
          </div>
        );
      },
    },
    options: {
      maxWidth: 650,
      maxHeight: 650,
      onUpload: async (file: File) => {
        const response = await uploadToCloudinary(file, 'image');
        return { url: response.url, width: response.data.width, height: response.data.height };
      },
    },
  }),
  Video.extend({
    options: {
      maxWidth: 650,
      maxHeight: 650,
      onUpload: async (file: File) => {
        const response = await uploadToCloudinary(file, 'video');
        return { url: response.url, width: response.data.width, height: response.data.height };
      },
    },
  }),
];

const ACTION_MENU_ITEMS: ActionMenuItem<Record<'description' | 'icon', string>>[] = [
  {
    plugin: Paragraph,
    description: 'Just start writing with plain text.',
    icon: '/text.png',
  },
  {
    plugin: Headings.HeadingOne,
    description: 'Big section heading.',
    icon: '/header.png',
  },
  {
    plugin: Headings.HeadingTwo,
    description: 'Medium section heading.',
    icon: '/subheader.png',
  },
  {
    plugin: Headings.HeadingThree,
    description: 'Small section heading.',
    icon: '/subsubheader.png',
  },
  {
    plugin: Image,
    description: 'Upload or embed with a link.',
    icon: '/image.png',
  },
  {
    plugin: Video,
    description: 'Embed from YouTube, Vimeo...',
    icon: '/video.png',
  },
  {
    plugin: Embed,
    description: 'Embed from YouTube, Vimeo...',
    icon: '/video.png',
  },
  {
    plugin: Blockquote,
    description: 'Capture a quote',
    icon: '/text.png',
  },
  {
    plugin: Callout,
    description: 'Just start writing with plain text.',
    icon: '/text.png',
  },
  {
    plugin: Code,
    description: 'Write bugs.',
    icon: '/text.png',
  },
  {
    plugin: Lists.BulletedList,
    description: 'Just start writing with plain text.',
    icon: '/text.png',
  },
  {
    plugin: Lists.NumberedList,
    description: 'Just start writing with plain text.',
    icon: '/text.png',
  },
  {
    plugin: Lists.TodoList,
    description: 'Just start writing with plain text.',
    icon: '/text.png',
  },
];

const initContextMessages = [
  {
    role: 'user',
    content: 'What is Node JS?',
  },
  {
    role: 'assistant',
    content:
      'NodeJS is an open-source, cross-platform, server-side JavaScript runtime environment that allows developers to run JavaScript code outside of a web browser. It uses the V8 JavaScript engine from Google Chrome and provides an event-driven, non-blocking I/O model that makes it lightweight and efficient for building scalable network applications. NodeJS has a rich library of modules and is commonly used for building web servers, real-time applications, microservices, and command-line tools.',
  },
];

const TOOLS = {
  Toolbar: <Toolbar />,
  ActionMenu: <ActionMenu items={ACTION_MENU_ITEMS} />,
  LinkTool: <LinkTool asChildren={false} />,
  ChatGPT: <ChatGPT API_URL="https://path/api/chatgpt" context={initContextMessages} />,
};

const BasicExample = () => {
  const [editorValue, setEditorValue] = useState<Descendant[]>([]);
  const [mode, toggleMode] = useState<'render' | 'edit'>('edit');

  const isEdit = mode === 'edit';
  const marks = [Bold, Italic, CodeMark, Underline, Strike];

  return (
    <div className={s.container}>
      {isEdit ? (
        <YooptaEditor
          offline
          value={editorValue}
          onChange={(val: Descendant[]) => setEditorValue(val)}
          plugins={plugins}
          marks={marks}
          placeholder="Type / to open menu"
          tools={TOOLS}
        />
      ) : (
        <YooptaRenderer data={editorValue} plugins={plugins} marks={marks} />
      )}
      <pre>
        <code>{JSON.stringify(editorValue, null, 2)}</code>
      </pre>
    </div>
  );
};

export default BasicExample;

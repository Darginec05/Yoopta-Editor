import YooptaEditor from '@yoopta/editor';
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
import { useState } from 'react';
import NextImage from 'next/image';
import { MediumToolbar } from '../../components/Toolbars/MediumToolbar';

import { Descendant } from 'slate';
import { uploadToCloudinary } from '../../utils';
import { NotionActionMenu } from '../../components/SuggestionList/NotionActionMenu';
import s from './styles.module.scss';
import { NotionToolbar } from '../../components/Toolbars/NotionToolbar';

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
          autoFocus
          value={editorValue}
          onChange={(val: Descendant[]) => setEditorValue(val)}
          plugins={plugins}
          marks={marks}
          placeholder="Type / to open menu"
          tools={{
            Toolbar: <Toolbar render={NotionToolbar} />,
            ActionMenu: <ActionMenu items={actionItems} render={NotionActionMenu} />,
            ChatGPT: <ChatGPT API_URL="https://path/api/chatgpt" />,
          }}
        />
      ) : (
        <YooptaRenderer data={editorValue} plugins={plugins} marks={marks} />
      )}
    </div>
  );
};

export default BasicExample;

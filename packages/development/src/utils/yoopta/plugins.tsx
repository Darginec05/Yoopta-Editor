import Blockquote from '@yoopta/blockquote';
import Paragraph from '@yoopta/paragraph';
import Headings from '@yoopta/headings';
import Image, { ImageElementProps } from '@yoopta/image';
import Callout, { CalloutElement } from '@yoopta/callout';
import Lists, { TodoListElement } from '@yoopta/lists';
import Link from '@yoopta/link';
import Video, { VideoElementProps } from '@yoopta/video';
import File from '@yoopta/file';
import Embed from '@yoopta/embed';
import Accordion, { AccordionCommands } from '@yoopta/accordion';
import Code from '@yoopta/code';
import Table, { TableCommands } from '@yoopta/table';

import { uploadToCloudinary } from '../cloudinary';

export const YOOPTA_PLUGINS = [
  Table.extend({
    events: {
      onBeforeCreate: (editor) => {
        return editor.commands.buildTableElements({ columns: 2, rows: 2, headerRow: true });
      },
      onCreate: (editor, id) => {},
      onDestroy: (editor, id) => {},
    },
  }),
  Accordion.extend({
    events: {
      onBeforeCreate: (editor) => {
        return AccordionCommands.buildAccordionElements(editor, { items: 2, props: { isExpanded: true } });
      },
    },
    elementProps: {
      'accordion-list-item': (props) => {
        return {
          ...props,
          isExpanded: true,
        };
      },
    },
  }),
  File.extend({
    events: {
      onBeforeCreate: (editor) => {
        return editor.commands.buildFileElements({ text: 'Hello world' });
      },
    },
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
    events: {
      onBeforeCreate: (editor) => {
        console.log('Paragraph onBeforeCreate', editor.commands);

        return editor.commands.buildParagraphElements({ text: 'Hello world' });
      },
      onDestroy: (editor, id) => {
        console.log('Paragraph onDestroy', editor, id);
      },
      onCreate: (editor, id) => {
        console.log('Paragraph onCreate', editor, id);
      },
    },
    options: {
      HTMLAttributes: {
        className: 'paragraph-element-extended',
      },
    },
  }),
  Image.extend({
    events: {
      onDestroy: (editor, id) => {
        console.log('Image onDestroy', editor, id);
      },
      onCreate: (editor, id) => {
        console.log('Image onCreate', editor, id);
      },
    },
    elementProps: {
      image: (props: ImageElementProps) => ({
        ...props,
        alt: 'cloudinary',
        sizes: {
          width: 500,
          height: 500,
        },
        fit: 'contain',
      }),
    },
    options: {
      maxSizes: { maxHeight: 750, maxWidth: 750 },
      HTMLAttributes: {
        className: 'image-element-extended',
      },

      onUpload: async (file: File) => {
        const data = await uploadToCloudinary(file, 'image');

        return {
          src: data.secure_url,
          sizes: {
            width: data.width,
            height: data.height,
          },
        };
      },
    },
  }),
  Headings.HeadingOne.extend({
    events: {
      onCreate: (editor, id) => {
        console.log('HeadingOne onCreate', editor, id);
      },
      onDestroy: (editor, id) => {
        console.log('HeadingOne onDestroy', editor, id);
      },
    },
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
    elementProps: {
      callout: (props: CalloutElement['props']) => ({
        ...props,
        theme: 'info',
      }),
    },
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
  Lists.TodoList.extend({
    elementProps: {
      'todo-list': (props: TodoListElement['props']) => ({
        ...props,
        checked: true,
      }),
    },
  }),
  Embed,
  Video.extend({
    elementProps: {
      video: (props: VideoElementProps) => ({
        ...props,
        fit: 'contain',
        settings: {
          controls: true,
          loop: true,
          muted: true,
          playsInline: true,
        },
      }),
    },
    options: {
      HTMLAttributes: {
        className: 'video-element-extended',
      },
      onUploadPoster: async (file: File) => {
        const data = await uploadToCloudinary(file, 'image');
        return data.secure_url;
      },
      onUpload: async (file: File) => {
        const data = await uploadToCloudinary(file, 'video');
        return {
          src: data.secure_url,
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
    elementProps: {
      link: (props) => ({
        ...props,
        target: '_blank',
        rel: 'noopener noreferrer',
      }),
    },
    options: {
      HTMLAttributes: {
        className: 'link-element',
      },
    },
  }),
  Code.extend({
    elementProps: {
      code: (props) => ({
        ...props,
        language: 'javascript',
        theme: 'GithubDark',
      }),
    },
  }),
] as const;

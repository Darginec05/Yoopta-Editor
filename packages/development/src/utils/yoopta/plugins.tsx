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
import AccordionPlugin from '@yoopta/accordion';
import Code from '@yoopta/code';

import NextLink from 'next/link';
import { uploadToCloudinary } from '../cloudinary';
import { Elements, PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { YooptaWithNextImage } from '../../components/Extends/Image/Image';
import { Checkbox } from '../../components/Extends/Checkbox/Checkbox';
import { AccordionListItemProps } from '@yoopta/accordion/dist/types';

export const YOOPTA_PLUGINS = [
  AccordionPlugin.extend({
    defaultProps: {
      'accordion-list-item': (props: AccordionListItemProps) => {
        return {
          ...props,
          isExpanded: false,
        };
      },
    },
    renders: {
      'accordion-list': ({ attributes, children }: PluginElementRenderProps) => {
        return (
          <ul {...attributes} className="accordion-list-element-extended">
            {children}
          </ul>
        );
      },
      'accordion-list-item': ({ attributes, children, element, blockId }: PluginElementRenderProps) => {
        return (
          <li {...attributes} className="accordion-list-item-element-extended border-b">
            {children}
          </li>
        );
      },
    },
  }),
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
    defaultProps: {
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
          alt: 'cloudinary',
          // fit: 'fill',
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
    defaultProps: {
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
    defaultProps: {
      'todo-list': (props: TodoListElement['props']) => ({
        ...props,
        checked: true,
      }),
    },
  }),
  Embed,
  Video.extend({
    props: {
      video: (defaultProps: VideoElementProps) => ({
        ...defaultProps,
        controls: true,
        loop: true,
        muted: true,
        playsInline: true,
      }),
    },
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
    defaultProps: {
      link: (props) => ({
        ...props,
        target: '_blank',
        rel: 'noopener noreferrer',
      }),
    },
    renders: {
      link: ({ attributes, children, element }) => {
        if (element.props.target === '_blank') {
          return (
            <a
              {...attributes}
              className="link-element-extended text-blue-500 hover:underline"
              href={element.props.url}
              target={element.props.target}
              rel={element.props.rel}
            >
              {children}
            </a>
          );
        }

        return (
          <NextLink
            {...attributes}
            data-key={element.id}
            className="link-element-extended text-blue-500 hover:underline cursor-pointer"
            href={element.props.url}
            data-next-link
          >
            {children}
          </NextLink>
        );
      },
    },
    options: {
      HTMLAttributes: {
        className: 'link-element',
      },
    },
  }),
  Code.extend({
    defaultProps: {
      code: (props) => ({
        ...props,
        language: 'php',
        theme: 'Dracula',
      }),
    },
  }),
];

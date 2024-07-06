import Blockquote from '@yoopta/blockquote';
import Paragraph from '@yoopta/paragraph';
import Headings from '@yoopta/headings';
import Image from '@yoopta/image';
import Callout from '@yoopta/callout';
import Lists from '@yoopta/lists';
import Link from '@yoopta/link';
import Video from '@yoopta/video';
import File from '@yoopta/file';
import Embed from '@yoopta/embed';
import AccordionPlugin from '@yoopta/accordion';
import Code from '@yoopta/code';

import NextLink from 'next/link';
import { uploadToCloudinary } from '../cloudinary';
import { Elements, useYooptaEditor } from '@yoopta/editor';
import { YooptaWithNextImage } from '../../components/Extends/Image/Image';
import { Checkbox } from '../../components/Extends/Checkbox/Checkbox';

export const YOOPTA_PLUGINS = [
  AccordionPlugin,
  File.extend({
    renders: {
      file: ({ attributes, children, element }) => {
        return (
          <div {...attributes} contentEditable={false}>
            <a className="file-element-extended text-[red]" href={element.props.src} download>
              {element.props.name} ({element.props.size}) {element.props.format}
            </a>
            {children}
          </div>
        );
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
    options: {
      HTMLAttributes: {
        className: 'paragraph-element-extended',
      },
    },
  }),
  Image.extend({
    renders: {
      image: YooptaWithNextImage,
    },
    options: {
      maxSizes: { maxHeight: 750, maxWidth: 750 },
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
    renders: {
      'heading-one': ({ attributes, children, element, blockId }) => {
        return (
          <h1 {...attributes} className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {children}
          </h1>
        );
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
    renders: {
      blockquote: ({ attributes, children }) => {
        return (
          <blockquote {...attributes} className="blockquote-element-extended text-gray-500">
            {children}
          </blockquote>
        );
      },
    },
    options: {
      HTMLAttributes: {
        className: 'blockquote-element-extended',
      },
    },
  }),
  Callout.extend({
    renders: {
      callout: ({ attributes, children }) => {
        return (
          <div {...attributes} className="callout-element-extended bg-gray-100 p-4">
            {children}
          </div>
        );
      },
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
    renders: {
      'todo-list': ({ attributes, children, element, blockId }) => {
        const editor = useYooptaEditor();
        const { checked = false } = element.props;
        const style = {
          textDecoration: checked ? 'line-through' : 'none',
        };

        const onCheckedChange = (isChecked: boolean) => {
          console.log('onCheckedChange', isChecked);

          Elements.updateElement(editor, blockId, { type: 'todo-list', props: { checked: isChecked } });
        };

        return (
          <Checkbox name="yoopta-extend-checkbox" checked={checked} onCheckedChange={onCheckedChange}>
            {children}
          </Checkbox>
        );
      },
    },
  }),
  Embed,
  Video.extend({
    renders: {
      video: ({ attributes, children, element }) => {
        return (
          <div {...attributes} contentEditable={false}>
            <video
              src={element.props.src}
              width={element.props.sizes.width}
              height={element.props.sizes.height}
              poster={element.props.poster}
              className="video-element-extended"
              controls
              playsInline
              preload="metadata"
            />
            {children}
          </div>
        );
      },
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
    renders: {
      link: ({ attributes, children, element }) => {
        return (
          <NextLink
            {...attributes}
            data-key={element.id}
            className="link-element-extended text-blue-500 hover:underline"
            href={element.props.url}
            target={element.props.target}
            rel={element.props.rel}
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
  Code,
];

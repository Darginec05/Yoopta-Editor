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

import NextImage from 'next/image';
import NextLink from 'next/link';
import { uploadToCloudinary } from '../cloudinary';
import { useBlockData } from '@yoopta/editor';

export const YOOPTA_PLUGINS = [
  AccordionPlugin,
  File.extend({
    renders: {
      file: ({ attributes, children, element }) => {
        return (
          <div {...attributes} contentEditable={false}>
            <a className="file-element-extended" href={element.props.src} download>
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
    renders: {
      paragraph: ({ attributes, children }) => {
        return (
          <p {...attributes} className="leading-7 [&:not(:first-child)]:mt-6">
            {children}
          </p>
        );
      },
    },
    options: {
      HTMLAttributes: {
        className: 'paragraph-element-extended',
      },
    },
  }),
  Image.extend({
    renders: {
      image: (props) => {
        const { attributes, children, element, blockId } = props;
        const block = useBlockData(blockId);
        const isFill = element.props.fit === 'fill';
        const imageProps = {
          fill: isFill,
          style: {
            objectFit: isFill ? 'cover' : 'contain',
          },
        };

        if (!imageProps.fill) {
          imageProps.width = element.props.sizes.width;
          imageProps.height = element.props.sizes.height;
        }

        return (
          <div {...imageProps} contentEditable={false}>
            <NextImage
              draggable={false}
              src={element.props.src}
              alt={element.props.alt}
              priority={block.meta.order === 0}
              objectFit={element.props.fit}
              {...imageProps}
            />
            {children}
          </div>
        );
      },
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
    options: {
      HTMLAttributes: {
        className: 'blockquote-element-extended',
      },
    },
  }),
  Callout.extend({
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
  Lists.TodoList,
  Embed,
  Video.extend({
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

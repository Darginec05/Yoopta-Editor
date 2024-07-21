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
  AccordionPlugin.extend({
    renders: {
      'accordion-list': ({ attributes, children }) => {
        return (
          <ul {...attributes} className="accordion-list-element-extended">
            {children}
          </ul>
        );
      },
      'accordion-list-item': ({ attributes, children, element, blockId }) => {
        return (
          <li {...attributes} className="accordion-list-item-element-extended">
            {children}
          </li>
        );
      },
    },
  }),
  File.extend({
    // renders: {
    //   file: ({ attributes, children, element }) => {
    //     return (
    //       <div {...attributes} contentEditable={false}>
    //         <a className="file-element-extended text-[red]" href={element.props.src} download>
    //           {element.props.name} ({element.props.size}) {element.props.format}
    //         </a>
    //         {children}
    //       </div>
    //     );
    //   },
    // },
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
    // renders: {
    //   image: YooptaWithNextImage,
    // },
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
  Code,
];

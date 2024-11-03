import Paragraph from '@yoopta/paragraph';
import Blockquote from '@yoopta/blockquote';
import Embed from '@yoopta/embed';
import Image from '@yoopta/image';
import Link from '@yoopta/link';
import Callout from '@yoopta/callout';
import Video from '@yoopta/video';
import File from '@yoopta/file';
import Accordion from '@yoopta/accordion';
import { NumberedList, BulletedList, TodoList } from '@yoopta/lists';
import { HeadingOne, HeadingThree, HeadingTwo } from '@yoopta/headings';
import Table from '@yoopta/table';
import Code from '@yoopta/code';
import Divider from '@yoopta/divider';
import { MediaUploadsFn } from './types';

type PluginParams = {
  media?: MediaUploadsFn;
};

export const getPlugins = ({ media }: PluginParams) => {
  return [
    Paragraph,
    Accordion,
    HeadingOne,
    HeadingTwo,
    HeadingThree,
    Blockquote,
    Callout,
    NumberedList,
    BulletedList,
    TodoList,
    Code,
    Link,
    Embed,
    Table,
    Divider,
    Image.extend({
      options: {
        async onUpload(file) {
          if (!media?.imageUpload) {
            throw new Error('Image upload function is not provided');
          }

          const data = await media?.imageUpload(file);
          return data;
        },
        maxSizes: {
          maxWidth: 650,
          maxHeight: 650,
        },
      },
    }),
    Video.extend({
      options: {
        onUpload: async (file) => {
          if (!media?.videoUpload) {
            throw new Error('Image upload function is not provided');
          }

          const data = await media?.videoUpload(file);
          return data;
        },
        maxSizes: {
          maxWidth: 650,
          maxHeight: 650,
        },
      },
    }),
    File.extend({
      options: {
        onUpload: async (file) => {
          if (!media?.fileUpload) {
            throw new Error('Image upload function is not provided');
          }

          const data = await media?.fileUpload(file);
          return data;
        },
      },
    }),
  ];
};

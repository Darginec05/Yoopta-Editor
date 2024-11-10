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
import Table, { TableCommands } from '@yoopta/table';
import Code from '@yoopta/code';
import Divider from '@yoopta/divider';
import { MediaUploadsFn } from './types';
import { ButtonPlugin } from '../components/plugins/Button/Button';

type PluginParams = {
  media?: MediaUploadsFn;
  sizes?: Sizes;
};

type Sizes = {
  width?: number | string;
  height?: number | string;
};

export const getPlugins = ({ media, sizes }: PluginParams) => {
  return [
    Paragraph,
    Accordion,
    HeadingOne,
    HeadingTwo,
    HeadingThree,
    Blockquote,
    Callout,
    ButtonPlugin,
    NumberedList,
    BulletedList,
    TodoList,
    Code,
    Link,
    Embed,
    Table.extend({
      events: {
        onBeforeCreate(editor) {
          return TableCommands.buildTableElements(editor, { rows: 3, columns: 2 });
        },
      },
    }),
    Divider,
    Image.extend({
      options: {
        async onUpload(file) {
          if (!media?.image?.upload) {
            throw new Error('Image upload function is not provided');
          }

          const data = await media.image.upload(file);
          return data;
        },
        maxSizes: {
          maxWidth: sizes?.width || 600,
          maxHeight: sizes?.height || 600,
        },
      },
    }),
    Video.extend({
      options: {
        onUploadPoster(file) {
          if (!media?.video?.uploadPoster) {
            throw new Error('Image upload function is not provided');
          }

          const data = media.video.uploadPoster(file);
          return data;
        },
        onUpload: async (file) => {
          if (!media?.video?.upload) {
            throw new Error('Image upload function is not provided');
          }

          const data = await media?.video.upload(file);
          return data;
        },
        maxSizes: {
          maxWidth: sizes?.width || 600,
          maxHeight: sizes?.height || 600,
        },
      },
    }),
    File.extend({
      options: {
        onUpload: async (file) => {
          if (!media?.file?.upload) {
            throw new Error('Image upload function is not provided');
          }

          const data = await media?.file.upload(file);
          return data;
        },
      },
    }),
  ];
};

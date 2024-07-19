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
import Code from '@yoopta/code';
import { type MediaUploadsFn } from '../components/StarterKit/StarterKit';

type PluginParams = {
  mediaUploadsFn: MediaUploadsFn;
};

export const getPlugins = ({ mediaUploadsFn }: PluginParams) => {
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
    Image.extend({
      options: {
        async onUpload(file) {
          if (!mediaUploadsFn?.image) {
            throw new Error('Image upload function is not provided');
          }

          const data = await mediaUploadsFn?.image(file);
          return data;
        },
      },
    }),
    Video.extend({
      options: {
        onUpload: async (file) => {
          if (!mediaUploadsFn?.video) {
            throw new Error('Image upload function is not provided');
          }

          const data = await mediaUploadsFn?.video(file);
          return data;
        },
      },
    }),
    File.extend({
      options: {
        onUpload: async (file) => {
          if (!mediaUploadsFn?.file) {
            throw new Error('Image upload function is not provided');
          }

          const data = await mediaUploadsFn?.file(file);
          return data;
        },
      },
    }),
  ];
};

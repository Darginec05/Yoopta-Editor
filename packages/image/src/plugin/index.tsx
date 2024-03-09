import { YooptaPlugin } from '@yoopta/editor';
import { ImageElementProps, ImagePluginElements, ImagePluginOptions } from '../types';
import { ImageRender } from '../ui/Image';

const Image = new YooptaPlugin<ImagePluginElements, ImageElementProps, ImagePluginOptions>({
  type: 'Image',
  elements: {
    // [TODO] - caption element??,
    image: {
      render: ImageRender,
      props: {
        src: null,
        alt: null,
        srcSet: null,
        bgColor: null,
        fit: 'contain',
        sizes: { width: 650, height: 500 },
        nodeType: 'void',
      },
    },
  },
  options: {
    displayLabel: 'Image',
    onUpload: () => Promise.resolve({ src: null, alt: null }),
    accept: 'image/png, image/jpeg, image/gif, image/webp',
    maxSizes: { maxWidth: 650, maxHeight: 550 },
    // optimizations: {
    //   deviceSizes: [320, 420, 768, 1024, 1200, 1600],
    // },
  },
});

export { Image };

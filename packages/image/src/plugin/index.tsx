import { YooptaPlugin } from '@yoopta/editor';
import { ImageElementProps, ImagePluginElements, ImagePluginOptions } from '../types';
import { ImageRender } from '../ui/Image';

// YooptaPlugin
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
        fit: 'cover',
        sizes: { width: 650, height: 400, maxWidth: 650, maxHeight: 400 },
        nodeType: 'void',
      },
    },
  },
  options: {
    displayLabel: 'Image',
    onUpload: () => Promise.resolve({ src: null, alt: null }),
    deviceSizes: [320, 420, 768, 1024, 1200, 1600],
    accept: 'image/png, image/jpeg, image/gif, image/webp',
  },
});

// Image.extend({ deviceSizes: [768, 1024, 1200] })

export { Image };

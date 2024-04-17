import { buildBlockData, generateId, YooptaPlugin } from '@yoopta/editor';
import { ImageElementProps, ImagePluginElements, ImagePluginOptions } from '../types';
import { ImageRender } from '../ui/Image';

// [TODO] - caption element??,
const Image = new YooptaPlugin<ImagePluginElements, ImageElementProps, ImagePluginOptions>({
  type: 'Image',
  elements: {
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
    display: {
      title: 'Image',
      description: 'Upload from device or embed with link',
    },
    onUpload: () => Promise.resolve({ src: null, alt: null }),
    accept: 'image/png, image/jpeg, image/gif, image/webp',
    maxSizes: { maxWidth: 650, maxHeight: 550 },
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['IMG'],
        parse: (el) => {
          if (el.nodeName === 'IMG') {
            const props = {
              src: el.getAttribute('src') || '',
              alt: el.getAttribute('alt') || '',
              srcSet: el.getAttribute('srcset') || '',
              sizes: {
                width: el.getAttribute('width') ? parseInt(el.getAttribute('width') || '650', 10) : 650,
                height: el.getAttribute('height') ? parseInt(el.getAttribute('height') || '500', 10) : 500,
              },
            };

            const node = {
              id: generateId(),
              type: 'image',
              children: [{ text: '' }],
              props,
            };

            return node;
          }
        },
      },
    },
  },
});

export { Image };

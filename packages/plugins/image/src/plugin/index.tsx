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
          console.log('el.nodeName', el.nodeName);

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

            console.log('props', props);

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
      serialize: (element, text) => {
        return `<div style="display: flex; width: 100%; justify-content: center">
        <img src="${element.props.src}" alt="${element.props.alt}" width="${element.props.sizes.width}" height="${element.props.sizes.height}"  />
        </div>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `![${element.props.alt}](${element.props.src})\n`;
      },
    },
  },
});

export { Image };

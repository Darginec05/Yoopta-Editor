import { generateId, SlateElement, YooptaPlugin } from '@yoopta/editor';
import { ImageCommands } from '../commands';
import { ImageElementMap, ImageElementProps, ImagePluginElements, ImagePluginOptions } from '../types';
import { ImageRender } from '../ui/Image';

const ALIGNS_TO_JUSTIFY = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

// [TODO] - caption element??,
const Image = new YooptaPlugin<ImageElementMap, ImagePluginOptions>({
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
  commands: ImageCommands,
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
            const props: SlateElement<'image', ImageElementProps>['props'] = {
              nodeType: 'void',
              src: el.getAttribute('src') || '',
              alt: el.getAttribute('alt') || '',
              srcSet: el.getAttribute('srcset') || '',
              fit: (el.getAttribute('objectFit') || 'contain') as ImageElementProps['fit'],
              sizes: {
                width: el.getAttribute('width') ? parseInt(el.getAttribute('width') || '650', 10) : 650,
                height: el.getAttribute('height') ? parseInt(el.getAttribute('height') || '500', 10) : 500,
              },
            };

            const node: SlateElement = {
              id: generateId(),
              type: 'image',
              children: [{ text: '' }],
              props,
            };

            return node;
          }
        },
      },
      serialize: (element, text, blockMeta) => {
        const { align = 'center', depth = 0 } = blockMeta || {};
        const justify = ALIGNS_TO_JUSTIFY[align] || 'center';

        return `<div style="margin-left: ${depth}px; display: flex; width: 100%; justify-content: "${justify}"">
        <img data-meta-align="${align}" data-meta-depth="${depth}" src="${element.props.src}" alt="${element.props.alt}" width="${element.props.sizes.width}" height="${element.props.sizes.height}" objectFit="${element.props.fit}"></img>
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

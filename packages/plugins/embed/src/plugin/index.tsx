import { generateId, YooptaPlugin } from '@yoopta/editor';
import { EmbedElementProps, EmbedPluginElements, EmbedPluginOptions } from '../types';
import { EmbedRender } from '../ui/Embed';

const Embed = new YooptaPlugin<EmbedPluginElements, EmbedElementProps, EmbedPluginOptions>({
  type: 'Embed',
  elements: {
    embed: {
      render: EmbedRender,
      props: {
        sizes: { width: 650, height: 400 },
        nodeType: 'void',
      },
    },
  },
  options: {
    display: {
      title: 'Embed',
      description: 'For embed videos, google maps and more',
    },
    maxSizes: { maxWidth: 650, maxHeight: 550 },
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['IFRAME'],
        parse: (el) => {
          if (el.nodeName === 'IFRAME') {
            const url = new URL(el.getAttribute('src') || '');

            return {
              id: generateId(),
              type: 'embed',
              children: [{ text: '' }],
              props: {
                provider: {
                  id: url.href,
                  type: url.hostname,
                  url: url.href,
                },
                sizes: {
                  width: el.getAttribute('width') ? parseInt(el.getAttribute('width') || '650', 10) : 650,
                  height: el.getAttribute('height') ? parseInt(el.getAttribute('height') || '400', 10) : 400,
                },
              },
            };
          }
        },
      },
    },
  },
});

export { Embed };

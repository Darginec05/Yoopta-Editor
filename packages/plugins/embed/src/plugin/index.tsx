import { generateId, YooptaPlugin } from '@yoopta/editor';
import { EmbedElementProps, EmbedPluginElements, EmbedPluginOptions, EmbedProviderTypes } from '../types';
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
      serialize: (element, text) => {
        const URL_BUILDERS = {
          youtube: (id: string) => `https://www.youtube.com/embed/${id}`,
          vimeo: (id: string) => `https://player.vimeo.com/embed/${id}`,
          dailymotion: (id: string) => `https://www.dailymotion.com/embed/embed/${id}`,
          figma: (id: string) => `https://www.figma.com/embed?embed_host=share&url=${id}`,
        };

        let url = element.props.provider.url;

        if (URL_BUILDERS[element.props.provider.type]) {
          url = URL_BUILDERS[element.props.provider.type](element.props.provider.id);
        }

        return `<div style="display: flex; width: 100%; justify-content: center">
        <iframe src="${url}" width="${element.props.sizes.width}" height="${element.props.sizes.height}"  /> </div>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `![${element.props.provider.type}](${element.props.provider.url})\n`;
      },
    },
  },
});

export { Embed };

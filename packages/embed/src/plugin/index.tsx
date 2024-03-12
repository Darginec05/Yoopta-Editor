import { YooptaPlugin } from '@yoopta/editor';
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
    displayLabel: 'Embed',
    maxSizes: { maxWidth: 650, maxHeight: 550 },
    // optimizations: {
    //   deviceSizes: [320, 420, 768, 1024, 1200, 1600],
    // },
  },
});

export { Embed };

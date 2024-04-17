import { YooptaPlugin } from '@yoopta/editor';
import { MentionElementProps, PluginElementKeys } from '../types';
import { MentionRender } from '../ui/MentionRender';

const Mention = new YooptaPlugin<PluginElementKeys, MentionElementProps>({
  type: 'MentionPlugin',
  elements: {
    mention: {
      render: MentionRender,
      props: {
        url: null,
        target: '_blank',
        rel: 'noreferrer',
        character: null,
        nodeType: 'inlineVoid',
      },
    },
  },
});

export { Mention };

import { YooptaPlugin } from '@yoopta/editor';
import { MentionElementProps, PluginElementKeys } from '../types';
import { MentionRender } from '../ui/MentionRender';

const Mention = new YooptaPlugin<PluginElementKeys, MentionElementProps>({
  type: 'MentionPlugin',
  elements: {
    mention: {
      render: MentionRender,
      props: {
        initialMentions: null,
        fetchMentions: () => null,
      },
    },
  },
});

export { Mention };

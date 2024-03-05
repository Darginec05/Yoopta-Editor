import { YooptaPlugin } from '@yoopta/editor';
import { MentionRender } from '../ui/MentionRender';

type Mention = {
  url: string | null;
  target?: string;
  rel?: string;
  character: string | null;
};

const Mention = new YooptaPlugin<Mention>({
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

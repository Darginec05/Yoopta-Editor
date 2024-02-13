import { createYooptaPlugin } from '@yoopta/editor';
import { LinkRender } from '../ui/LinkRender';

type LinkElementProps = {
  url: string | null;
  target?: string;
  rel?: string;
};

const Link = createYooptaPlugin<LinkElementProps>({
  type: 'LinkPlugin',
  elements: {
    link: {
      render: LinkRender,
      elementProps: {
        url: null,
        target: '_blank',
        rel: 'noreferrer',
      },
      options: {
        nodeType: 'inline',
      },
    },
  },
});

export { Link };

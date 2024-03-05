import { YooptaPlugin } from '@yoopta/editor';
import { LinkRender } from '../ui/LinkRender';

type LinkElementProps = {
  url: string | null;
  target?: string;
  rel?: string;
};

const Link = new YooptaPlugin<LinkElementProps>({
  type: 'LinkPlugin',
  elements: {
    link: {
      render: LinkRender,
      props: {
        url: null,
        target: '_blank',
        rel: 'noreferrer',
        nodeType: 'inline',
      },
    },
  },
  options: {
    displayLabel: 'Link',
  },
});

export { Link };

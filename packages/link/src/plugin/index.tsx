import { YooptaPlugin } from '@yoopta/editor';
import { LinkElementProps, LinkPluginElementKeys } from '../types';
import { LinkRender } from '../ui/LinkRender';

const Link = new YooptaPlugin<LinkPluginElementKeys, LinkElementProps>({
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

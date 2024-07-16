import { generateId, YooptaPlugin } from '@yoopta/editor';
import { LinkElementProps, LinkPluginElementKeys } from '../types';
import { LinkRender } from '../ui/LinkRender';

const Link = new YooptaPlugin<LinkPluginElementKeys, LinkElementProps>({
  type: 'LinkPlugin',
  elements: {
    link: {
      render: LinkRender,
      props: {
        url: null,
        target: '_self',
        rel: 'noopener noreferrer',
        nodeType: 'inline',
        title: null,
      },
    },
  },
  options: {
    display: {
      title: 'Link',
      description: 'Create link',
    },
  },
  parsers: {
    html: {
      serialize: (element, text) => {
        const { url, target, rel, title } = element.props;
        return `<a href="${url}" target="${target}" rel="${rel}">${title || text}</a>`;
      },
      deserialize: {
        nodeNames: ['A'],
        parse: (el) => {
          if (el.nodeName === 'A') {
            const href = el.getAttribute('href') || '';
            const target = el.getAttribute('target') || '';
            const rel = el.getAttribute('rel') || '';
            const title = el.textContent || '';
            const props: LinkElementProps = {
              url: href,
              target,
              rel,
              title,
              nodeType: 'inline',
            };

            return {
              id: generateId(),
              type: 'link',
              props,
              children: [{ text: title }],
            };
          }
        },
      },
    },
  },
});

export { Link };

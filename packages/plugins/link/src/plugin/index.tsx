import { generateId, YooptaPlugin } from '@yoopta/editor';
import { LinkCommands } from '../commands';
import { LinkElementMap, LinkElementProps } from '../types';
import { LinkRender } from '../ui/LinkRender';

const Link = new YooptaPlugin<LinkElementMap>({
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
  commands: LinkCommands,
  parsers: {
    html: {
      serialize: (element, text) => {
        const { url, target, rel, title } = element.props;
        return `<a href="${url}" target="${target}" rel="${rel}">${title || text}</a>`;
      },
      deserialize: {
        nodeNames: ['A'],
        parse: (el, editor) => {
          if (el.nodeName === 'A') {
            const href = el.getAttribute('href') || '';

            const defaultLinkProps = editor.plugins.LinkPlugin.elements.link.props as LinkElementProps;

            // [TODO] Add target
            const target = el.getAttribute('target') || defaultLinkProps.target;
            const rel = el.getAttribute('rel') || defaultLinkProps.rel;
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

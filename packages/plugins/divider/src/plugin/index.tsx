import { generateId, YooptaPlugin } from '@yoopta/editor';
import { DividerCommands } from '../commands';
import { onKeyDown } from '../events/onKeyDown';
import { DividerElementMap } from '../types';
import { DividerRender } from '../elements/Divider';

const Divider = new YooptaPlugin<DividerElementMap>({
  type: 'Divider',
  elements: {
    divider: {
      render: DividerRender,
      props: {
        nodeType: 'void',
        theme: 'solid',
        color: '#EFEFEE',
      },
    },
  },
  options: {
    display: {
      title: 'Divider',
      description: 'Divide your blocks',
    },
    shortcuts: ['---', 'divider', 'line'],
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['HR'],
        parse: (el) => {
          const theme = el.getAttribute('data-meta-theme') || 'solid';
          const color = el.getAttribute('data-meta-color') || '#EFEFEE';

          return {
            id: generateId(),
            type: 'divider',
            props: {
              nodeType: 'void',
              theme,
              color,
            },
            children: [{ text: '' }],
          };
        },
      },
      serialize: (element, text, blockMeta) => {
        const { theme = 'solid', color = '#EFEFEE' } = element.props || {};
        return `<hr data-meta-theme="${theme}" data-meta-color="${color}" style="background-color: #8383e0; height: 1.2px" />`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return '---\n';
      },
    },
  },
  commands: DividerCommands,
  events: {
    onKeyDown,
  },
});

export { Divider };

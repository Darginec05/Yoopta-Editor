import { generateId, serializeTextNodes, YooptaPlugin } from '@yoopta/editor';
import { DividerCommands } from '../commands';
import { onKeyDown } from '../events/onKeyDown';
import { DividerElementMap } from '../types';
import { DividerRender } from '../ui/Divider';

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
        return `<hr data-meta-theme="${theme}" data-meta-color="${color}" />`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return '---\n';
      },
    },
    // html: {
    //   deserialize: {
    //     nodeNames: ['P'],
    //   },
    //   serialize: (element, text, blockMeta) => {
    //     const { align = 'left', depth = 0 } = blockMeta || {};
    //     return `<p data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${depth}px; text-align: ${align}">${serializeTextNodes(
    //       element.children,
    //     )}</p>`;
    //   },
    // },
    // markdown: {
    //   serialize: (element, text) => {
    //     return `${text}\n`;
    //   },
    // },
  },
  commands: DividerCommands,
  events: {
    onKeyDown,
  },
});

export { Divider };

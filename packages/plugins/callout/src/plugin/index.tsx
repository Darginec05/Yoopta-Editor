import {
  deserializeTextNodes,
  generateId,
  serializeTextNodes,
  serializeTextNodesIntoMarkdown,
  YooptaPlugin,
} from '@yoopta/editor';
import { CSSProperties } from 'react';
import { CalloutCommands } from '../commands';
import { CalloutElementMap, CalloutTheme } from '../types';
import { CalloutRender } from '../ui/Callout';
import { CALLOUT_THEME_STYLES } from '../utils';

const Callout = new YooptaPlugin<CalloutElementMap>({
  type: 'Callout',
  elements: {
    callout: {
      render: CalloutRender,
      props: {
        theme: 'default',
      },
    },
  },
  commands: CalloutCommands,
  options: {
    display: {
      title: 'Callout',
      description: 'Make writing stand out',
    },
    shortcuts: ['<'],
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['DL'],
        parse(el, editor) {
          if (el.nodeName === 'DL' || el.nodeName === 'DIV') {
            const theme = el.getAttribute('data-theme') as CalloutTheme;

            return {
              id: generateId(),
              type: 'callout',
              children: deserializeTextNodes(editor, el.childNodes),
              props: {
                theme,
              },
            };
          }
        },
      },
      serialize: (element, text, blockMeta) => {
        const theme: CSSProperties = CALLOUT_THEME_STYLES[element.props?.theme || 'default'];
        const { align = 'left', depth = 0 } = blockMeta || {};

        return `<dl data-theme="${
          element.props?.theme || 'default'
        }" data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${
          depth * 20
        }px; text-align: ${align}; padding: .5rem .5rem .5rem 1rem; margin-top: .5rem; border-radius: .375rem; color: ${
          theme.color
        }; border-left: ${theme.borderLeft || 0}; background-color: ${theme.backgroundColor}">${serializeTextNodes(
          element.children,
        )}</dl>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `> ${serializeTextNodesIntoMarkdown(element.children)}`;
      },
    },
  },
});

export { Callout };

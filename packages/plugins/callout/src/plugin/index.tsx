import { generateId, YooptaPlugin } from '@yoopta/editor';
import { CSSProperties } from 'react';
import { CalloutElementProps, CalloutPluginElementKeys, CalloutTheme } from '../types';
import { CalloutRender } from '../ui/Callout';
import { CALLOUT_THEME_STYLES } from '../utils';

const Callout = new YooptaPlugin<CalloutPluginElementKeys, CalloutElementProps>({
  type: 'Callout',
  elements: {
    callout: {
      render: CalloutRender,
      props: {
        theme: 'default',
      },
    },
  },
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
        parse(el) {
          if (el.nodeName === 'DL' || el.nodeName === 'DIV') {
            const theme = el.getAttribute('data-theme') as CalloutTheme;

            return {
              id: generateId(),
              type: 'callout',
              children: [{ text: el.textContent || '' }],
              props: {
                theme,
              },
            };
          }
        },
      },
      serialize: (element, text) => {
        const theme: CSSProperties = CALLOUT_THEME_STYLES[element.props?.theme || 'default'];

        return `<dl data-theme="${
          element.props?.theme || 'default'
        }" style="padding: .5rem .5rem .5rem 1rem; margin-top: .5rem; border-radius: .375rem; color: ${
          theme.color
        }; border-left: ${theme.borderLeft || 0}; background-color: ${theme.backgroundColor}">${text}</dl>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `> ${text}`;
      },
    },
  },
});

export { Callout };

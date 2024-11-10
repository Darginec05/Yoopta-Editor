import {
  buildBlockData,
  deserializeTextNodes,
  generateId,
  serializeTextNodes,
  YooptaBlockData,
  YooptaPlugin,
} from '@yoopta/editor';
import { MousePointer } from 'lucide-react';
import { ButtonRender } from './ButtonRender';
import { ButtonPluginMap } from './types';
import { SIZE_STYLES_MAP, VARIANT_STYLES_MAP } from '../../ui/button';
import { styleObjectToString } from '../../../utils/styleObjectToString';

const ALIGNS_TO_JUSTIFY = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const ButtonPlugin = new YooptaPlugin<ButtonPluginMap>({
  type: 'Button',
  elements: {
    button: {
      render: ButtonRender,
      props: {
        href: '',
        color: '#fff',
        backgroundColor: '#000',
        variant: 'default',
        size: 'default',
      },
    },
  },
  options: {
    display: {
      title: 'Button',
      description: 'Add a button',
      icon: MousePointer,
    },
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['BUTTON'],
        parse: (el, editor) => {
          const align = (el.getAttribute('data-meta-align') || 'left') as YooptaBlockData['meta']['align'];
          const depth = parseInt(el.getAttribute('data-meta-depth') || '0', 10);

          return buildBlockData({
            id: generateId(),
            type: 'Button',
            value: [
              {
                id: generateId(),
                type: 'button',
                children: deserializeTextNodes(editor, el.childNodes),
                props: { nodeType: 'block' },
              },
            ],
            meta: { order: 0, depth: depth, align },
          });
        },
      },
      serialize: (element, content, blockMeta) => {
        const { align = 'left', depth = 0 } = blockMeta || {};
        const justify = ALIGNS_TO_JUSTIFY[align] || 'left';

        return `
        <div style="margin-left: ${depth * 20}px; display: flex; width: 100%; justify-content: ${justify};">
          <button type="button" data-meta-align="${align}" data-meta-depth="${depth}"">${serializeTextNodes(
          element.children,
        )}</button>
        </div>
        `;
      },
    },
    email: {
      serialize: (element, content, blockMeta) => {
        const { align = 'left', depth = 0 } = blockMeta || {};
        const size = element.props?.size || 'default';
        const variant = element.props?.variant || 'default';

        const variantStyle = VARIANT_STYLES_MAP[variant || 'default'];
        const sizeStyle = SIZE_STYLES_MAP[size || 'default'];
        const style = { ...variantStyle, ...sizeStyle };
        const styleString = styleObjectToString(style);

        return serializeEmailHtml(
          `<button type="button" data-meta-align="${align}" data-meta-depth="${depth}" style="margin-top: .5rem; margin-left: ${
            depth * 20
          }px; ${styleString}">${serializeTextNodes(element.children)}</button>`,
          align,
        );
      },
    },
  },
});

function serializeEmailHtml(content, align) {
  let alignmentStyles = '';

  switch (align) {
    case 'center':
      alignmentStyles = `
        <table width="100%" style="width: 100%">
          <tr>
            <td align="center">
              ${content}
            </td>
          </tr>
        </table>
      `;
      break;
    case 'right':
      alignmentStyles = `
        <table width="100%" style="width: 100%">
          <tr>
            <td align="right">
              ${content}
            </td>
          </tr>
        </table>
      `;
      break;
    case 'left':
    default:
      alignmentStyles = `
        <table width="100%" style="width: 100%">
          <tr>
            <td align="left">
              ${content}
            </td>
          </tr>
        </table>
      `;
      break;
  }

  return alignmentStyles;
}

export { ButtonPlugin };

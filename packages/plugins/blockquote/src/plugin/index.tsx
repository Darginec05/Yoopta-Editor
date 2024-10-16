import { serializeTextNodes, serializeTextNodesIntoMarkdown, YooptaPlugin } from '@yoopta/editor';
import { BlockquoteCommands } from '../commands';
import { BlockquoteElement } from '../types';
import { BlockquoteRender } from '../ui/Blockquote';

const Blockquote = new YooptaPlugin<Record<'blockquote', BlockquoteElement>>({
  type: 'Blockquote',
  elements: {
    blockquote: {
      render: BlockquoteRender,
    },
  },
  options: {
    display: {
      title: 'Blockquote',
      description: 'Capture quote',
    },
    shortcuts: ['>'],
  },
  commands: BlockquoteCommands,
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['BLOCKQUOTE'],
      },
      serialize: (element, text, blockMeta) => {
        const { align = 'left', depth = 0 } = blockMeta || {};
        return `<blockquote data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${depth}px; text-align: ${align}; border-left: 3px solid; color: #292929; padding: 2px 14px; margin-top: 8px;">${serializeTextNodes(
          element.children,
        )}</blockquote>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `> ${serializeTextNodesIntoMarkdown(element.children)}`;
      },
    },
    email: {
      serialize: (element, text, blockMeta) => {
        const { align = 'left', depth = 0 } = blockMeta || {};
        return `
        <table>
          <tbody>
            <tr>
              <td>
                <blockquote data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${depth}px; text-align: ${align}; border-left: 3px solid; color: #292929; padding: 2px 14px; margin-top: 8px;">${serializeTextNodes(
          element.children,
        )}</blockquote>
              </td>
            </tr>
          </tbody>
        </table>`;
      },
    },
  },
});

export { Blockquote };

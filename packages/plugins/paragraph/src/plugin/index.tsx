import { serializeTextNodes, serializeTextNodesIntoMarkdown, YooptaPlugin } from '@yoopta/editor';
import { Element, Transforms } from 'slate';
import { ParagraphCommands } from '../commands';
import { ParagraphElement, ParagraphElementMap } from '../types';
import { ParagraphRender } from '../ui/Paragraph';

const Paragraph = new YooptaPlugin<ParagraphElementMap>({
  type: 'Paragraph',
  elements: {
    paragraph: {
      render: ParagraphRender,
    },
  },
  options: {
    display: {
      title: 'Text',
      description: 'Start writing plain text.',
    },
    shortcuts: ['p', 'text'],
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['P'],
      },
      serialize: (element, text, blockMeta) => {
        const { align = 'left', depth = 0 } = blockMeta || {};
        return `<p data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${depth}px; text-align: ${align}">${serializeTextNodes(
          element.children,
        )}</p>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `${serializeTextNodesIntoMarkdown(element.children)}\n`;
      },
    },
    email: {
      serialize: (element, text, blockMeta) => {
        const { align = 'left', depth = 0 } = blockMeta || {};

        return `<table>
        <tbody>
          <tr>
            <td style="padding: 10px 0;">
              <p data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${depth}px; text-align: ${align}">${serializeTextNodes(
          element.children,
        )}</p>
            </td>
          </tr>
        </tbody>
      </table>`;
      },
    },
  },
  commands: ParagraphCommands,
});

export { Paragraph };

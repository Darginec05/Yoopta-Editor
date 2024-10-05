import {
  PluginElementRenderProps,
  serializeTextNodes,
  serializeTextNodesIntoMarkdown,
  YooptaPlugin,
} from '@yoopta/editor';
import { HeadingTwoCommands } from '../commands';
import { HeadingTwoElement } from '../types';

const HeadingTwoRender = ({ extendRender, ...props }: PluginElementRenderProps) => {
  const { element, HTMLAttributes = {}, attributes, children } = props;
  const { className = '', ...htmlAttrs } = HTMLAttributes;

  if (extendRender) return extendRender(props);

  return (
    <h2 id={element.id} draggable={false} className={`yoopta-heading-two ${className}`} {...htmlAttrs} {...attributes}>
      {children}
    </h2>
  );
};

HeadingTwoRender.displayName = 'HeadingTwo';

const HeadingTwo = new YooptaPlugin<Record<'heading-two', HeadingTwoElement>>({
  type: 'HeadingTwo',
  elements: {
    'heading-two': {
      render: HeadingTwoRender,
      props: {
        nodeType: 'block',
      },
    },
  },
  commands: HeadingTwoCommands,
  options: {
    display: {
      title: 'Heading 2',
      description: 'Medium section heading',
    },
    shortcuts: ['h2', '##'],
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['H2'],
      },
      serialize: (element, text, blockMeta) => {
        const { depth = 0, align = 'left' } = blockMeta || {};

        return `<h2 data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${depth}px; text-align: ${align}">${serializeTextNodes(
          element.children,
        )}</h2>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `## ${serializeTextNodesIntoMarkdown(element.children)}\n`;
      },
    },
    email: {
      serialize: (element, text, blockMeta) => {
        const { depth = 0, align = 'left' } = blockMeta || {};

        return `<table>
        <tbody>
          <tr>
            <td style="padding: 10px 0;">
              <h2 data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${depth}px; text-align: ${align}">
                ${serializeTextNodes(element.children)}
              </h2>
            </td>
          </tr>
        </tbody>
      </table>`;
      },
    },
  },
});

export { HeadingTwo };

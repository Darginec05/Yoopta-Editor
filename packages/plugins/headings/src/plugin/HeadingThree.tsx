import {
  PluginElementRenderProps,
  serializeTextNodes,
  serializeTextNodesIntoMarkdown,
  YooptaPlugin,
} from '@yoopta/editor';
import { HeadingThreeCommands } from '../commands';
import { HeadingThreeElement } from '../types';

const HeadingThreeRender = ({ extendRender, ...props }: PluginElementRenderProps) => {
  const { element, HTMLAttributes = {}, attributes, children } = props;
  const { className = '', ...htmlAttrs } = HTMLAttributes;

  if (extendRender) return extendRender(props);

  return (
    <h3
      id={element.id}
      draggable={false}
      className={`yoopta-heading-three ${className}`}
      {...htmlAttrs}
      {...attributes}
    >
      {children}
    </h3>
  );
};

HeadingThreeRender.displayName = 'HeadingThree';

const HeadingThree = new YooptaPlugin<Record<'heading-three', HeadingThreeElement>>({
  type: 'HeadingThree',
  elements: {
    'heading-three': {
      render: HeadingThreeRender,
      props: {
        nodeType: 'block',
      },
    },
  },
  commands: HeadingThreeCommands,
  options: {
    display: {
      title: 'Heading 3',
      description: 'Small section heading',
    },
    shortcuts: ['h3', '###'],
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['H3'],
      },
      serialize: (element, text, blockMeta) => {
        const { depth = 0, align = 'left' } = blockMeta || {};

        return `<h3 data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${depth}px; text-align: ${align}">${serializeTextNodes(
          element.children,
        )}</h3>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `### ${serializeTextNodesIntoMarkdown(element.children)}\n`;
      },
    },
    email: {
      serialize: (element, text, blockMeta) => {
        const { depth = 0, align = 'left' } = blockMeta || {};

        return `<table>
        <tbody>
          <tr>
            <td>
              <h3 data-meta-align="${align}" data-meta-depth="${depth}" style="margin-left: ${depth}px; text-align: ${align}">
                ${serializeTextNodes(element.children)}
              </h3>
            </td>
          </tr>
        </tbody>
      </table>`;
      },
    },
  },
});

export { HeadingThree };

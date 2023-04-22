import { Text } from 'slate';
import { mergePluginTypesToMap } from './mergePlugins';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remark2react from 'remark-react';

function serializeMakdown(node, PLUGINS_MAP) {
  if (Text.isText(node)) {
    return node.text;
  }

  const children = node.children.map((n) => serializeMakdown(n, PLUGINS_MAP)).join('');
  const plugin = PLUGINS_MAP[node.type];

  const serializeFn = plugin.exports?.markdown?.serialize;

  if (typeof serializeFn === 'function') {
    return `${serializeFn(node, children)}\n`;
  }

  return `\n${children}\n`;
}

function toMarkdown(data, plugins) {
  const PLUGINS_MAP = mergePluginTypesToMap(plugins);

  const serialized = data.map((node) => serializeMakdown(node, PLUGINS_MAP)).join('');
  return serialized;
}

export const markdown = {
  serialize: toMarkdown,
  deserialize: deserializeMarkdownToSlate,
};

function deserializeMarkdownToSlate(markdown) {
  const tree = unified().use(remarkParse).parse(markdown);
  const reactOutput = remark2react({
    createElement: (type, props, children) => {
      if (typeof type === 'string') {
        return {
          type,
          props,
          children,
        };
      } else {
        return type(props);
      }
    },
  });

  const slateNodes = reactOutput.props.children;

  return convertReactToSlate(slateNodes);
}

function convertReactToSlate(nodes) {
  return nodes
    .map((node) => {
      if (node.type === 'p') {
        return deserializeParagraph(node);
      } else if (node.type === 'blockquote') {
        return deserializeBlockquote(node);
      } else if (node.type === 'ul') {
        return deserializeList(node, 'bulleted-list');
      } else if (node.type === 'ol') {
        return deserializeList(node, 'numbered-list');
      } else if (node.type === 'li') {
        return deserializeListItem(node);
      } else if (node.type === 'h1') {
        return deserializeHeader(node, 'heading-one');
      } else if (node.type === 'h2') {
        return deserializeHeader(node, 'heading-two');
      } else {
        return null;
      }
    })
    .filter((node) => node !== null);
}

function deserializeParagraph(node) {
  return {
    object: 'block',
    type: 'paragraph',
    children: deserializeText(node.props.children),
  };
}

function deserializeBlockquote(node) {
  return {
    object: 'block',
    type: 'block-quote',
    children: deserializeText(node.props.children),
  };
}

function deserializeList(node, listType) {
  return {
    object: 'block',
    type: listType,
    children: node.props.children.map((child) => deserializeListItem(child)),
  };
}

function deserializeListItem(node) {
  return {
    object: 'block',
    type: 'list-item',
    children: deserializeText(node.props.children),
  };
}

function deserializeHeader(node, headerType) {
  return {
    object: 'block',
    type: headerType,
    children: deserializeText(node.props.children),
  };
}

function deserializeText(children) {
  return children
    .map((child) => {
      if (typeof child === 'string') {
        return {
          object: 'text',
          text: child,
        };
      } else if (child.props && child.props.children) {
        return deserializeText(child.props.children);
      } else {
        return null;
      }
    })
    .flat()
    .filter((child) => child !== null);
}

import { Node, Text, Element } from 'slate';
import { mergePluginTypesToMap } from './mergePlugins';
import HTML from 'html-parse-stringify';

function serializeHtml(node, PLUGINS_MAP) {
  if (Text.isText(node)) {
    return escapeHtml(node.text);
  }

  const children = node.children.map((node) => serializeHtml(node, PLUGINS_MAP)).join('');

  switch (node.type) {
    case 'blockquote':
      return `<quote>${children}</quote>`;
    case 'bulleted-list':
      return `<ul>${children}</ul>`;
    case 'heading-one':
      return `<h1>${children}</h1>`;
    case 'heading-two':
      return `<h2>${children}</h2>`;
    case 'list-item':
      return `<li>${children}</li>`;
    case 'numbered-list':
      return `<ol>${children}</ol>`;
    case 'paragraph':
      return `<p>${children}</p>`;
    default:
      return children;
  }
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };

  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}

function serializeSlateToHtml(data, plugins) {
  const PLUGINS_MAP = mergePluginTypesToMap(plugins);
  const serialized = data.map((node) => serializeHtml(node, PLUGINS_MAP)).join('');

  return serialized;
}

export const html = {
  serialize: serializeSlateToHtml,
  deserialize: deserializeHtmlToSlate,
};

/** Deserialize */
function deserializeHtmlToSlate(html, plugins) {
  const PLUGINS_MAP = mergePluginTypesToMap(plugins);

  const dom = HTML.parse(html)[0];
  console.log('HTML.parse(html)', HTML.parse(html));
  return convertDomToSlate(dom);
}

function convertDomToSlate(dom) {
  if (dom.type === 'text') {
    return {
      object: 'text',
      text: dom.content,
    };
  } else if (dom.type === 'tag') {
    const children = dom.children.map((child) => convertDomToSlate(child)).filter((child) => child !== null);
    const attributes = {};

    switch (dom.name.toLowerCase()) {
      case 'p':
        return {
          object: 'block',
          type: 'paragraph',
          children,
        };
      case 'blockquote':
        return {
          object: 'block',
          type: 'block-quote',
          children,
        };
      case 'ul':
        return {
          object: 'block',
          type: 'bulleted-list',
          children: dom.children.map((child) => convertDomToSlate(child)).filter((child) => child !== null),
        };
      case 'ol':
        return {
          object: 'block',
          type: 'numbered-list',
          children: dom.children.map((child) => convertDomToSlate(child)).filter((child) => child !== null),
        };
      case 'li':
        return {
          object: 'block',
          type: 'list-item',
          children,
        };
      case 'h1':
        return {
          object: 'block',
          type: 'heading-one',
          children,
        };
      case 'h2':
        return {
          object: 'block',
          type: 'heading-two',
          children,
        };
      case 'h3':
        return {
          object: 'block',
          type: 'heading-three',
          children,
        };
      case 'h4':
        return {
          object: 'block',
          type: 'heading-four',
          children,
        };
      case 'h5':
        return {
          object: 'block',
          type: 'heading-five',
          children,
        };
      case 'h6':
        return {
          object: 'block',
          type: 'heading-six',
          children,
        };
      case 'a':
        return {
          object: 'inline',
          type: 'link',
          children,
          data: { href: attributes.href },
        };
      case 'strong':
        return {
          object: 'text',
          text: children.reduce((acc, child) => acc + child.text, ''),
          marks: [{ type: 'bold' }],
        };
      case 'em':
        return {
          object: 'text',
          text: children.reduce((acc, child) => acc + child.text, ''),
          marks: [{ type: 'italic' }],
        };
      case 'u':
        return {
          object: 'text',
          text: children.reduce((acc, child) => acc + child.text, ''),
          marks: [{ type: 'underline' }],
        };
      default:
        return null;
    }
  } else {
    return null;
  }
}

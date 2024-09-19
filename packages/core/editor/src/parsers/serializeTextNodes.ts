// [TODO] - Move to @yoopta/utils or @yoopta/editor/utils
// helpers for serializing text nodes when you use custom parsers in your plugins
export function serializeTextNodes(nodes: any[]): string {
  return nodes
    .map((node) => {
      if ('text' in node) {
        let text = node.text;

        if (node.bold) {
          text = `<b>${text}</b>`;
        }
        if (node.italic) {
          text = `<i>${text}</i>`;
        }
        if (node.strike) {
          text = `<s>${text}</s>`;
        }
        if (node.underline) {
          text = `<u>${text}</u>`;
        }
        if (node.code) {
          text = `<code>${text}</code>`;
        }

        return text;
      }

      if (node.type === 'link') {
        const { url, target, rel } = node.props;
        const children = serializeTextNodes(node.children);

        return `<a href="${url}" target="${target}" rel="${rel}">${children}</a>`;
      }

      return '';
    })
    .join('');
}

// [TODO] - Move to @yoopta/utils or @yoopta/editor/utils
// helpers for serializing text nodes into markdown style when you use custom parsers in your plugins
export function serializeTextNodesIntoMarkdown(nodes: any[]): string {
  return nodes
    .map((node) => {
      if ('text' in node) {
        let text = node.text;

        if (node.bold) {
          text = `**${text}**`;
        }
        if (node.italic) {
          text = `*${text}*`;
        }
        if (node.strike) {
          text = `~~${text}~~`;
        }
        if (node.underline) {
          text = `<u>${text}</u>`;
        }
        if (node.code) {
          text = `\`${text}\``;
        }

        return text;
      }

      if (node.type === 'link') {
        const { url, target, rel } = node.props;
        const children = serializeTextNodesIntoMarkdown(node.children);

        return `[${children}](${url})`;
      }

      return '';
    })
    .join('');
}

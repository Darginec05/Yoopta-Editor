import { serializeTextNodesIntoMarkdown } from '@yoopta/editor';

export function serializeMarkown(element, text) {
  let markdownTable = '';

  element.children.forEach((row, rowIndex) => {
    const rowMarkdown = row.children
      .map((cell) => {
        return ` ${serializeTextNodesIntoMarkdown(cell.children)} `;
      })
      .join('|');

    markdownTable += `|${rowMarkdown}|\n`;

    if (rowIndex === 0) {
      const separator = row.children.map(() => ' --- ').join('|');
      markdownTable += `|${separator}|\n`;
    }
  });

  return markdownTable;
}

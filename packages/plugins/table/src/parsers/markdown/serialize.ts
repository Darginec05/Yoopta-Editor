export function serializeMarkown(element, text) {
  let markdownTable = '';

  element.children.forEach((row, rowIndex) => {
    const rowMarkdown = row.children
      .map((cell) => {
        const cellText = cell.children.map((child) => child.text || ' ').join('');
        return ` ${cellText} `;
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

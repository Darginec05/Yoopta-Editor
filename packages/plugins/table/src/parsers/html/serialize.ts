import { SlateElement, YooEditor, YooptaBlockData } from '@yoopta/editor';
import { TableCellElement } from '../../types';

export function serializeTable(element: SlateElement, text: string, blockMeta?: YooptaBlockData['meta']) {
  const columns = (element.children[0] as SlateElement).children as TableCellElement[];
  const { align = 'left', depth = 0 } = blockMeta || {};

  const serialized = `<table style="margin-left: ${depth}px; text-align: ${align}" data-meta-align="${align}" data-meta-depth="${depth}" data-header-row="${
    element.props?.headerRow
  }" data-header-column="${element.props?.headerColumn}">
        <colgroup>
        ${columns
          .map((td) => {
            return `<col style="width: ${td.props?.width ? `${td.props?.width}px` : 'auto'}" />`;
          })
          .join('')}
        </colgroup>
        <tbody>${element.children
          .map((trElement) => {
            return `<tr>${trElement.children
              .map((td) => {
                const text = serializeTextNodes(td.children);
                if (td.props?.asHeader) {
                  return `<th data-width="${td.props?.width || 200}" rowspan="1" colspan="1">${text}</th>`;
                }

                return `<td data-width="${td.props?.width || 200}" rowspan="1" colspan="1">${text}</td>`;
              })
              .join('')}</tr>`;
          })
          .join('')}</tbody></table>`;

  return serialized;
}

// MOVE to common utils in @yoopta/editor
function serializeTextNodes(nodes: any[]): string {
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

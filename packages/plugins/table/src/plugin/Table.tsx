import { generateId, SlateEditor, YooEditor, YooptaPlugin } from '@yoopta/editor';
import { Table as TableRender } from '../elements/Table';
import { TableDataCell } from '../elements/TableDataCell';
import { TableRow } from '../elements/TableRow';
import { Editor, Element, Node, NodeMatch, Path, Point, Range, Transforms } from 'slate';
import { TableElementProps, TablePluginElementKeys, TableRowElement } from '../types';
import { TableTransforms } from '../api';

const Table = new YooptaPlugin<TablePluginElementKeys, any>({
  type: 'Table',
  defineInitialStructure(editor) {
    return {
      type: 'table',
      children: [
        {
          type: 'table-row',
          children: [{ type: 'table-data-cell' }, { type: 'table-data-cell' }],
        },
        {
          type: 'table-row',
          children: [{ type: 'table-data-cell' }, { type: 'table-data-cell' }],
        },
        {
          type: 'table-row',
          children: [{ type: 'table-data-cell' }, { type: 'table-data-cell' }],
        },
      ],
    };
  },
  elements: {
    table: {
      render: TableRender,
      asRoot: true,
      children: ['table-row'],
      props: {
        nodeType: 'block',
        headerRow: false,
        headerColumn: false,
      },
    },
    'table-row': {
      render: TableRow,
      children: ['table-data-cell'],
    },
    'table-data-cell': {
      render: TableDataCell,
    },
  },
  events: {
    onKeyDown(editor, slate, { hotkeys, currentBlock }) {
      return (event) => {
        if (!slate.selection) return;

        if (hotkeys.isEnter(event)) {
          event.preventDefault();
          Transforms.insertText(slate, '\n');
        }

        if (hotkeys.isBackspace(event)) {
          const parentPath = Path.parent(slate.selection.anchor.path);
          const isStart = Editor.isStart(slate, slate.selection.anchor, parentPath);

          if (isStart && Range.isCollapsed(slate.selection)) {
            event.preventDefault();
            return;
          }
        }

        if (hotkeys.isCmdEnter(event)) {
          event.preventDefault();
          TableTransforms.insertRow(editor, currentBlock.id);
        }

        if (hotkeys.isSelect(event)) {
          const tdElementEntry = Editor.above(slate, {
            match: (n) => Element.isElement(n) && n.type === 'table-data-cell',
          });

          if (tdElementEntry) {
            event.preventDefault();
            const [tdElement, tdElementPath] = tdElementEntry;
            Transforms.select(slate, tdElementPath);
          }
        }
      };
    },
  },
  extendSlate: (slate: SlateEditor, editor: YooEditor) => {
    const { deleteFragment, normalizeNode, insertText, deleteBackward, deleteForward } = slate;

    slate.normalizeNode = (entry, options) => {
      const [node, path] = entry;

      if (Element.isElement(node) && node.type === 'table') {
        const firstRow = node.children[0] as TableRowElement;
        if (node.children.length > 0 && firstRow.children.length > 0) {
          const colsCount = firstRow.children.length;

          if (!node.props?.columns || node.props?.columns?.length !== colsCount) {
            const newProps: TableElementProps = {
              ...node.props,
              columns: Array.from({ length: colsCount }, (_, i) => ({ id: i, index: i, width: 200 })),
            };

            Transforms.setNodes(slate, { props: newProps }, { at: path });
          }
        }
      }

      if (Element.isElement(node) && node.type === 'table-row') {
        for (const [child, childPath] of Node.children(slate, path)) {
          if (!Element.isElement(child) || child.type !== 'table-data-cell') {
            return Transforms.wrapNodes(
              slate,
              {
                id: generateId(),
                type: 'table-data-cell',
                children: [child],
                props: {
                  width: 200,
                },
              } as Element,
              { at: childPath },
            );
          }
        }
      }

      normalizeNode(entry, options);
    };

    return slate;
  },
  parsers: {
    html: {
      serialize: (element, text, meta) => {
        console.log('serialize table', element);

        return `<table></table>`;
      },
      deserialize: (editor, element, children) => {
        console.log('deserialize table', element);
      },
    },
  },
});

export { Table };

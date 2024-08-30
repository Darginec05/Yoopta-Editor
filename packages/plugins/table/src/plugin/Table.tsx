import { YooptaPlugin } from '@yoopta/editor';
import { Table as TableRender } from '../elements/Table';
import { TableDataCell } from '../elements/TableDataCell';
import { TableRow } from '../elements/TableRow';
import { Editor, Element, Path, Transforms } from 'slate';
import { TablePluginElementKeys } from '../types';

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
      props: {
        width: 200,
      },
    },
  },
  events: {
    onKeyDown(editor, slate, options) {
      return (event) => {
        if (!slate.selection) return;

        const elementEntry = Editor.above(slate, {
          match: (n) => Element.isElement(n),
          at: slate.selection!,
        });

        if (options.hotkeys.isEnter(event)) {
          event.preventDefault();
          Transforms.insertText(slate, '\n');
        }

        if (options.hotkeys.isBackspace(event)) {
          const parentPath = Path.parent(slate.selection.anchor.path);
          const isStart = Editor.isStart(slate, slate.selection.anchor, parentPath);
          if (isStart) {
            event.preventDefault();
            return;
          }
        }

        if (options.hotkeys.isCmdEnter(event)) {
          event.preventDefault();
          // TABLE_API.insertRow(editor, options.currentBlock.id,);
        }

        if (options.hotkeys.isSelect(event)) {
          const tdElementEntry = Editor.above(slate, {
            match: (n) => Element.isElement(n) && n.type === 'table-data-cell',
          });

          console.log('slate.selection', slate.selection);

          if (tdElementEntry) {
            event.preventDefault();
            const [tdElement, tdElementPath] = tdElementEntry;
            Transforms.select(slate, tdElementPath);
          }

          console.log('tdElementEntry', tdElementEntry);

          // event.preventDefault();
        }
      };
    },
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

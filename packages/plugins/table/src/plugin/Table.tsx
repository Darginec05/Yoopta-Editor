import { YooptaPlugin } from '@yoopta/editor';
import { Table as TableRender } from '../elements/Table';
import { TableDataCell } from '../elements/TableDataCell';
import { TableRow } from '../elements/TableRow';
import { Editor, Element, Path, Range, Transforms } from 'slate';
import { TablePluginElementKeys } from '../types';
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
      props: {
        width: 200,
      },
    },
  },
  events: {
    onKeyDown(editor, slate, { hotkeys, currentBlock }) {
      return (event) => {
        if (!slate.selection) return;

        const elementEntry = Editor.above(slate, {
          match: (n) => Element.isElement(n),
          at: slate.selection!,
        });

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

          console.log('tdElementEntry', tdElementEntry);
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

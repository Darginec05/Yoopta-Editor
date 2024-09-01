import { generateId, SlateEditor, YooEditor, YooptaPlugin } from '@yoopta/editor';
import { Table as TableRender } from '../elements/Table';
import { TableDataCell } from '../elements/TableDataCell';
import { TableRow } from '../elements/TableRow';
import { Editor, Element, Node, Path, Point, Range, Transforms } from 'slate';
import { TablePluginElementKeys } from '../types';
import { TableTransforms } from '../transforms';

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
        columns: [],
        defaultColumnWidth: 200,
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

        if (hotkeys.isShiftEnter(event)) {
          event.preventDefault();
          TableTransforms.insertColumn(editor, currentBlock.id, { select: true });
          return;
        }

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
          TableTransforms.insertRow(editor, currentBlock.id, { select: true });
          return;
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
    const { normalizeNode, deleteBackward } = slate;

    slate.deleteBackward = (unit) => {
      const { selection } = slate;

      if (!selection || Range.isExpanded(selection)) {
        return deleteBackward(unit);
      }

      const [td] = Editor.nodes(slate, {
        match: (n) => Element.isElement(n) && n.type === 'table-data-cell',
        at: selection,
      });

      const before = Editor.before(slate, selection, { unit });
      const [tdBefore] = before
        ? Editor.nodes(slate, {
            match: (n) => Element.isElement(n) && n.type === 'table-data-cell',
            at: before,
          })
        : [undefined];

      if (!td && !tdBefore) {
        return deleteBackward(unit);
      }

      if (!td && tdBefore && before) {
        return Transforms.select(slate, before);
      }

      const [, tdPath] = td;
      const start = Editor.start(slate, tdPath);

      if (Point.equals(selection.anchor, start)) {
        return;
      }

      deleteBackward(unit);
    };

    slate.normalizeNode = (entry, options) => {
      const [node, path] = entry;

      if (Element.isElement(node) && node.type === 'table-row') {
        for (const [child, childPath] of Node.children(slate, path)) {
          if (!Element.isElement(child) || child.type !== 'table-data-cell') {
            return Transforms.wrapNodes(
              slate,
              {
                id: generateId(),
                type: 'table-data-cell',
                children: [child],
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

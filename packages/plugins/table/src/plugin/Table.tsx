import { Blocks, Elements, generateId, SlateElement, YooptaPlugin } from '@yoopta/editor';
import { Table as TableRender } from '../elements/Table';
import { TableDataCell } from '../elements/TableDataCell';
import { TableRow } from '../elements/TableRow';
import { TableHeadCell } from '../elements/TableHeadCell';
import { TableHead } from '../elements/TableHead';
import { TableBody } from '../elements/TableBody';
import { TableFooter } from '../elements/TableFooter';
import { ColGroup } from '../elements/ColGroup';
import { Col } from '../elements/Col';
import { Editor, Element } from 'slate';

type TablePluginElementKeys =
  | 'table'
  | 'colgroup'
  | 'col'
  | 'table-head'
  | 'tbody'
  | 'table-foot'
  | 'table-row'
  | 'table-head-cell'
  | 'table-data-cell';

const Table = new YooptaPlugin<TablePluginElementKeys, any>({
  type: 'Table',
  defineInitialStructure(editor) {
    return {
      type: 'table',
      children: [
        {
          type: 'table-head',
          children: [
            {
              type: 'table-row',
              children: [{ type: 'table-head-cell' }, { type: 'table-head-cell' }],
            },
          ],
        },
        {
          type: 'tbody',
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
        },
      ],
    };
  },
  elements: {
    table: {
      render: TableRender,
      asRoot: true,
      children: ['table-head', 'tbody', 'table-foot', 'colgroup'],
    },
    colgroup: {
      children: ['col'],
      render: ColGroup,
    },
    col: {
      render: Col,
      props: { nodeType: 'void' },
    },
    'table-head': {
      render: TableHead,
      children: ['table-row'],
    },
    tbody: {
      render: TableBody,
      children: ['table-row'],
    },
    'table-foot': {
      render: TableFooter,
      children: ['table-row'],
    },
    'table-row': {
      render: TableRow,
      children: ['table-data-cell'],
    },
    'table-head-cell': {
      render: TableHeadCell,
    },
    'table-data-cell': {
      render: TableDataCell,
    },
  },
  events: {
    onKeyDown(editor, slate, options) {
      return (event) => {
        const element = Editor.above(slate, {
          match: (n) => Element.isElement(n),
          at: slate.selection!,
        });
        console.log('slate.selection', slate.selection);
        console.log('element', element?.[0]);

        if (options.hotkeys.isEnter(event)) {
          event.preventDefault();
        }

        if (options.hotkeys.isBackspace(event)) {
          event.preventDefault();
        }
      };
    },
  },
});

export { Table };

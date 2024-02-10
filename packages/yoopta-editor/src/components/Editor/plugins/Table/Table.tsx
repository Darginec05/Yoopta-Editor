import { createYooptaPlugin } from '../../../../plugins';

const TableRender = ({ attributes, children }) => {
  return (
    <table>
      <tbody {...attributes}>{children}</tbody>
    </table>
  );
};
const TableRowRender = ({ attributes, children }) => {
  return <tr {...attributes}>{children}</tr>;
};
const TableCellRender = ({ attributes, children }) => {
  return <td {...attributes}>{children}</td>;
};

export const Table = createYooptaPlugin({
  type: 'Table',
  elements: {
    table: {
      render: TableRender,
    },
    'table-row': {
      render: TableRowRender,
    },
    'table-cell': {
      render: TableCellRender,
    },
  },
});

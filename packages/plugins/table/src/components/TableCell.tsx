const TableCellRender = ({ attributes, children, element }) => {
  return (
    <td
      {...attributes}
      className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
    >
      {children}
    </td>
  );
};

export { TableCellRender };

const TableRowRender = ({ attributes, children, element }) => {
  return (
    <tr {...attributes} className="m-0 border-t p-0 even:bg-muted">
      {children}
    </tr>
  );
};

export { TableRowRender };

import { RenderElementProps } from 'slate-react';

const TableRender = ({ attributes, children }: RenderElementProps) => {
  return (
    <div {...attributes} className="mt-4 mb-2 w-full overflow-y-auto">
      <table>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
export { TableRender };

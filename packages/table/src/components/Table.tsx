import { RenderElementProps } from 'slate-react';

const TableRender = ({ attributes, children }: RenderElementProps) => {
  return (
    <div {...attributes} className="my-6 w-full overflow-y-auto">
      <table>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
export { TableRender };

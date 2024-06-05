import { PluginElementRenderProps } from '@yoopta/editor';

const TableRender = ({ attributes, children, element }: PluginElementRenderProps) => {
  return (
    <div {...attributes} className="mt-4 mb-2 w-full overflow-y-auto">
      <table>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
export { TableRender };

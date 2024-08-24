import { PluginElementRenderProps } from '@yoopta/editor';

const TableBody = ({ attributes, children }: PluginElementRenderProps) => (
  <table-body className="[&_tr:last-child]:border-0" {...attributes}>
    {children}
  </table-body>
);

export { TableBody };

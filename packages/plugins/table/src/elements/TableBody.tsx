import { PluginElementRenderProps } from '@yoopta/editor';

const TableBody = ({ attributes, children }: PluginElementRenderProps) => (
  <tbody className="[&_tr:last-child]:border-0" {...attributes}>
    {children}
  </tbody>
);

export { TableBody };

import { PluginElementRenderProps } from '@yoopta/editor';

const TableHead = ({ attributes, children }: PluginElementRenderProps) => (
  <thead className="[&_tr]:border-b" {...attributes}>
    {children}
  </thead>
);

export { TableHead };

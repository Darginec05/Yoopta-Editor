import { PluginElementRenderProps } from '@yoopta/editor';

const TableFooter = ({ attributes, children }: PluginElementRenderProps) => (
  <tfoot className="border-t bg-muted/50 font-medium [&>tr]:last:border-b-0" {...attributes}>
    {children}
  </tfoot>
);

export { TableFooter };

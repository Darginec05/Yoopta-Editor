import { PluginElementRenderProps } from '@yoopta/editor';

const TableRow = ({ attributes, children, element, blockId }: PluginElementRenderProps) => {
  return (
    <tr className="yoopta-table-row" data-element-id={element.id} {...attributes}>
      {children}
    </tr>
  );
};

export { TableRow };

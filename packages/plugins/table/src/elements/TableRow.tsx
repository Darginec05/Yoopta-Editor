import { PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';

const TableRow = ({ attributes, children, element }: PluginElementRenderProps) => {
  return (
    <tr className="yoopta-table-row" data-element-id={element.id} {...attributes}>
      {children}
    </tr>
  );
};

export { TableRow };

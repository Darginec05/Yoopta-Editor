import { Elements, PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { useEffect } from 'react';

const TableRow = ({ attributes, children, element, blockId }: PluginElementRenderProps) => {
  return (
    <tr className="transition-colors" {...attributes}>
      {children}
    </tr>
  );
};

export { TableRow };

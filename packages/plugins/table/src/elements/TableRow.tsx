import { PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { TABLE_ROW_TO_SELECTED_WEAK_MAP } from '../utils/weakMaps';

const TableRow = ({ attributes, children, element, blockId }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const slate = editor.blockEditorsMap[blockId];

  const isSelected = TABLE_ROW_TO_SELECTED_WEAK_MAP.get(slate)?.has(element);

  return (
    <tr
      className={`yoopta-table-row ${isSelected && 'yoopta-table-row-selected'}`}
      data-element-id={element.id}
      {...attributes}
    >
      {children}
    </tr>
  );
};

export { TableRow };

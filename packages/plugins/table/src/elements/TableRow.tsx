import { useFloating, inline, flip, shift, offset } from '@floating-ui/react';
import { PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { useState } from 'react';
import { TableRowOptions } from '../components/TableRowOptions';
import DragIcon from '../icons/drag.svg';

const TableRow = ({ attributes, children, element, blockId }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const [isTableRowActionsOpen, setIsTableRowActionsOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    placement: 'right-start',
    open: isTableRowActionsOpen,
    onOpenChange: setIsTableRowActionsOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
  });

  const onClick = () => {
    if (editor.readOnly) return;
    setIsTableRowActionsOpen(true);
  };

  const onClose = () => {
    setIsTableRowActionsOpen(false);
  };

  return (
    <tr
      data-selected={isTableRowActionsOpen}
      className="transition-colors group relative data-[selected=true]:bg-[#37352f14]"
      {...attributes}
    >
      {!editor.readOnly && (
        <div>
          {isTableRowActionsOpen && (
            <TableRowOptions
              refs={refs}
              isOpen
              onClose={onClose}
              style={floatingStyles}
              editor={editor}
              blockId={blockId}
              element={element}
            />
          )}
          <button
            ref={refs.setReference}
            type="button"
            onClick={onClick}
            contentEditable={false}
            className="yoopta-button group-hover:opacity-100 cursor-pointer select-none transition-opacity duration-[150ms] cursor-pointer opacity-0 fill-[rgba(55,53,47,0.35)] absolute flex items-center justify-center rounded-[4px] bg-white shadow-[rgba(15,15,15,0.1)_0px_0px_0px_1px,rgba(15,15,15,0.1)_0px_2px_4px] z-[4] top-[calc(50%-13px)] left-[-8px] w-[16px] h-[26px] p-[4px_2px]"
          >
            <DragIcon className="w-[14px] h-[14px] block flex-shrink-0" style={{ transform: 'rotate(0deg)' }} />
          </button>
        </div>
      )}
      {children}
    </tr>
  );
};

export { TableRow };

import { PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { useState } from 'react';
import { TableColumnOptions } from '../components/TableColumnOptions';
import { useFloating, inline, flip, shift, offset } from '@floating-ui/react';
import DragIcon from '../icons/drag.svg';

const style = {
  backgroundColor: 'rgb(247, 246, 243)',
};

const TableHeadCell = ({ attributes, children, blockId, element }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();
  const [isTableColumnActionsOpen, setIsTableColumnActionsOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
    open: isTableColumnActionsOpen,
    onOpenChange: setIsTableColumnActionsOpen,
    middleware: [inline(), flip(), shift(), offset(10)],
  });

  const onClick = () => {
    setIsTableColumnActionsOpen(true);
  };

  const onClose = () => {
    setIsTableColumnActionsOpen(false);
  };

  return (
    <th
      style={style}
      className="group relative border h-10 px-2 text-left align-middle font-medium text-muted-foreground"
    >
      {isTableColumnActionsOpen && (
        <TableColumnOptions
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
        type="button"
        ref={refs.setReference}
        onClick={onClick}
        contentEditable={false}
        className="yoopta-button group-hover:opacity-100 cursor-pointer select-none transition-opacity duration-[150ms] cursor-pointer opacity-0 fill-[rgba(55,53,47,0.35)] absolute flex items-center justify-center rounded-[4px] bg-white shadow-[rgba(15,15,15,0.1)_0px_0px_0px_1px,rgba(15,15,15,0.1)_0px_2px_4px] z-[4] top-[-8px] left-[calc(50%-13px)] h-[16px] w-[26px] p-[2px_4px]"
      >
        <DragIcon />
      </button>
      <div
        className="max-w-full w-full whitespace-pre-wrap break-words caret-[rgb(55,53,47)] p-[7px_9px] bg-transparent text-[14px] leading-[20px]"
        {...attributes}
      >
        {children}
      </div>
      <div contentEditable={false} className="absolute right-0 w-0 top-0 flex-grow-0 h-full z-[1]">
        <div className="absolute w-[3px] -ml-[1px] -mt-[1px] h-[calc(100%+2px)] transition-[background] duration-[150ms] delay-[50ms] hover:bg-[#74b6db] bg-[#2383e200] cursor-col-resize"></div>
      </div>
    </th>
  );
};

export { TableHeadCell };

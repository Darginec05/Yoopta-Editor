import { PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';

const TableDataCell = ({ attributes, children, element, blockId }: PluginElementRenderProps) => {
  const editor = useYooptaEditor();

  return (
    <td className="group text-inherit fill-current border border-[rgb(233,233,231)] relative align-top text-left min-w-[249px] max-w-[249px] min-h-[32px]">
      <div
        className="max-w-full w-full whitespace-pre-wrap break-words caret-[rgb(55,53,47)] p-[7px_9px] bg-transparent text-[14px] leading-[20px]"
        {...attributes}
      >
        {children}
      </div>
      {!editor.readOnly && (
        <div contentEditable={false} className="absolute right-0 w-0 top-0 flex-grow-0 h-full z-[1]">
          <div className="absolute w-[3px] -ml-[1px] -mt-[1px] h-[calc(100%+2px)] transition-[background] duration-[150ms] delay-[50ms] hover:bg-[#74b6db] bg-[#2383e200] cursor-col-resize"></div>
        </div>
      )}
    </td>
  );
};

export { TableDataCell };

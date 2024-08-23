import { Elements, PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import DragIcon from '../icons/drag.svg';

const TableRow = ({ attributes, children, element, blockId }: PluginElementRenderProps) => {
  return (
    <tr className="transition-colors group relative" {...attributes}>
      <div>
        <button
          type="button"
          contentEditable={false}
          className="yoopta-button group-hover:opacity-100 cursor-pointer select-none transition-opacity duration-[150ms] cursor-pointer opacity-0 fill-[rgba(55,53,47,0.35)] absolute flex items-center justify-center rounded-[4px] bg-white shadow-[rgba(15,15,15,0.1)_0px_0px_0px_1px,rgba(15,15,15,0.1)_0px_2px_4px] z-[4] top-[calc(50%-13px)] left-[-8px] w-[16px] h-[26px] p-[4px_2px]"
        >
          <DragIcon className="w-[14px] h-[14px] block flex-shrink-0" style={{ transform: 'rotate(0deg)' }} />
        </button>
      </div>
      {children}
    </tr>
  );
};

export { TableRow };

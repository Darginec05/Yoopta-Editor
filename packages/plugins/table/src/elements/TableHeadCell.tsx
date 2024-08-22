import { PluginElementRenderProps } from '@yoopta/editor';

const style = {
  backgroundColor: 'rgb(247, 246, 243)',
};

const TableHeadCell = ({ attributes, children }: PluginElementRenderProps) => (
  <th
    style={style}
    className="group relative border h-10 px-2 text-left align-middle font-medium text-muted-foreground"
  >
    <div>
      <button className="yoopta-button group-hover:opacity-100 border-[1px] select-none transition-opacity duration-150 cursor-pointer opacity-0 fill-current text-[rgba(55,53,47,0.35)] absolute flex items-center justify-center rounded-[4px] bg-white z-[4] top-[-8px] left-[calc(50%-13px)] h-[16px] w-[26px] p-[2px_4px]">
        <svg
          role="graphics-symbol"
          viewBox="0 0 10 10"
          className="w-[14px] h-[14px] block flex-shrink-0 transform rotate-90"
        >
          <path d="M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z"></path>
        </svg>
      </button>
      <div
        className="max-w-full w-full whitespace-pre-wrap break-words caret-[rgb(55,53,47)] p-[7px_9px] bg-transparent text-[14px] leading-[20px]"
        {...attributes}
      >
        {children}
      </div>
      <div className="absolute right-0 w-0 top-0 flex-grow-0 h-full z-[1]">
        <div className="absolute w-[3px] -ml-[1px] -mt-[1px] h-[calc(100%+2px)] transition-[background] duration-[150ms] delay-[50ms] hover:bg-[#74b6db] bg-[#2383e200] cursor-col-resize"></div>
      </div>
    </div>
  </th>
);

export { TableHeadCell };

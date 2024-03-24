import { PluginElementRenderProps, useBlockData, useYooptaEditor } from '@yoopta/editor';

const NumberedListRender = ({ attributes, children, blockId, element }: PluginElementRenderProps<unknown>) => {
  const renderCount = () => {
    const counter = typeof element.props?.count === 'number' ? element.props?.count : 0;
    return counter + 1;
  };

  return (
    <div
      data-element-type={element.type}
      {...attributes}
      className="flex items-center pl-4 space-x-2 py-[3px] text-[16px] relative"
    >
      <span className="min-w-[10px] w-auto select-none absolute left-0 top-[3px]" contentEditable={false}>
        {renderCount()}.
      </span>
      <span className="flex-grow">{children}</span>
    </div>
  );
};

export { NumberedListRender };

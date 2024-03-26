import { PluginElementRenderProps, useBlockData, useYooptaEditor } from '@yoopta/editor';

const NumberedListRender = ({ attributes, children, element, HTMLAttributes = {} }: PluginElementRenderProps) => {
  const { className, ...htmlAttrs } = HTMLAttributes;

  const renderCount = () => {
    const counter =
      element.type === 'numbered-list' && typeof element.props?.count === 'number' ? element.props?.count : 1;
    return counter + 1;
  };

  return (
    <div
      data-element-type={element.type}
      className={`flex items-center pl-4 space-x-2 py-[3px] text-[16px] relative ${className}`}
      {...htmlAttrs}
      {...attributes}
    >
      <span className="min-w-[10px] w-auto select-none absolute left-0 top-[3px]" contentEditable={false}>
        {renderCount()}.
      </span>
      <span className="flex-grow">{children}</span>
    </div>
  );
};

export { NumberedListRender };

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
      className={`yoo-lists-flex yoo-lists-items-center yoo-lists-pl-4 yoo-lists-space-x-2 yoo-lists-py-[1px] yoo-lists-text-[16px] yoo-lists-relative ${className}`}
      {...htmlAttrs}
      {...attributes}
    >
      <span
        className="yoo-lists-min-w-[10px] yoo-lists-w-auto yoo-lists-select-none yoo-lists-absolute yoo-lists-left-0 yoo-lists-top-[3px]"
        contentEditable={false}
      >
        {renderCount()}.
      </span>
      <span className="yoo-lists-flex-grow">{children}</span>
    </div>
  );
};

export { NumberedListRender };

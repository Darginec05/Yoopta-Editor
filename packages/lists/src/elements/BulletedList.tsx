import { PluginElementRenderProps } from '@yoopta/editor';

const BulletedListRender = ({ attributes, element, children, HTMLAttributes = {} }: PluginElementRenderProps) => {
  const { className, ...htmlAttrs } = HTMLAttributes;

  return (
    <div
      data-element-type={element.type}
      className={`flex items-center pl-4 space-x-2 py-[3px] text-[16px] leading-7 relative ${className}`}
      {...htmlAttrs}
      {...attributes}
    >
      <span className="min-w-[10px] w-auto select-none absolute left-0 top-[3px]" contentEditable={false}>
        •
      </span>
      <span className="flex-grow">{children}</span>
    </div>
  );
};

export { BulletedListRender };

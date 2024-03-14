import { PluginElementRenderProps } from '@yoopta/editor';

const BulletedListRender = ({ attributes, element, children }: PluginElementRenderProps<unknown>) => {
  return (
    <div data-element-type={element.type} className="flex items-center pl-4 space-x-2 py-[3px]" {...attributes}>
      <span className="min-w-[10px] w-auto" contentEditable={false}>
        •
      </span>
      <span className="flex-grow">{children}</span>
    </div>
  );
};

export { BulletedListRender };

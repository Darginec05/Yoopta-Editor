import { PluginElementRenderProps } from '@yoopta/editor';

const BulletedListRender = ({ attributes, element, children }: PluginElementRenderProps) => {
  const { className = '', ...attrs } = attributes;

  return (
    <div
      data-element-type={element.type}
      className={`yoo-lists-ml-[10px] yoo-lists-flex yoo-lists-items-center yoo-lists-pl-4 yoo-lists-space-x-1 yoo-lists-py-[2px] yoo-lists-text-[16px] yoo-lists-leading-7 yoo-lists-relative yoopta-bulleted-list ${className}`}
      {...attrs}
    >
      <span
        className="yoo-lists-min-w-[10px] yoo-lists-w-auto yoo-lists-select-none yoo-lists-absolute yoo-lists-left-0 yoo-lists-top-[0px] yoo-lists-font-bold"
        contentEditable={false}
      >
        •
      </span>
      <span className="yoo-lists-flex-grow yoo-lists-ml-0">{children}</span>
    </div>
  );
};

export { BulletedListRender };

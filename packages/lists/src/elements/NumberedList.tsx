import { PluginElementRenderProps, useBlockData, useYooptaEditor } from '@yoopta/editor';

const NumberedListRender = ({
  attributes,
  children,
  element,
  blockId,
  HTMLAttributes = {},
}: PluginElementRenderProps) => {
  const { className = '', ...htmlAttrs } = HTMLAttributes;
  const block = useBlockData(blockId);
  const editor = useYooptaEditor();

  const index = Object.keys(editor.children)
    .filter((key) => {
      const childrenBlock = editor.children[key];
      return childrenBlock.meta.depth === block.meta.depth && childrenBlock.type === 'NumberedList';
    })
    .findIndex((key) => key === blockId);

  const count = index + 1;

  return (
    <div
      data-element-type={element.type}
      className={`yoo-lists-ml-[10px] yoo-lists-flex yoo-lists-items-center yoo-lists-pl-4 yoo-lists-space-x-1 yoo-lists-py-[2px] yoo-lists-text-[16px] yoo-lists-relative yoo-lists-leading-[28px] yoopta-numbered-list ${className}`}
      {...htmlAttrs}
      {...attributes}
    >
      <span
        className="yoo-lists-min-w-[10px] yoo-lists-w-auto yoo-lists-select-none yoo-lists-absolute yoo-lists-left-0 yoo-lists-top-[2px]"
        contentEditable={false}
      >
        {count}.
      </span>
      <span className="yoo-lists-flex-grow">{children}</span>
    </div>
  );
};

export { NumberedListRender };

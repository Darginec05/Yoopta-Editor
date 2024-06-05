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
    <div className={`yoopta-numbered-list ${className}`} {...htmlAttrs} {...attributes}>
      <span className="yoopta-numbered-list-count" contentEditable={false}>
        {count}.
      </span>
      <span className="yoopta-numbered-list-content">{children}</span>
    </div>
  );
};

export { NumberedListRender };

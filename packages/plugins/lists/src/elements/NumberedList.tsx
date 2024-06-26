import { PluginElementRenderProps, useBlockData, useYooptaEditor, YooEditor, YooptaBlockData } from '@yoopta/editor';

function getNumberedListCount(editor: YooEditor, block: YooptaBlockData) {
  const sortedKeys = Object.keys(editor.children).sort((a, b) => {
    const blockA = editor.children[a];
    const blockB = editor.children[b];
    return blockA.meta.order - blockB.meta.order;
  });

  let index = 0;
  let resetIndex = true;

  for (let key of sortedKeys) {
    const currentBlock = editor.children[key];
    if (currentBlock.type !== 'NumberedList') {
      resetIndex = true;
      continue;
    }

    if (resetIndex) {
      index = 0;
      resetIndex = false;
    }

    if (currentBlock.meta.depth === block.meta.depth && currentBlock.type === 'NumberedList') {
      index++;
      if (key === block.id) break;
    }
  }

  const count = index;

  return count;
}

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

  const count = getNumberedListCount(editor, block);

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

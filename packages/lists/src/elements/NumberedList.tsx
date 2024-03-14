import {
  findPluginBlockBySelectionPath,
  PluginElementRenderProps,
  useBlockData,
  useYooptaEditor,
} from '@yoopta/editor';

const NumberedListRender = ({ attributes, children, blockId, element }: PluginElementRenderProps<unknown>) => {
  // const block = useBlockData(blockId);
  // const editor = useYooptaEditor();

  const getCounter = () => {
    const counter = typeof element.props?.position === 'number' ? element.props?.position : 0;

    // const prevBlock = findPluginBlockBySelectionPath(editor, { at: [block.meta.order - 1] });
    // const nextBlock = findPluginBlockBySelectionPath(editor, { at: [block.meta.order + 1] });
    // console.log({ block, prevBlock, nextBlock });

    return counter + 1;
  };

  return (
    <div
      data-element-type={element.type}
      {...attributes}
      className="flex items-center pl-4 space-x-2 py-[3px] text-[16px]"
    >
      <span className="min-w-[10px] w-auto">{getCounter()}.</span>
      <span className="flex-grow">{children}</span>
    </div>
  );
};

export { NumberedListRender };

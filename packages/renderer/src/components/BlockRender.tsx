const BlockRender = ({ block, blockId, children }) => {
  const style = {
    marginLeft: `${block.meta.depth * 20}px`,
  };

  return (
    <div
      className="yoo-renderer-relative yoo-renderer-py-0 yoo-renderer-px-[2px] yoo-renderer-mt-[2px] yoo-renderer-mb-[1px] yoo-renderer-rounded yoopta-block-wrapper"
      style={style}
      data-yoopta-block
      data-yoopta-block-id={blockId}
    >
      <div>{children}</div>
    </div>
  );
};

export { BlockRender };

import { PluginElementRenderProps, useBlockData } from '@yoopta/editor';

const BulletedListRender = ({ attributes, blockId, children, HTMLAttributes = {} }: PluginElementRenderProps) => {
  const { className = '', ...htmlAttrs } = HTMLAttributes;
  const block = useBlockData(blockId);

  const currentAlign = block?.meta?.align || 'left';
  const alignClass = `yoopta-align-${currentAlign}`;

  return (
    <div className={`yoopta-bulleted-list ${alignClass} ${className}`} {...htmlAttrs} {...attributes}>
      <span className="yoopta-bulleted-list-bullet" contentEditable={false}>
        •
      </span>
      <span className="yoopta-bulleted-list-content">{children}</span>
    </div>
  );
};

export { BulletedListRender };

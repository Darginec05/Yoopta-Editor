import { PluginElementRenderProps } from '@yoopta/editor';

const BulletedListRender = ({ attributes, element, children, HTMLAttributes = {} }: PluginElementRenderProps) => {
  const { className = '', ...htmlAttrs } = HTMLAttributes;

  return (
    <div
      data-element-type={element.type}
      className={`yoopta-bulleted-list ${className}`}
      {...htmlAttrs}
      {...attributes}
    >
      <span className="yoopta-bulleted-list-bullet" contentEditable={false}>
        •
      </span>
      <span className="yoopta-bulleted-list-content">{children}</span>
    </div>
  );
};

export { BulletedListRender };

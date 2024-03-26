import { PluginElementRenderProps, useYooptaReadOnly } from '@yoopta/editor';

const LinkRender = (props: PluginElementRenderProps) => {
  const { className, ...htmlAttrs } = props.HTMLAttributes || {};

  const { url, target, rel } = props.element.props || {};
  const isReadOnly = useYooptaReadOnly();

  const onClick = (e) => {
    if (isReadOnly) return;
    e.preventDefault();
  };

  return (
    <a
      data-element-type={props.element.type}
      draggable={false}
      href={url || ''}
      rel={rel}
      target={target}
      onClick={onClick}
      className={`underline underline-offset-4 text-[#007AFF] hover:text-[#3b82f6] ${className}`}
      {...htmlAttrs}
      {...props.attributes}
    >
      {props.children}
    </a>
  );
};

export { LinkRender };

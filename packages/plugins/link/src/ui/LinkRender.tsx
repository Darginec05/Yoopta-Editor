import { PluginElementRenderProps, useYooptaReadOnly } from '@yoopta/editor';

const LinkRender = (props: PluginElementRenderProps) => {
  const { className = '', ...htmlAttrs } = props.HTMLAttributes || {};

  const { url, target, rel } = props.element.props || {};
  const isReadOnly = useYooptaReadOnly();

  const onClick = (e) => {
    if (isReadOnly) return;
    e.preventDefault();
  };

  return (
    <a
      draggable={false}
      href={url || ''}
      rel={rel}
      target={target}
      onClick={onClick}
      className={`yoopta-link ${className}`}
      {...htmlAttrs}
      {...props.attributes}
    >
      {props.children}
    </a>
  );
};

export { LinkRender };

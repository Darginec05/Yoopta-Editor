import { ElementRendererProps, PluginElementRenderProps, useYooptaReadOnly } from '@yoopta/editor';

const Link = (props: PluginElementRenderProps) => {
  const isReadOnly = useYooptaReadOnly();

  const onClick = (e) => {
    if (isReadOnly) return;
    e.preventDefault();
  };

  return <LinkRenderer {...props} onClick={onClick} />;
};

type Props = ElementRendererProps & {
  onClick?: (e) => void;
};

const LinkRenderer = ({ element, attributes, children, onClick }: Props) => {
  const { url, target, rel } = element.props || {};

  return (
    <a
      data-element-type={element.type}
      draggable={false}
      href={url || ''}
      rel={rel}
      target={target}
      onClick={onClick}
      {...attributes}
      className={`yoo-link-underline yoo-link-underline-offset-4 yoo-link-text-[#007AFF] hover:yoo-link-text-[#3b82f6] ${
        attributes?.className || ''
      }`}
    >
      {children}
    </a>
  );
};

export { Link, LinkRenderer };

import { ElementRendererProps } from '@yoopta/editor';

const LinkRender = ({ element, attributes, children }: ElementRendererProps) => {
  const { url, target, rel } = element.props || {};

  return (
    <a
      data-element-type={element.type}
      draggable={false}
      href={url || ''}
      rel={rel}
      target={target}
      {...attributes}
      className={`yoo-link-underline yoo-link-underline-offset-4 yoo-link-text-[#007AFF] hover:yoo-link-text-[#3b82f6] ${
        attributes?.className || ''
      }`}
    >
      {children}
    </a>
  );
};

export { LinkRender };

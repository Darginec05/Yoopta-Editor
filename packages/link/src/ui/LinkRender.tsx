import { RenderElementProps } from 'slate-react';

const LinkRender = (props: RenderElementProps) => {
  const { url, target, rel } = props.element.props;

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <a
      draggable={false}
      href={url}
      rel={rel}
      target={target}
      onClick={handleClick}
      className="font-normal underline underline-offset-4 text-[#007AFF] hover:text-[#3b82f6]"
      {...props.attributes}
    >
      {props.children}
    </a>
  );
};

export { LinkRender };

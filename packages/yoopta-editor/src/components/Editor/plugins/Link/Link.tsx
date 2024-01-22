import { RenderElementProps } from 'slate-react';
import { createUltraPlugin } from '../../ultraPlugins';
import s from './Link.module.css';

const LinkRender = (props: RenderElementProps) => {
  const { url, target, rel } = props.element.data;

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
      className={s.link}
      {...props.attributes}
    >
      {props.children}
    </a>
  );
};

type LinkElementProps = {
  url: string | null;
  target?: string;
  rel?: string;
};

const Link = createUltraPlugin<LinkElementProps>({
  type: 'link',
  render: LinkRender,
  options: {
    isInline: true,
  },
  props: {
    url: null,
    target: '_blank',
    rel: 'noreferrer',
  },
});

export { Link };

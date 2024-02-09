import { RenderElementProps } from 'slate-react';
import { createPlugin } from '../../../../plugins';
import s from './Link.module.css';

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

const Link = createPlugin<LinkElementProps>({
  type: 'LinkPlugin',
  elements: {
    link: {
      render: LinkRender,
      elementProps: {
        url: null,
        target: '_blank',
        rel: 'noreferrer',
      },
      options: {
        nodeType: 'inline',
      },
    },
  },
});

export { Link };

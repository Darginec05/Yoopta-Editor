import { RenderElementProps } from 'slate-react';
import { createPlugin } from '../../../../plugins';
import s from './Mention.module.css';

const MentionRender = (props: RenderElementProps) => {
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
      className={s.mention}
      {...props.attributes}
    >
      {props.children}
    </a>
  );
};

type Mention = {
  url: string | null;
  target?: string;
  rel?: string;
};

const Mention = createPlugin<Mention>({
  type: 'MentionPlugin',
  elements: {
    mention: {
      render: MentionRender,
      props: {
        url: null,
        target: '_blank',
        rel: 'noreferrer',
      },
      options: {
        isInline: true,
      },
    },
  },
});

export { Mention };

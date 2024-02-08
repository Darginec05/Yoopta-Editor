import cx from 'classnames';
import { RenderElementProps, useSelected } from 'slate-react';
import { createPlugin } from '../../../../plugins';
import s from './Mention.module.css';

const MentionRender = (props: RenderElementProps) => {
  const { url, target, rel, character } = props.element.data;
  const selected = useSelected();

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
      className={cx(s.mention, { [s.selected]: selected })}
      {...props.attributes}
    >
      {character ? `@${character}` : null}
      {props.children}
    </a>
  );
};

type Mention = {
  url: string | null;
  target?: string;
  rel?: string;
  character: string | null;
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
        character: null,
      },
      options: {
        nodeType: ['inline', 'void'],
      },
    },
  },
});

export { Mention };

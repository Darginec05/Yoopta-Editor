import { RenderElementProps, useSelected } from 'slate-react';

const MentionRender = (props: RenderElementProps) => {
  const { url, target, rel, character } = props.element.props;
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
      className="relative rounded bg-[#f4f4f5] px-[0.3rem] py-[0.2rem] font-mono color-[#fff] text-sm font-semibold"
      // className={cx(s.mention, { [s.selected]: selected })}
      {...props.attributes}
    >
      {character ? `@${character}` : null}
      {props.children}
    </a>
  );
};

export { MentionRender };

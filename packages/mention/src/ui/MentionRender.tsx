import { PluginElementRenderProps } from '@yoopta/editor';
import { useSelected } from 'slate-react';

const MentionRender = (props: PluginElementRenderProps<unknown>) => {
  const { url, target, rel, character } = props.element.props || {};
  const selected = useSelected();

  const handleClick = (e) => {
    e.preventDefault();
  };

  const bgColor = selected ? 'bg-[#e2e2e2]' : 'bg-[#f4f4f5]';

  return (
    <a
      draggable={false}
      href={url || ''}
      rel={rel}
      target={target}
      onClick={handleClick}
      className={`relative rounded cursor-pointer px-[0.3rem] py-[0.2rem] font-mono color-[#fff] text-sm font-semibold ${bgColor}`}
      {...props.attributes}
    >
      {character ? `@${character}` : null}
      {props.children}
    </a>
  );
};

export { MentionRender };

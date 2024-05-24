import { PluginElementRenderProps } from '@yoopta/editor';
import { useSelected } from 'slate-react';

const MentionRender = (props: PluginElementRenderProps) => {
  const { url, target, rel, character } = props.element.props || {};
  const selected = useSelected();

  const handleClick = (e) => {
    e.preventDefault();
  };

  const bgColor = selected ? 'yoo-m-bg-[#e2e2e2]' : 'yoo-m-bg-[#f4f4f5]';

  return (
    <a
      draggable={false}
      href={url || ''}
      rel={rel}
      target={target}
      onClick={handleClick}
      className={`yoo-m-relative yoo-m-rounded yoo-m-cursor-pointer yoo-m-px-[0.3rem] yoo-m-py-[0.2rem] yoo-m-font-mono yoo-m-color-[#fff] yoo-m-text-sm yoo-m-font-semibold ${bgColor}`}
      {...props.attributes}
    >
      {character ? `@${character}` : null}
      {props.children}
    </a>
  );
};

export { MentionRender };

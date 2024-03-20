import { PluginElementRenderProps, useYooptaTools } from '@yoopta/editor';

const Link = (props: PluginElementRenderProps) => {
  const tools = useYooptaTools();

  const LinkTool = tools.LinkTool;
};

const LinkRender = (props: PluginElementRenderProps) => {
  const { url, target, rel } = props.element.props || {};

  const onClick = (e) => e.preventDefault();

  return (
    <a
      data-element-type={props.element.type}
      draggable={false}
      href={url || ''}
      rel={rel}
      target={target}
      onClick={onClick}
      className="underline underline-offset-4 text-[#007AFF] hover:text-[#3b82f6]"
      {...props.attributes}
    >
      {props.children}
    </a>
  );
};

export { LinkRender };

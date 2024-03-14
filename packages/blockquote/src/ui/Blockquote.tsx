import { PluginElementRenderProps } from '@yoopta/editor';

const BlockquoteRender = (props: PluginElementRenderProps) => {
  return (
    <blockquote
      data-element-type={props.element.type}
      {...props.attributes}
      className="yoo-b-mt-2 yoo-b-border-l-2 yoo-b-pl-6 yoo-b-leading-7"
    >
      {props.children}
    </blockquote>
  );
};

export { BlockquoteRender };

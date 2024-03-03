import { PluginElementRenderProps } from '@yoopta/editor';

const BlockquoteRender = (props: PluginElementRenderProps) => {
  return (
    <blockquote data-element-type="Blockquote" {...props.attributes} className="mt-2 border-l-2 pl-6 leading-7">
      {props.children}
    </blockquote>
  );
};

export { BlockquoteRender };

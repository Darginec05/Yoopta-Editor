import { PluginElementRenderProps } from '@yoopta/editor';

const ParagraphRender = (props: PluginElementRenderProps) => {
  return (
    <p data-element-type="Paragraph" className="leading-7 mt-2" {...props.attributes}>
      {props.children}
    </p>
  );
};

export { ParagraphRender };

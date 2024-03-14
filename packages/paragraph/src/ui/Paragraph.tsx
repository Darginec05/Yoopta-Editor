import { PluginElementRenderProps } from '@yoopta/editor';

const ParagraphRender = (props: PluginElementRenderProps) => {
  return (
    <p
      data-element-type={props.element.type}
      className="yoo-p-leading-7 yoo-p-mt-2 yoo-text-[16px]"
      {...props.attributes}
    >
      {props.children}
    </p>
  );
};

export { ParagraphRender };

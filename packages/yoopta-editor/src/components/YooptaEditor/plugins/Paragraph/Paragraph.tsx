import { RenderElementProps } from 'slate-react';
import { createUltraPlugin } from '../../ultraPlugins';

const ParagraphRender = (props: RenderElementProps) => {
  return (
    <p data-element-type="Paragraph" className="flex text-lg" {...props.attributes}>
      {props.children}
    </p>
  );
};

const Paragraph = createUltraPlugin({
  type: 'paragraph',
  render: ParagraphRender,
});

export { Paragraph };

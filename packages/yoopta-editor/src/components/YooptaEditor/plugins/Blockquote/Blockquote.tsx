import { RenderElementProps } from 'slate-react';
import { createUltraPlugin } from '../../ultraPlugins';

const BlockquoteRender = (props: RenderElementProps) => {
  return (
    <blockquote data-element-type="Blockquote" {...props.attributes}>
      {props.children}
    </blockquote>
  );
};

const Blockquote = createUltraPlugin({
  type: 'blockquote',
  render: BlockquoteRender,
});

export { Blockquote };

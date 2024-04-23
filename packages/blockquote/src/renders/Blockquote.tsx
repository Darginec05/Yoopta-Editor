import { PluginElementRenderProps } from '@yoopta/editor';
import { BlockquoteRenderer } from './BlockquoteRenderer';

const BlockquoteRender = (props: PluginElementRenderProps) => {
  return (
    <BlockquoteRenderer element={props.element} attributes={props.attributes} block={props.block}>
      {props.children}
    </BlockquoteRenderer>
  );
};

export { BlockquoteRender };

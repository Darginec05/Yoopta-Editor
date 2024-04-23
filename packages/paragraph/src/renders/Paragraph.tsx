import { PluginElementRenderProps } from '@yoopta/editor';
import { ParagraphRenderer } from './ParagraphRenderer';

const ParagraphRender = (props: PluginElementRenderProps) => (
  <ParagraphRenderer attributes={props.attributes} block={props.block} element={props.element}>
    {props.children}
  </ParagraphRenderer>
);

export { ParagraphRender };

import { PluginElementRenderProps } from '@yoopta/editor';

const ColGroup = ({ attributes, children }: PluginElementRenderProps) => (
  <colgroup {...attributes}>{children}</colgroup>
);

export { ColGroup };

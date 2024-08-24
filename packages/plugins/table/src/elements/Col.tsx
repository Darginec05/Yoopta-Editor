import { PluginElementRenderProps } from '@yoopta/editor';

const Col = ({ attributes, children }: PluginElementRenderProps) => {
  return (
    <col {...attributes} contentEditable={false}>
      {children}
    </col>
  );
};

export { Col };

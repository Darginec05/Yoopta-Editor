import { PluginElementRenderProps } from '@yoopta/editor';

const Col = ({ attributes, children }: PluginElementRenderProps) => {
  console.log('attributes', attributes);
  console.log('children', children);

  return (
    <col {...attributes} contentEditable={false}>
      {/* {children} */}
    </col>
  );
};

export { Col };

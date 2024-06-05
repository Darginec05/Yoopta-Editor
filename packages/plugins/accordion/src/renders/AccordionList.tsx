import { PluginElementRenderProps } from '@yoopta/editor';

export const AccordionList = (props: PluginElementRenderProps) => {
  const { attributes, children } = props;

  return <div {...attributes}>{children}</div>;
};

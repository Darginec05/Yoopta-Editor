import { PluginElementRenderProps } from '@yoopta/editor';

export const AccordionListItem = (props: PluginElementRenderProps) => {
  const { attributes, children } = props;

  return (
    <div {...attributes} className="yoo-accordion-border-b">
      {children}
    </div>
  );
};

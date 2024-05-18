import { PluginElementRenderProps } from '@yoopta/editor';

export const AccordionListItem = (props: PluginElementRenderProps) => {
  const { element, attributes, children } = props;

  return (
    <li {...attributes} className="yoopta-accordion-list-item">
      {children}
    </li>
  );
};

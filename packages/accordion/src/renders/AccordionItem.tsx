import { PluginElementRenderProps } from '@yoopta/editor';

export const AccordionItem = (props: PluginElementRenderProps) => {
  const { element, attributes, children } = props;

  return (
    <li
      {...attributes}
      className="yoo-accordion-border yoo-accordion-border-[#525252] yoo-accordion-bg-[#303030] yoo-accordion-rounded-none yoo-accordion-relative yoo-accordion-w-full"
    >
      {children}
    </li>
  );
};

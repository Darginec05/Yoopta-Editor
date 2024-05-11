import { PluginElementRenderProps } from '@yoopta/editor';

export const AccordionListItem = (props: PluginElementRenderProps) => {
  const { element, attributes, children } = props;

  return (
    <li {...attributes} className="border border-[#525252] bg-[#303030] rounded-none relative w-full">
      {children}
    </li>
  );
};

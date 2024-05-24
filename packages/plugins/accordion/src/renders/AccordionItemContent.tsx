import { Elements, PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { Path } from 'slate';

export const AccordionItemContent = (props: PluginElementRenderProps) => {
  const { attributes, children, blockId, element } = props;
  const editor = useYooptaEditor();

  const parentPath = Elements.getParentElementPath(editor, blockId, element)!;
  const parentListItem = Elements.getElement(editor, blockId, 'accordion-list-item', {
    atPath: parentPath,
  });

  const isExpanded = parentListItem?.props?.isExpanded;

  return (
    <div
      data-state={isExpanded ? 'open' : 'closed'}
      className="yoopta-accordion-list-item-content data-[state=closed]:yoo-accordion-hidden data-[state=closed]:yoo-accordion-animate-accordion-up data-[state=open]:yoo-accordion-animate-accordion-down"
      {...attributes}
    >
      <div className="yoo-accordion-pb-4 yoo-accordion-pt-0">{children}</div>
    </div>
  );
};

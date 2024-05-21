import { PluginElementRenderProps, useYooptaEditor } from '@yoopta/editor';
import { Path } from 'slate';

export const AccordionItemContent = (props: PluginElementRenderProps) => {
  const { attributes, children, blockId, path } = props;
  const editor = useYooptaEditor();

  const nodeEl = editor.blocks.Accordion.getElement(blockId, 'accordion-list-item', {
    atPath: Path.parent(path),
  });

  const isExpanded = nodeEl?.props?.isExpanded;

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

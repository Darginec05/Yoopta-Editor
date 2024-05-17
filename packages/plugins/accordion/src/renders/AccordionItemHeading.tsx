import { PluginElementRenderProps, useYooptaEditor, useYooptaReadOnly } from '@yoopta/editor';
import { ChevronUp, Plus } from 'lucide-react';

export const AccordionItemHeading = (props: PluginElementRenderProps) => {
  const { attributes, children, blockId } = props;
  const editor = useYooptaEditor();
  const isReadOnly = useYooptaReadOnly();

  const onToggleExpand = () => {
    const listItemElement = editor.blocks.Accordion.getElement(blockId, 'accordion-list-item');

    if (listItemElement) {
      editor.blocks.Accordion.updateElement(blockId, 'accordion-list-item', {
        isExpanded: !listItemElement.props?.isExpanded,
      });
    }
  };

  const onAddAccordionItem = () => {
    editor.blocks.Accordion.createElement(
      blockId,
      'accordion-list-item',
      { isExpanded: true },
      { at: 'next', focus: true },
    );
  };

  return (
    <h2
      {...attributes}
      aria-expanded="false"
      className="yoo-accordion-group yoo-accordion-mb-0 yoo-accordion-relative yoo-accordion-flex yoo-accordion-w-full yoo-accordion-items-center yoo-accordion-border-0 yoo-accordion-rounded-none yoo-accordion-text-[#3b71ca] !yoo-accordion-bg-[#424242] yoo-accordion-px-5 yoo-accordion-py-4 yoo-accordion-text-left"
    >
      {children}
      {!isReadOnly && (
        <div className="yoo-accordion-absolute yoo-accordion-right-[14px] yoo-accordion-z-10 yoo-accordion-top-1/2 -yoo-accordion-translate-y-1/2 yoo-accordion-flex yoo-accordion-gap-1">
          <button
            contentEditable={false}
            onClick={onAddAccordionItem}
            className="yoo-accordion-opacity-0 group-hover:yoo-accordion-opacity-100 yoo-accordion-transition-opacity"
          >
            <Plus strokeWidth={1} size={24} color="#fff" />
          </button>
          <button contentEditable={false} onClick={onToggleExpand}>
            <ChevronUp strokeWidth={1} size={24} color="#fff" />
          </button>
        </div>
      )}
    </h2>
  );
};

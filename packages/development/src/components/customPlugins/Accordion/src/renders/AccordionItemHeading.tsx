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
      className="group mb-0 relative flex w-full items-center border-0 rounded-none text-[#3b71ca] !bg-[#424242] px-5 py-4 text-left"
    >
      {children}
      {!isReadOnly && (
        <div className="absolute right-[14px] z-10 top-1/2 -translate-y-1/2 flex gap-1">
          <button
            contentEditable={false}
            onClick={onAddAccordionItem}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
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

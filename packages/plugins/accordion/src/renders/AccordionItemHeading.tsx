import { PluginElementRenderProps, useYooptaEditor, useYooptaReadOnly, Elements, Blocks } from '@yoopta/editor';
import { ChevronUp, Plus, TrashIcon } from 'lucide-react';
import { Path } from 'slate';
import { MouseEvent } from 'react';

export const AccordionItemHeading = (props: PluginElementRenderProps) => {
  const { attributes, children, blockId, element } = props;
  const editor = useYooptaEditor();
  const isReadOnly = useYooptaReadOnly();

  const onToggleExpand = (event: MouseEvent) => {
    event.stopPropagation();

    const parentPath = Elements.getParentElementPath(editor, blockId, element)!;
    const listItemElement = Elements.getElement(editor, blockId, 'accordion-list-item', {
      atPath: parentPath,
    });

    if (listItemElement) {
      Elements.updateElement(
        editor,
        blockId,
        'accordion-list-item',
        { isExpanded: !listItemElement.props?.isExpanded },
        { path: parentPath },
      );
    }
  };

  const onAddAccordionItem = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const parentPath = Elements.getParentElementPath(editor, blockId, element)!;
    const listItemPath = parentPath;
    const nextListItemPath = Path.next(listItemPath);

    Elements.createElement(
      editor,
      blockId,
      'accordion-list-item',
      { isExpanded: true },
      { at: nextListItemPath, focus: true },
    );
  };

  const onDeleteAccordionItem = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const parentPath = Elements.getParentElementPath(editor, blockId, element)!;

    const accordionListItems = Elements.getElementChildren(editor, blockId, 'accordion-list', {
      atPath: parentPath,
    });

    if (accordionListItems?.length === 1) {
      Blocks.deleteBlock(editor, { blockId });
      return;
    }

    Elements.deleteElement(editor, blockId, { type: 'accordion-list-item', path: parentPath });
  };

  const parentPath = Elements.getParentElementPath(editor, blockId, element)!;
  const nodeEl = Elements.getElement(editor, blockId, 'accordion-list-item', { atPath: parentPath });
  const isExpanded = nodeEl?.props?.isExpanded;

  return (
    <div
      {...attributes}
      onClick={isReadOnly ? onToggleExpand : undefined}
      className="yoopta-accordion-list-item-heading yoo-accordion-group"
    >
      <span className="yoo-accordion-break-words">{children}</span>
      <div className="yoo-accordion-absolute yoo-accordion-right-[14px] yoo-accordion-z-10 yoo-accordion-top-1/2 -yoo-accordion-translate-y-1/2 yoo-accordion-flex yoo-accordion-gap-1 yoo-accordion-select-none">
        {!isReadOnly && (
          <>
            <button
              contentEditable={false}
              onClick={onDeleteAccordionItem}
              className="yoo-accordion-opacity-0 group-hover:yoo-accordion-opacity-100 yoo-accordion-transition-opacity"
            >
              <TrashIcon strokeWidth={1} size={16} color="#000" />
            </button>
            <button
              contentEditable={false}
              onClick={onAddAccordionItem}
              className="yoo-accordion-mr-2 yoo-accordion-opacity-0 group-hover:yoo-accordion-opacity-100 yoo-accordion-transition-opacity"
            >
              <Plus strokeWidth={1} size={20} color="#000" />
            </button>
          </>
        )}
        <button contentEditable={false} onClick={onToggleExpand}>
          <ChevronUp
            strokeWidth={1}
            size={20}
            color="#000"
            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            className={isExpanded ? 'rotate-180' : 'rotate-0'}
          />
        </button>
      </div>
    </div>
  );
};

// - Accordion
//   - list
//     - list-item
//       - list-item-heading
//       - list-item-content
//     - list-item
//       - list-item-heading
//       - list-item-content
//     - list-item
//       - list-item-heading
//       - list-item-content
// - Paragraph
//  - paragraph
// - Image
//  - image

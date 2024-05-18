import { PluginElementRenderProps, useYooptaEditor, useYooptaReadOnly } from '@yoopta/editor';
import { ChevronUp, Plus } from 'lucide-react';
import { Path } from 'slate';
import { createBlockElement } from '../elements/createElement';
import { updateElement } from '../elements/updateElement';
import { getBlockElement } from '../elements/getElement';

export const AccordionItemHeading = (props: PluginElementRenderProps) => {
  const { attributes, children, blockId, path } = props;
  const editor = useYooptaEditor();
  const isReadOnly = useYooptaReadOnly();

  const onToggleExpand = () => {
    const listItemElement = getBlockElement(editor, blockId, 'accordion-list-item', { atPath: path.slice(0, 2) });

    if (listItemElement) {
      updateElement(
        editor,
        blockId,
        'accordion-list-item',
        {
          isExpanded: !listItemElement.props?.isExpanded,
        },
        { path: path.slice(0, 2) },
      );
    }
  };

  const onAddAccordionItem = () => {
    createBlockElement(
      editor,
      blockId,
      'accordion-list-item',
      { isExpanded: true },
      { at: Path.next(path.slice(0, 2)), focus: true },
    );
  };

  const nodeEl = getBlockElement(editor, blockId, 'accordion-list-item', { atPath: path.slice(0, 2) });
  const isExpanded = nodeEl?.props?.isExpanded;

  return (
    <h2 {...attributes} aria-expanded="false" className="yoopta-accordion-list-item-heading yoo-accordion-group">
      {children}
      {!isReadOnly && (
        <div className="yoo-accordion-absolute yoo-accordion-right-[14px] yoo-accordion-z-10 yoo-accordion-top-1/2 -yoo-accordion-translate-y-1/2 yoo-accordion-flex yoo-accordion-gap-1 yoo-accordion-select-none">
          <button
            contentEditable={false}
            onClick={onAddAccordionItem}
            className="yoo-accordion-opacity-0 group-hover:yoo-accordion-opacity-100 yoo-accordion-transition-opacity"
          >
            <Plus strokeWidth={1} size={24} color="#fff" />
          </button>
          <button contentEditable={false} onClick={onToggleExpand}>
            <ChevronUp
              strokeWidth={1}
              size={24}
              color="#fff"
              style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              className={isExpanded ? 'rotate-180' : 'rotate-0'}
            />
          </button>
        </div>
      )}
    </h2>
  );
};

import { SlateElement } from '@yoopta/editor';

export type AccordionElementKeys =
  | 'accordion-list'
  | 'accordion-list-item'
  | 'accordion-list-item-heading'
  | 'accordion-list-item-content';

export type AccordionListItemProps = {
  isExpanded: boolean;
};

export type AccordionItemElement = SlateElement<'accordion-list-item', AccordionListItemProps>;

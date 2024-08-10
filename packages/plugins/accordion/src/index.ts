import { Accordion } from './plugin';
import {
  AccordionListElement,
  AccordionItemElement,
  AccordionListItemHeadingElement,
  AccordionListItemContentElement,
  AccordionListItemProps,
} from './types';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element:
      | AccordionListElement
      | AccordionItemElement
      | AccordionListItemHeadingElement
      | AccordionListItemContentElement;
  }
}

export default Accordion;
export { AccordionItemElement, AccordionListItemProps };

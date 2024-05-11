import { Accordion } from './plugin';
import { AccordionItemElement } from './types';

declare module 'slate' {
  interface CustomTypes {
    Element: AccordionItemElement;
  }
}

export default Accordion;
export { AccordionItemElement };

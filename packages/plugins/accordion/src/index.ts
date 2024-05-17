import { Accordion } from './plugin';
import { AccordionItemElement } from './types';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: AccordionItemElement;
  }
}

export default Accordion;
export { AccordionItemElement };

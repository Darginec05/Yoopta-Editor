import { ParagraphElement } from './types';
import { Paragraph } from './plugin';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: ParagraphElement;
  }
}

export default Paragraph;

export { ParagraphElement };

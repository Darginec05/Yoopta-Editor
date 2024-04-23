import { ParagraphElement } from './types';
import { Paragraph } from './plugin';
import { ParagraphRenderer } from './renders/ParagraphRenderer';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: ParagraphElement;
  }
}

export default Paragraph;

export { ParagraphElement, ParagraphRenderer };

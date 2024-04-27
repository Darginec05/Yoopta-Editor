import { ParagraphElement } from './types';
import { Paragraph } from './plugin';
import { ParagraphRender } from './render/ParagraphRender';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: ParagraphElement;
  }
}

export default Paragraph;

export { ParagraphElement, ParagraphRender };

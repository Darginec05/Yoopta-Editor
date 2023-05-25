import { YooEditor } from '@yoopta/editor';
import { ParagraphElement } from './types';
import { Paragraph } from './ui/Paragraph';

declare module 'slate' {
  interface CustomTypes {
    Editor: YooEditor;
    Element: ParagraphElement;
  }
}

export default Paragraph;

export { ParagraphElement };

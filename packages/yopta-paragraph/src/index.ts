import { YoEditor } from '@yopta/editor';
import { ParagraphElement } from './types';
import { Paragraph } from './ui/Paragraph';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
    Element: ParagraphElement;
  }
}

export default Paragraph;

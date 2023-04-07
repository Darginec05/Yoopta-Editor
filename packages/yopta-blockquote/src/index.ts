import { YoEditor } from '@yopta/editor';
import { BlockquoteElement } from './types';
import { Blockquote } from './ui/Blockquote';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
    Element: BlockquoteElement;
  }
}

export default Blockquote;
export { BlockquoteElement };

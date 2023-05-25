import { YooEditor } from '@yoopta/editor';
import { BlockquoteElement } from './types';
import { Blockquote } from './ui/Blockquote';

declare module 'slate' {
  interface CustomTypes {
    Editor: YooEditor;
    Element: BlockquoteElement;
  }
}

export default Blockquote;
export { BlockquoteElement };

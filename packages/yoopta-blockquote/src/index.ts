import { Blockquote } from './plugin';
import { BlockquoteElement } from './types';

declare module 'slate' {
  interface CustomTypes {
    Element: BlockquoteElement;
  }
}

export default Blockquote;
export { BlockquoteElement };

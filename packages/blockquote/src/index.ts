import { Blockquote } from './plugin';
import { BlockquoteRenderer } from './renders/BlockquoteRenderer';
import { BlockquoteElement } from './types';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: BlockquoteElement;
  }
}

export default Blockquote;
export { BlockquoteElement, Blockquote, BlockquoteRenderer };

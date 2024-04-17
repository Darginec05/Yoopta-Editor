import { Blockquote } from './plugin';
import { BlockquoteElement } from './types';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: BlockquoteElement;
  }
}

export default Blockquote;
export { BlockquoteElement };

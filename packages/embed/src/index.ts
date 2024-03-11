import { Embed } from './plugin';
import { EmbedElement } from './types';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: EmbedElement;
  }
}

export default Embed;
export { EmbedElement };

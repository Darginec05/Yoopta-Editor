import { Embed } from './plugin';
import { EmbedElement, EmbedElementProps } from './types';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: EmbedElement;
  }
}

export { EmbedCommands } from './commands';

export default Embed;
export { EmbedElement, EmbedElementProps };

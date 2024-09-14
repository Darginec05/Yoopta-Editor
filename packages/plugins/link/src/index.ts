import { Link } from './plugin';
import './styles.css';
import { LinkElement, LinkElementProps } from './types';

declare module 'slate' {
  interface CustomTypes {
    Element: LinkElement;
  }
}

export { LinkCommands } from './commands';

export { LinkElement, LinkElementProps };

export default Link;

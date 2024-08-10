import { Link } from './plugin';
import './styles.css';
import { LinkElement, LinkElementProps } from './types';

declare module 'slate' {
  interface CustomTypes {
    Element: LinkElement;
  }
}

export { LinkElement, LinkElementProps };

export default Link;

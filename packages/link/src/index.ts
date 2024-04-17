import { Link } from './plugin';
import './styles.css';
import { LinkElement } from './types';

declare module 'slate' {
  interface CustomTypes {
    Element: LinkElement;
  }
}

export default Link;

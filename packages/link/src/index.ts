import { Link } from './plugin';
import './styles.css';
import { LinkElement } from './types';
export { LinkRender } from './render/LinkRender';

declare module 'slate' {
  interface CustomTypes {
    Element: LinkElement;
  }
}

export default Link;

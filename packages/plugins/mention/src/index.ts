import { Mention } from './plugin';
import './styles.css';
import { MentionElement } from './types';

declare module 'slate' {
  interface CustomTypes {
    Element: MentionElement;
  }
}

export default Mention;

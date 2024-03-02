import { Code } from './plugin';
import { CodeElement } from './types';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: CodeElement;
  }
}

export default Code;
export { CodeElement };

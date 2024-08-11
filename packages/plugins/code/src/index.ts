import { Code } from './plugin';
import { CodeElement, CodeElementProps } from './types';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: CodeElement;
  }
}

export default Code;
export { CodeElement, CodeElementProps };

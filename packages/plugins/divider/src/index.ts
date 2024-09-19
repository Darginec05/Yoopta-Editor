import { DividerElement, DividerElementProps, DividerTheme } from './types';
import { Divider } from './plugin';
export { DividerCommands } from './commands';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: DividerElement;
  }
}

export default Divider;

export { DividerElement, DividerElementProps, DividerTheme };

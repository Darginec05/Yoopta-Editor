import { Callout } from './plugin';
import { CalloutElement, CalloutElementProps } from './types';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: CalloutElement;
  }
}

export { CalloutCommands } from './commands';

export default Callout;
export { CalloutElement, CalloutElementProps };

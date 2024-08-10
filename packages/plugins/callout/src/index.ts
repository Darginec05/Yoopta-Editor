import { Callout } from './plugin';
import { CalloutElement, CalloutElementProps } from './types';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: CalloutElement;
  }
}

export default Callout;
export { CalloutElement, CalloutElementProps };

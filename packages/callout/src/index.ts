import { Callout } from './plugin';
import { CalloutRenderer } from './render/CalloutRenderer';
import { CalloutElement } from './types';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: CalloutElement;
  }
}

export default Callout;
export { CalloutElement, CalloutRenderer };

import { Callout } from './plugin';
import { CalloutElement } from './types';

declare module 'slate' {
  interface CustomTypes {
    Element: CalloutElement;
  }
}

export default Callout;
export { CalloutElement };

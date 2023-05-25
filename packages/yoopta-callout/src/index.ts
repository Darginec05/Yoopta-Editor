import { YooEditor } from '@yoopta/editor';
import { CalloutElement } from './types';
import { Callout } from './ui/Callout';

declare module 'slate' {
  interface CustomTypes {
    Editor: YooEditor;
    Element: CalloutElement;
  }
}

export default Callout;
export { CalloutElement };

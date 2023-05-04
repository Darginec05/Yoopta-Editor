import { YoEditor } from '@yoopta/editor';
import { CalloutElement } from './types';
import { Callout } from './ui/Callout';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
    Element: CalloutElement;
  }
}

export default Callout;
export { CalloutElement };

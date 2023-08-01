import { YooEditor } from '@yoopta/editor';
import { LinkElement } from './types';
import { Link } from './ui/Link';

declare module 'slate' {
  interface CustomTypes {
    Editor: YooEditor;
    Element: LinkElement;
  }
}

export default Link;
export { LinkElement };

import { SlateEditor, SlateElement, SlateElementTextNode } from './editor/types';

declare module 'slate' {
  interface CustomTypes {
    Editor: SlateEditor;
    Element: SlateElement;
    Text: SlateElementTextNode;
  }
}

import { CustomEditor, CustomElement, CustomText, EmptyText } from './types';

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText | EmptyText;
  }
}

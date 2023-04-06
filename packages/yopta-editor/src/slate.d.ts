import { YoEditor, YoElement, EmptyText } from './types';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
    Element: YoElement;
    Text: EmptyText;
  }
}

import { YooEditor, YooptaBaseElement, EmptyText } from './types';

declare module 'slate' {
  interface CustomTypes {
    Editor: YooEditor;
    Element: YooptaBaseElement<string>;
    Text: EmptyText;
  }
}

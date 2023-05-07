import { YoEditor, YooptaBaseElement, EmptyText } from './types';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
    Element: YooptaBaseElement<string>;
    Text: EmptyText;
  }
}

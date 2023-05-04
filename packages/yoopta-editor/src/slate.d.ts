import { YoEditor, YoptaBaseElement, EmptyText } from './types';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
    Element: YoptaBaseElement<string>;
    Text: EmptyText;
  }
}

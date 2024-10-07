import { SlateEditor, SlateElement } from './editor/types';
import { YooEditor, YooptaBaseElement, EmptyText } from './types';

declare module 'slate' {
  interface CustomTypes {
    Editor: SlateEditor;
    Element: SlateElement;
    Text: EmptyText & { bold?: boolean; italic?: boolean; underline?: boolean; code?: boolean };
  }
}

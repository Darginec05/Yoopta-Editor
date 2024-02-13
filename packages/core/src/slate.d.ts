import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { YooptaEditorSlateBaseData } from './editor/types';
import { YooEditor, YooptaBaseElement, EmptyText } from './types';

declare module 'slate' {
  interface CustomTypes {
    Editor: ReactEditor & BaseEditor;
    Element: YooptaEditorSlateBaseData;
    Text: EmptyText;
  }
}

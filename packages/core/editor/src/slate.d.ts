import { BaseEditor } from 'slate';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';
import { SlateElement } from './editor/types';
import { YooEditor, YooptaBaseElement, EmptyText } from './types';

declare module 'slate' {
  interface CustomTypes {
    Editor: ReactEditor & BaseEditor & HistoryEditor;
    Element: SlateElement<string>;
    Text: EmptyText & { bold?: boolean; italic?: boolean; underline?: boolean; code?: boolean };
  }
}

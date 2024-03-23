import { EditorState, EditorStateConfig, Extension, StateField } from '@codemirror/state';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { type BasicSetupOptions } from '@uiw/codemirror-extensions-basic-setup';

export interface ReactCodeMirrorProps
  extends Omit<EditorStateConfig, 'doc' | 'extensions'>,
    Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'placeholder'> {
  value?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  autoFocus?: boolean;
  placeholder?: string | HTMLElement;
  theme?: 'light' | 'dark' | 'none' | Extension;
  basicSetup?: boolean | BasicSetupOptions;
  editable?: boolean;
  readOnly?: boolean;
  indentWithTab?: boolean;
  onChange?(value: string, viewUpdate: ViewUpdate): void;
  onStatistics?(data: any): void;
  onUpdate?(viewUpdate: ViewUpdate): void;
  onCreateEditor?(view: EditorView, state: EditorState): void;
  extensions?: Extension[];
  root?: ShadowRoot | Document;
  initialState?: {
    json: any;
    fields?: Record<string, StateField<any>>;
  };
}

export interface ReactCodeMirrorRef {
  editor?: HTMLDivElement | null;
  state?: EditorState;
  view?: EditorView;
}

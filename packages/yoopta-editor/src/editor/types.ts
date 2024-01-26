import { Descendant, Editor as SlateEditor } from 'slate';

export type YooptaPath = number[];

export type YooptaChildrenKey = string;
export type YooptaChildren = Record<YooptaChildrenKey, YooptaChildrenValue>;
export type YooptaChildrenValue<T = Descendant> = {
  id: string;
  value: T[];
  type: string;
  meta: YooptaBlockBaseMeta;
};

export type YooptaBlockType = 'block' | 'inline' | 'void';

export type YooptaBlockBaseMeta = {
  order: number;
  depth: number;
};

export type YooptaEditorOptions = {
  at?: YooptaPath | null;
  focus?: boolean;
  slate?: SlateEditor;
  pluginId?: string;
};

export type YooptaPluginsEditorMap = Record<string, SlateEditor>;

export type YooEditor = {
  insertBlock: (data, options?: YooptaEditorOptions) => void;
  splitBlock: (options?: YooptaEditorOptions) => void;
  updateBlock: (id: string, data, options?: YooptaEditorOptions) => void;
  deleteBlock: (options?: YooptaEditorOptions) => void;
  getBlock: (options?: YooptaEditorOptions) => void;
  applyChanges: () => void;
  moveBlock: (from: YooptaPath, to: YooptaPath) => void;
  focusBlock: (id: string, options?: YooptaEditorOptions) => void;
  selection: YooptaPath | null;
  children: Record<string, YooptaChildrenValue>;
  setSelection: (path: YooptaPath | null) => void;
  blockEditorsMap: YooptaPluginsEditorMap;
};

// types for slate value
export type YooptaEditorSlateBaseData<T = unknown> = {
  id: string;
  type: string;
  children: Descendant[];
} & T;

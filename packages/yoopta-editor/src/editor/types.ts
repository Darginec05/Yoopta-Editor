import { Descendant, Editor as SlateEditor } from 'slate';

export type YooptaPath = number[];

export type UltraYooptaBlockPluginType = 'block' | 'inline' | 'void';

export type YooptaBlockPluginMetaBase = {
  order: number;
  depth: number;
};

export type UltraYooptaContextBlockPluginMetaInline = {
  refId: string;
};

export type YooptaBlockPlugin<T = Descendant[]> = {
  id: string;
  value: T;
  type: string;
  meta: YooptaBlockPluginMetaBase;
};

export type YooptaEditorOptions = {
  at?: YooptaPath | null;
  focus?: boolean;
};

export type YooptaPluginsEditorMap = Record<string, SlateEditor>;

export type YooEditor = {
  insertBlock: (data, options?: YooptaEditorOptions) => void;
  updateBlock: (id: string, data, options?: YooptaEditorOptions) => void;
  deleteBlock: (options?: YooptaEditorOptions) => void;
  getBlock: (options?: YooptaEditorOptions) => void;
  applyChanges: () => void;
  moveBlock: (from: YooptaPath, to: YooptaPath) => void;
  focusBlock: (id: string, options?: YooptaEditorOptions) => void;
  selection: YooptaPath | null;
  children: Record<string, YooptaBlockPlugin>;
  setSelection: (path: YooptaPath | null) => void;
  blockEditorsMap: YooptaPluginsEditorMap;
};

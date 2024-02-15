import { Descendant, Editor as SlateEditor } from 'slate';
import { Plugin, PluginElementsMap } from '../plugins/types';

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
  maxDepth?: number;
};

export type YooptaEditorTransformOptions = {
  at?: YooptaPath | null;
  focus?: boolean;
  slate?: SlateEditor;
  pluginId?: string;
};

export type YooptaPluginsEditorMap = Record<string, SlateEditor>;

// Marks
export type TextFormat = {
  type: string;
  hotkey?: string;
  value: string;
  isActive: (editor, format) => boolean;
  toggle: (editor, format) => void;
  update: (editor, format, props: any) => void;
};

export type TextFormatMap<TKey extends string = any> = {
  [key in TKey]: TextFormat;
};

// [TODO] - Fix generic and default types
export type YooEditor<TNodes = any, TKey extends string = any> = {
  insertBlock: (data, options?: YooptaEditorTransformOptions) => void;
  splitBlock: (options?: YooptaEditorTransformOptions) => void;
  updateBlock: (id: string, data, options?: YooptaEditorTransformOptions) => void;
  deleteBlock: (options?: YooptaEditorTransformOptions) => void;
  getBlock: (options?: YooptaEditorTransformOptions) => void;
  increaseBlockDepth: (options?: YooptaEditorTransformOptions) => void;
  decreaseBlockDepth: (options?: YooptaEditorTransformOptions) => void;
  applyChanges: () => void;
  moveBlock: (blockId: string, to: YooptaPath) => void;
  focusBlock: (id: string, options?: YooptaEditorTransformOptions) => void;
  selection: YooptaPath | null;
  children: Record<string, YooptaChildrenValue>;
  setSelection: (path: YooptaPath | null) => void;
  blockEditorsMap: YooptaPluginsEditorMap;
  elements: { [type: string]: SlateElement };
  blocks: Omit<Plugin, 'renderPlugin'>[];
  plugins: {
    [type: string]: {
      create: (editor: YooEditor, id: string) => void;
      update: (editor: YooEditor, id: string, data: any) => void;
    };
  };
  formats: {
    [key in TKey]: Pick<TextFormat, 'type' | 'hotkey'>;
  };
};

// types for slate value
export type SlateElement<T = unknown> = {
  id: string;
  type: string;
  children: Descendant[];
} & T;

import { Descendant, Editor as SlateEditor } from 'slate';
import { Plugin, PluginElementsMap, PluginOptions } from '../plugins/types';
import { ApplyBlockOptions } from './transforms/applyBlock';

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
  getValue: (type: string) => null | any;
  isActive: () => boolean;
  toggle: () => void;
  update: (props?: any) => void;
};

export type YooptaBlock = {
  type: string;
  options?: PluginOptions;
  elements: PluginElementsMap<unknown>;
  isActive: () => boolean;
  apply: (options?: ApplyBlockOptions) => void;
  update: (id: string, data: any) => void;
  delete: (id: string) => void;
};

export type YooptaBlocks = Record<string, YooptaBlock>;
export type YooptaFormats = Record<string, TextFormat>;

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
  getEditorValue: () => TNodes;
  setSelection: (path: YooptaPath | null) => void;
  blockEditorsMap: YooptaPluginsEditorMap;
  blocks: YooptaBlocks;
  formats: YooptaFormats;
  shortcuts: Record<string, YooptaBlock>;
};

// types for slate value
export type SlateElement<T = unknown> = {
  id: string;
  type: string;
  children: Descendant[];
  props?: T;
};

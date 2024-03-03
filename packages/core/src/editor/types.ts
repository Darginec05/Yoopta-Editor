import { Descendant, Editor, Path, Point } from 'slate';
import { PluginReturn, PluginElementsMap, PluginOptions, PluginElementProps } from '../plugins/types';
import { EditorBlurOptions } from './selection/blur';
import { BlockSelectedOptions } from './selection/setBlockSelected';
import { CreateBlockOptions } from './transforms/createBlock';
import { DeleteBlockOptions } from './transforms/deleteBlock';
import { DuplicateBlockOptions } from './transforms/duplicateBlock';
import { FocusBlockOptions } from './transforms/focusBlock';

export type YooptaBlockPath = [number];

export type YooptaChildrenKey = string;
export type YooptaChildren = Record<YooptaChildrenKey, YooptaChildrenValue>;

// [TODO] - rename to block
export type YooptaChildrenValue<T = Descendant> = {
  id: string;
  value: T[];
  type: string;
  meta: YooptaBlockBaseMeta;
};

export type SlateEditor = Editor;

export type YooptaBlockType = 'block' | 'inline' | 'void';

export type YooptaBlockBaseMeta = {
  order: number;
  depth: number;
  maxDepth?: number;
};

export type FocusAt = Path | Point;

export type YooptaEditorTransformOptions = {
  at?: YooptaBlockPath | null;
  focus?: boolean;
  focusAt?: FocusAt;
  slate?: SlateEditor;
  pluginId?: string;
};

export type YooptaPluginsEditorMap = Record<string, SlateEditor>;

// Marks
export type TextFormat = {
  type: string;
  hotkey?: string;
  getValue: () => null | any;
  isActive: () => boolean;
  toggle: () => void;
  update: (props?: any) => void;
};

export type YooptaBlock = {
  type: string;
  order: number;
  options?: PluginOptions;
  elements: PluginElementsMap<unknown>;
  withCustomEditor?: boolean;
  isActive: () => boolean;
  create: (options?: CreateBlockOptions) => void;
  update: (id: string, data: any) => void;
  delete: (id: string) => void;
};

export type YooptaBlocks = Record<string, YooptaBlock>;
export type YooptaFormats = Record<string, TextFormat>;

// [TODO] - Fix generic and default types
export type YooEditor<TNodes = any, TKey extends string = any> = {
  insertBlock: (data, options?: YooptaEditorTransformOptions) => void;
  splitBlock: (options?: YooptaEditorTransformOptions) => void;
  updateBlock: (id: string, data: Partial<YooptaChildrenValue>, options?: YooptaEditorTransformOptions) => void;
  deleteBlock: (options?: DeleteBlockOptions) => void;
  duplicateBlock: (options?: DuplicateBlockOptions) => void;
  getBlock: (options?: YooptaEditorTransformOptions) => void;
  increaseBlockDepth: (options?: YooptaEditorTransformOptions) => void;
  decreaseBlockDepth: (options?: YooptaEditorTransformOptions) => void;
  applyChanges: () => void;
  moveBlock: (blockId: string, to: YooptaBlockPath) => void;
  focusBlock: (id: string, options?: FocusBlockOptions) => void;
  selection: YooptaBlockPath | null;
  selectedBlocks: number[] | null;
  children: Record<string, YooptaChildrenValue>;
  getEditorValue: () => TNodes;
  setSelection: (path: YooptaBlockPath | null) => void;
  setBlockSelected: (path: number[] | null, options?: BlockSelectedOptions) => void;
  blur: (options?: EditorBlurOptions) => void;
  blockEditorsMap: YooptaPluginsEditorMap;
  blocks: YooptaBlocks;
  formats: YooptaFormats;
  shortcuts: Record<string, YooptaBlock>;
};

// types for slate values
export type SlateElement<K = string, T = any> = {
  id: string;
  type: K;
  children: Descendant[] | SlateElement[];
  props?: PluginElementProps<T>;
};

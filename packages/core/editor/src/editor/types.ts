import { Descendant, Path, Point } from 'slate';
import { Plugin, PluginElementsMap, PluginOptions, PluginElementProps } from '../plugins/types';
import { EditorBlurOptions } from './core/blur';
import { DeleteBlockOptions } from './blocks/deleteBlock';
import { DuplicateBlockOptions } from './blocks/duplicateBlock';
import { FocusBlockOptions } from './blocks/focusBlock';
import { ToggleBlockOptions } from './blocks/toggleBlock';
import { GetBlockOptions } from './blocks/getBlock';
import { ReactEditor } from 'slate-react';
import { ApplyTransformsOptions, YooptaOperation } from './core/applyTransforms';
import { InsertBlockOptions } from './blocks/insertBlock';
import { BlockDepthOptions } from './blocks/increaseBlockDepth';
import { SplitBlockOptions } from './blocks/splitBlock';
import { MergeBlockOptions } from './blocks/mergeBlock';
import { HistoryStack, HistoryStackName } from './core/history';

export type YooptaBlockData<T = Descendant | SlateElement> = {
  id: string;
  value: T[];
  type: string;
  meta: YooptaBlockBaseMeta;
};

export type YooptaBlockBaseMeta = {
  order: number;
  depth: number;
  align?: 'left' | 'center' | 'right' | undefined;
};

export type YooptaContentValue = Record<string, YooptaBlockData>;

export type SlateEditor = ReactEditor;

// add 'end' | 'start'
export type FocusAt = Path | Point;

export type YooptaPluginsEditorMap = Record<string, SlateEditor>;
export type YooptaPathIndex = number | null;
export type YooptaPath = {
  current: YooptaPathIndex;
  selected?: number[] | null;
};

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
  options?: PluginOptions<any>;
  elements: PluginElementsMap<string>;
  hasCustomEditor?: boolean;
  isActive: () => boolean;
};

export type YooptaBlocks = Record<string, YooptaBlock>;
export type YooptaFormats = Record<string, TextFormat>;

export type YooEditorEvents = 'change' | 'focus' | 'blur' | 'block:copy' | 'path-change';

export type BaseCommands = Record<string, (...args: any[]) => any>;

// [TODO] - Fix generic and default types
export type YooEditor = {
  id: string;
  readOnly: boolean;
  isEmpty: () => boolean;
  insertBlock: (type: string, options?: InsertBlockOptions) => string;
  updateBlock: (id: string, data: Partial<YooptaBlockData>) => void;
  deleteBlock: (options: DeleteBlockOptions) => void;
  duplicateBlock: (options: DuplicateBlockOptions) => void;
  toggleBlock: (toBlockType: string, options?: ToggleBlockOptions) => void;
  increaseBlockDepth: (options?: BlockDepthOptions) => void;
  decreaseBlockDepth: (options?: BlockDepthOptions) => void;
  moveBlock: (blockId: string, to: YooptaPathIndex) => void;
  focusBlock: (id: string, options?: FocusBlockOptions) => void;
  mergeBlock: (options?: MergeBlockOptions) => void;
  splitBlock: (options?: SplitBlockOptions) => void;
  getBlock: (options: GetBlockOptions) => YooptaBlockData | null;

  path: YooptaPath;
  setPath: (path: YooptaPath) => void;

  children: YooptaContentValue;
  getEditorValue: () => YooptaContentValue;
  setEditorValue: (value: YooptaContentValue) => void;
  blockEditorsMap: YooptaPluginsEditorMap;
  blocks: YooptaBlocks;
  formats: YooptaFormats;
  shortcuts: Record<string, YooptaBlock>;
  plugins: Record<string, Plugin<Record<string, SlateElement>, unknown>>;
  commands: Record<string, (...args: any[]) => any>;

  applyTransforms: (operations: YooptaOperation[], options?: ApplyTransformsOptions) => void;
  batchOperations: (fn: () => void) => void;
  redo: () => void;
  undo: () => void;
  historyStack: Record<HistoryStackName, HistoryStack[]>;

  // events handlers
  on: (event: YooEditorEvents, fn: (payload: any) => void) => void;
  once: (event: YooEditorEvents, fn: (payload: any) => void) => void;
  off: (event: YooEditorEvents, fn: (payload: any) => void) => void;
  emit: (event: YooEditorEvents, payload: any) => void;

  // focus handlers
  isFocused: () => boolean;
  blur: (options?: EditorBlurOptions) => void;
  focus: () => void;

  // parser handlers
  getHTML: (content: YooptaContentValue) => string;
  getMarkdown: (content: YooptaContentValue) => string;
  getPlainText: (content: YooptaContentValue) => string;

  // ref to editor element
  refElement: HTMLElement | null;
};

// types for slate values
export type SlateElement<K extends string = string, T = any> = {
  id: string;
  type: K;
  children: Descendant[] | SlateElement[];
  props?: PluginElementProps<T>;
};

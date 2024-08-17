import { Descendant, Path, Point } from 'slate';
import { Plugin, PluginElementsMap, PluginOptions, PluginElementProps } from '../plugins/types';
import { EditorBlurOptions } from './core/blur';
import { BlockSelectedOptions } from './selection/setBlockSelected';
import { SetSelectionOptions } from './selection/setSelection';
import { CreateBlockOptions } from './blocks/createBlock';
import { DeleteBlockOptions } from './blocks/deleteBlock';
import { DuplicateBlockOptions } from './blocks/duplicateBlock';
import { FocusBlockOptions } from './blocks/focusBlock';
import { ToggleBlockOptions } from './blocks/toggleBlock';
import { DeleteBlocksOptions } from './blocks/deleteBlocks';
import { GetBlockOptions } from './blocks/getBlock';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type YooptaBlockPath = [number];

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

export type SlateEditor = ReactEditor & HistoryEditor;

// add 'end' | 'start'
export type FocusAt = Path | Point;

export type YooptaEditorTransformOptions = {
  at?: YooptaBlockPath | null;
  focus?: boolean;
  focusAt?: FocusAt;
  slate?: SlateEditor;
  blockId?: string;
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
  options?: PluginOptions<any>;
  elements: PluginElementsMap<string>;
  hasCustomEditor?: boolean;
  isActive: () => boolean;
  create: (options?: CreateBlockOptions) => void;
  toggle: (options?: ToggleBlockOptions) => void;
  update: (id: string, data: Partial<YooptaBlockData>) => void;
  delete: (options: DeleteBlockOptions) => void;
};

export type YooptaBlocks = Record<string, YooptaBlock>;
export type YooptaFormats = Record<string, TextFormat>;

export type YooEditorEvents = 'change' | 'focus' | 'blur' | 'block:copy';

// [TODO] - Fix generic and default types
export type YooEditor<TNodes = any> = {
  id: string;
  readOnly: boolean;
  isEmpty: () => boolean;
  insertBlock: (data: YooptaBlockData, options?: YooptaEditorTransformOptions) => void;
  insertBlocks: (blocks: YooptaBlockData[], options?: YooptaEditorTransformOptions) => void;
  splitBlock: (options?: YooptaEditorTransformOptions) => void;
  updateBlock: (id: string, data: Partial<YooptaBlockData>) => void;
  deleteBlock: (options?: DeleteBlockOptions) => void;
  deleteBlocks: (options?: DeleteBlocksOptions) => void;
  duplicateBlock: (options?: DuplicateBlockOptions) => void;
  toggleBlock: (toBlockType: string, options?: ToggleBlockOptions) => void;
  increaseBlockDepth: (options?: YooptaEditorTransformOptions) => void;
  decreaseBlockDepth: (options?: YooptaEditorTransformOptions) => void;
  applyChanges: () => void;
  moveBlock: (blockId: string, to: YooptaBlockPath) => void;
  focusBlock: (id: string, options?: FocusBlockOptions) => void;
  getBlock: (options: GetBlockOptions) => YooptaBlockData | null;
  selection: YooptaBlockPath | null;
  selectedBlocks: number[] | null;
  children: YooptaContentValue;
  getEditorValue: () => TNodes;
  setEditorValue: (value: YooptaContentValue) => void;
  setSelection: (path: YooptaBlockPath | null, options?: SetSelectionOptions) => void;
  setBlockSelected: (path: number[] | null, options?: BlockSelectedOptions) => void;
  blockEditorsMap: YooptaPluginsEditorMap;
  blocks: YooptaBlocks;
  formats: YooptaFormats;
  shortcuts: Record<string, YooptaBlock>;
  plugins: Record<string, Plugin<string, unknown>>;

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

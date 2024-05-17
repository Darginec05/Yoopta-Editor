import { Descendant, Editor, NodeEntry, Path, Point } from 'slate';
import { Plugin, PluginElementsMap, PluginOptions, PluginElementProps } from '../plugins/types';
import { CreateBlockElementOptions } from './elements/createElement';
import { GetBlockElementEntryOptions } from './elements/getElementEntry';
import { EditorBlurOptions } from './selection/blur';
import { BlockSelectedOptions } from './selection/setBlockSelected';
import { SetSelectionOptions } from './selection/setSelection';
import { CreateBlockOptions } from './transforms/createBlock';
import { DeleteBlockOptions } from './transforms/deleteBlock';
import { DuplicateBlockOptions } from './transforms/duplicateBlock';
import { FocusBlockOptions } from './transforms/focusBlock';
import { ToggleBlockOptions } from './transforms/toggleBlock';

export type YooptaBlockPath = [number];

export type YooptaBlockData<T = Descendant | SlateElement> = {
  id: string;
  value: T[];
  type: string;
  meta: YooptaBlockBaseMeta;
};

export type YooptaContentValue = Record<string, YooptaBlockData>;

export type YooptaBlockBaseMeta = {
  order: number;
  depth: number;
};

export type SlateEditor = Editor;

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

  updateElement: <TElementKeys extends string, TElementProps>(
    blockId: string,
    elementType: TElementKeys,
    elementProps?: TElementProps,
  ) => void;
  createElement: <TElementKeys extends string, TElementProps>(
    blockId: string,
    elementType: TElementKeys,
    elementProps?: TElementProps,
    options?: CreateBlockElementOptions,
  ) => void;
  deleteElement: <TElementKeys extends string>(blockId: string, elementType: TElementKeys) => void;
  getElement: <TElementKeys extends string>(
    blockId: string,
    elementType: TElementKeys,
  ) => SlateElement<TElementKeys> | undefined;
  getElementEntry: <TElementKeys extends string>(
    blockId: string,
    elementType: TElementKeys,
    options?: GetBlockElementEntryOptions,
  ) => NodeEntry<SlateElement<TElementKeys>> | undefined;
  isElementEmpty: <TElementKeys extends string>(blockId: string, elementType: TElementKeys) => boolean | undefined;
};

export type YooptaBlocks = Record<string, YooptaBlock>;
export type YooptaFormats = Record<string, TextFormat>;

export type YooEditorEvents = 'change' | 'block:copy';

// [TODO] - Fix generic and default types
export type YooEditor<TNodes = any> = {
  id: string;
  insertBlock: (data: YooptaBlockData, options?: YooptaEditorTransformOptions) => void;
  insertBlocks: (blocks: YooptaBlockData[], options?: YooptaEditorTransformOptions) => void;
  splitBlock: (options?: YooptaEditorTransformOptions) => void;
  updateBlock: (id: string, data: Partial<YooptaBlockData>) => void;
  deleteBlock: (options?: DeleteBlockOptions) => void;
  duplicateBlock: (options?: DuplicateBlockOptions) => void;
  getBlock: (options?: YooptaEditorTransformOptions) => void;
  toggleBlock: (toBlockType?: string, options?: ToggleBlockOptions) => void;
  increaseBlockDepth: (options?: YooptaEditorTransformOptions) => void;
  decreaseBlockDepth: (options?: YooptaEditorTransformOptions) => void;
  applyChanges: () => void;
  moveBlock: (blockId: string, to: YooptaBlockPath) => void;
  focusBlock: (id: string, options?: FocusBlockOptions) => void;
  selection: YooptaBlockPath | null;
  selectedBlocks: number[] | null;
  children: Record<string, YooptaBlockData>;
  getEditorValue: () => TNodes;
  setEditorValue: (value: YooptaContentValue) => void;
  setSelection: (path: YooptaBlockPath | null, options?: SetSelectionOptions) => void;
  setBlockSelected: (path: number[] | null, options?: BlockSelectedOptions) => void;
  blur: (options?: EditorBlurOptions) => void;
  blockEditorsMap: YooptaPluginsEditorMap;
  blocks: YooptaBlocks;
  formats: YooptaFormats;
  shortcuts: Record<string, YooptaBlock>;
  plugins: Record<string, Plugin<string, unknown>>;
  on: (event: YooEditorEvents, fn: (payload: any) => void) => void;
  once: (event: YooEditorEvents, fn: (payload: any) => void) => void;
  off: (event: YooEditorEvents, fn: (payload: any) => void) => void;
  emit: (event: YooEditorEvents, payload: any) => void;
  readOnly: boolean;
};

// types for slate values
export type SlateElement<K extends string = string, T = any> = {
  id: string;
  type: K;
  children: Descendant[] | SlateElement[];
  props?: PluginElementProps<T>;
};

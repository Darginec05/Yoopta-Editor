import { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Descendant, Editor, Path } from 'slate';
import { RenderElementProps as RenderSlateElementProps, RenderLeafProps } from 'slate-react';
import { SlateEditor, SlateElement, YooEditor, YooptaBlockBaseMeta, YooptaBlockData } from '../editor/types';
import { YooptaMark } from '../marks';
import { EditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS_TYPE } from '../utils/hotkeys';

export type RenderPluginProps<TKeys extends string, TProps, TOptions> = {
  id: string;
  elements: Plugin<TKeys, TProps, TOptions>['elements'];
  marks?: YooptaMark<unknown>[];
};

export type PluginOptions<T> = {
  display?: {
    title?: string;
    description?: string;
    icon?: string | ReactNode | ReactElement;
  };
  shortcuts?: string[];
  HTMLAttributes?: HTMLAttributes<HTMLElement>;
} & T;

export type PluginElementOptions = {
  draggable?: boolean;
};

export type PluginElementExtendRenderProps = RenderSlateElementProps & {
  blockId: string;
  HTMLAttributes?: HTMLAttributes<HTMLElement>;
};

export type PluginElementRenderProps = PluginElementExtendRenderProps & {
  extendRender?: (props: PluginElementExtendRenderProps) => JSX.Element;
};

export type PluginCustomEditorRenderProps = {
  blockId: string;
};

export type PluginDefaultProps = { nodeType?: 'block' | 'inline' | 'void' | 'inlineVoid' };
export type PluginElementProps<T> = PluginDefaultProps & T;

export type PluginElement<T> = {
  render: (props: PluginElementRenderProps) => JSX.Element;
  props?: PluginElementProps<T>;
  options?: PluginElementOptions;
  asRoot?: boolean;
  children?: string[];
  rootPlugin?: string;
};

export type PluginElementsMap<TKeys extends string = string, TProps = PluginDefaultProps> = {
  [key in TKeys]: PluginElement<TProps>;
};

export type EventHandlers = {
  [key in keyof EditorEventHandlers]: (
    editor: YooEditor,
    slate: SlateEditor,
    options: PluginEventHandlerOptions,
  ) => EditorEventHandlers[key] | void;
};

export type PluginEventHandlerOptions = {
  hotkeys: HOTKEYS_TYPE;
  defaultBlock: YooptaBlockData;
  currentBlock: YooptaBlockData;
};

export type Plugin<TKeys extends string = string, TProps = Descendant, TOptions = Record<string, unknown>> = {
  type: string;
  customEditor?: (props: PluginCustomEditorRenderProps) => JSX.Element;
  elements: PluginElementsMap<TKeys, TProps>;
  events?: EventHandlers;
  options?: PluginOptions<TOptions>;
  parsers?: Partial<Record<PluginParserTypes, PluginParsers>>;
};

export type PluginParsers = {
  deserialize?: PluginDeserializeParser;
  serialize?: PluginserializeParser;
};

export type PluginParserTypes = 'html' | 'markdown';
export type PluginParserValues = 'deserialize' | 'serialize';

export type PluginserializeParser = (
  element: SlateElement,
  text: string,
  blockMetaData?: YooptaBlockBaseMeta,
) => string;

export type PluginDeserializeParser = {
  nodeNames: string[];
  parse?: (el: HTMLElement, editor: YooEditor) => SlateElement<string, any> | YooptaBlockData[] | void;
};

export type LeafFormats<K extends string, V> = {
  [key in K]: V;
};

export type ExtendedLeaf<K extends string, V> = RenderLeafProps['leaf'] & LeafFormats<K, V>;
export type YooptaMarkProps<K extends string, V> = { children: RenderLeafProps['children']; leaf: ExtendedLeaf<K, V> };

export type ExtendedLeafProps<K extends string, V> = RenderLeafProps & {
  leaf: ExtendedLeaf<K, V>;
};

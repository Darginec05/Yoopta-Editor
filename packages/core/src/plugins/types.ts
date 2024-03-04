import { Descendant, Editor, Editor as SlateEditor } from 'slate';
import { RenderElementProps as RenderSlateElementProps, RenderLeafProps } from 'slate-react';
import { YooEditor } from '../editor/types';
import { YooptaMark } from '../textFormatters/createYooptaMark';
import { EditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS_TYPE } from '../utils/hotkeys';

export type RenderPluginProps<TKeys extends string, TProps, TOptions> = {
  id: string;
  elements: PluginReturn<TKeys, TProps, TOptions>['elements'];
  marks?: YooptaMark<unknown>[];
};

export type PluginOptions<T> = {
  displayLabel?: string;
  shortcuts?: string[];
} & T;

export type PluginReturn<TKeys extends string, TProps, TOptions = Record<string, unknown>> = {
  type: string;
  renderPlugin: (props: RenderPluginProps<TKeys, TProps, TOptions>) => JSX.Element;
  elements: PluginParams<TKeys, TProps>['elements'];
  options?: PluginOptions<TOptions>;
};

export type PluginElementOptions = {
  draggable?: boolean;
};

export type CustomEditorProps = Omit<RenderPluginProps<any, any, any>, 'elements'> &
  Pick<PluginReturn<string, unknown, unknown>, 'type'> & { editor: SlateEditor };

export type PluginElementRenderProps<TPluginOptions> = RenderSlateElementProps & {
  pluginId: string;
  options?: TPluginOptions;
};

export type PluginElementProps<T> = { nodeType?: 'block' | 'inline' | 'void' | 'inlineVoid' } & T;

export type PluginElement<T, TPluginOptions = Record<string, unknown>> = {
  render: (props: PluginElementRenderProps<TPluginOptions>) => JSX.Element;
  props?: PluginElementProps<T>;
  options?: PluginElementOptions;
  asRoot?: boolean;
  children?: string[];
};

export type PluginElementsMap<TKeys extends string | number | symbol, TProps> = {
  [key in TKeys]: PluginElement<TProps>;
};

type HandlersOptions = {
  hotkeys: HOTKEYS_TYPE;
  defaultPlugin: PluginReturn<string, unknown, unknown>;
};

export type EventHandlers = {
  [key in keyof EditorEventHandlers]: (
    editor: YooEditor,
    slate: Editor,
    options: HandlersOptions,
  ) => EditorEventHandlers[key] | void;
};

export type PluginParams<TKeys extends string = string, TProps = Descendant, TOptions = Record<string, unknown>> = {
  type: string;
  // render?: (props: RenderSlateElementProps) => JSX.Element;
  customEditor?: (props: CustomEditorProps) => JSX.Element;
  elements: PluginElementsMap<TKeys, TProps>;
  events?: EventHandlers;
  options?: PluginOptions<TOptions>;
};

export type LeafFormats<K extends string, V> = {
  [key in K]: V;
};

export type ExtendedLeaf<K extends string, V> = RenderLeafProps['leaf'] & LeafFormats<K, V>;
export type YooptaMarkProps<K extends string, V> = { children: RenderLeafProps['children']; leaf: ExtendedLeaf<K, V> };

export type ExtendedLeafProps<K extends string, V> = RenderLeafProps & {
  leaf: ExtendedLeaf<K, V>;
};

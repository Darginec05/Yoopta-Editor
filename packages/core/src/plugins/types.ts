import { Descendant, Editor, Editor as SlateEditor } from 'slate';
import { RenderElementProps as RenderSlateElementProps, RenderLeafProps } from 'slate-react';
import { YooEditor } from '../editor/types';
import { YooptaMark } from '../textFormatters/createYooptaMark';
import { EditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS_TYPE } from '../utils/hotkeys';

export type RenderPluginProps = {
  id: string;
  elements: PluginReturn['elements'];
  marks?: YooptaMark<unknown>[];
};

export type PluginOptions = {
  displayLabel?: string;
  shortcuts?: string[];
  withCustomEditor?: boolean;
};

export type PluginReturn = {
  type: string;
  renderPlugin: (props: RenderPluginProps) => JSX.Element;
  elements: PluginParams<unknown>['elements'];
  options?: PluginOptions;
};

export type PluginElementOptions = {
  draggable?: boolean;
};

export type CustomEditorProps = Omit<RenderPluginProps, 'elements'> &
  Pick<PluginReturn, 'type'> & { editor: SlateEditor };

export type PluginElementRenderProps = RenderSlateElementProps & {
  pluginId: string;
};

export type PluginElementProps<T> = { nodeType?: 'block' | 'inline' | 'void' | 'inlineVoid' } & T;

export type PluginElement<T> = {
  render: (props: PluginElementRenderProps) => JSX.Element;
  props?: PluginElementProps<T>;
  options?: PluginElementOptions;
  asRoot?: boolean;
  children?: string[];
};

export type PluginElementsMap<T> = {
  [key: string]: PluginElement<T>;
};

type HandlersOptions = {
  hotkeys: HOTKEYS_TYPE;
  defaultPlugin: PluginReturn;
};

export type EventHandlers = {
  [key in keyof EditorEventHandlers]: (
    editor: YooEditor,
    slate: Editor,
    options: HandlersOptions,
  ) => EditorEventHandlers[key] | void;
};

export type PluginParams<T = Descendant> = {
  type: string;
  // render?: (props: RenderSlateElementProps) => JSX.Element;
  customEditor?: (props: CustomEditorProps) => JSX.Element;
  elements: PluginElementsMap<T>;
  events?: EventHandlers;
  options?: PluginOptions;
};

export type LeafFormats<K extends string, V> = {
  [key in K]: V;
};

export type ExtendedLeaf<K extends string, V> = RenderLeafProps['leaf'] & LeafFormats<K, V>;
export type YooptaMarkProps<K extends string, V> = { children: RenderLeafProps['children']; leaf: ExtendedLeaf<K, V> };

export type ExtendedLeafProps<K extends string, V> = RenderLeafProps & {
  leaf: ExtendedLeaf<K, V>;
};

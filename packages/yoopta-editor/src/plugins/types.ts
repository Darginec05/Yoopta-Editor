import { Descendant, Editor, Editor as SlateEditor } from 'slate';
import { RenderElementProps as RenderSlateElementProps, RenderLeafProps } from 'slate-react';
import { YooEditor } from '../editor/types';
import { YooptaMark } from '../textFormatters/createYooptaMark';
import { EditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS_TYPE } from '../utils/hotkeys';

export type RenderPluginProps = {
  id: string;
  elements: Plugin['elements'];
  marks?: YooptaMark<unknown>[];
};

export type Plugin = {
  type: string;
  renderPlugin: (props: RenderPluginProps) => JSX.Element;
  elements: PluginParams<unknown>['elements'];
};

export type PluginElementOptions = {
  nodeType?: 'block' | 'inline' | 'void' | ['inline', 'void'];
  draggable?: boolean;
};

export type CustomEditorProps = Omit<RenderPluginProps, 'elements'> & Pick<Plugin, 'type'> & { editor: SlateEditor };

export type PluginElement<T> = {
  render: (props: RenderSlateElementProps) => JSX.Element;
  // [TODO] - MAYBE nodeProps(?)
  elementProps?: T;
  options?: PluginElementOptions;
};

export type PluginElementsMap<T> = {
  [key: string]: PluginElement<T>;
};

type HandlersOptions = {
  hotkeys: HOTKEYS_TYPE;
  defaultNode: Element;
};

type EventHandlers = {
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
};

export type LeafFormats<K extends string, V> = {
  [key in K]: V;
};

export type ExtendedLeaf<K extends string, V> = RenderLeafProps['leaf'] & LeafFormats<K, V>;
export type YooptaMarkProps<K extends string, V> = { children: RenderLeafProps['children']; leaf: ExtendedLeaf<K, V> };

export type ExtendedLeafProps<K extends string, V> = RenderLeafProps & {
  leaf: ExtendedLeaf<K, V>;
};

import { Descendant, Editor as SlateEditor } from 'slate';
import { RenderElementProps as RenderSlateElementProps, RenderLeafProps } from 'slate-react';
import { LeafColorProps, YooptaMark } from '../textFormatters/createYooptaMark';

export type RenderPluginProps = {
  id: string;
  elements: Plugin['elements'];
  marks?: YooptaMark[];
};

export type Plugin = {
  type: string;
  renderPlugin: (props: RenderPluginProps) => JSX.Element;
  elements: PluginParams<unknown>['elements'];
};

export type PluginElementOptions = {
  isVoid?: boolean;
  isInline?: boolean;
};

export type CustomEditorProps = Omit<RenderPluginProps, 'elements'> & Pick<Plugin, 'type'> & { editor: SlateEditor };

export type PluginElement<T> = {
  render: (props: RenderSlateElementProps) => JSX.Element;
  props?: T;
  options?: PluginElementOptions;
};

export type PluginElementsMap<T> = {
  [key: string]: PluginElement<T>;
};

export type PluginParams<T = Descendant> = {
  type: string;
  render?: (props: RenderSlateElementProps) => JSX.Element;
  customEditor?: (props: CustomEditorProps) => JSX.Element;
  elements: PluginElementsMap<T>;
};

export type LeafFormats<K extends string, V> = {
  [key in K]: V;
};

export type ExtendedLeaf<K extends string, V> = RenderLeafProps['leaf'] & LeafFormats<K, V>;
export type YooptaMarkProps<K extends string, V> = { children: RenderLeafProps['children']; leaf: ExtendedLeaf<K, V> };

export type ExtendedLeafProps<K extends string, V> = RenderLeafProps & {
  leaf: ExtendedLeaf<K, V>;
};

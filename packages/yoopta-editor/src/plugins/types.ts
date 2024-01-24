import { Descendant, Editor as SlateEditor } from 'slate';
import { RenderElementProps as RenderSlateElementProps } from 'slate-react';

export type RenderPluginProps = {
  id: string;
  elements: Plugin['elements'];
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
  component: (props: RenderSlateElementProps) => JSX.Element;
  props?: T;
  options?: PluginElementOptions;
};

export type PluginElementsMap<T> = {
  [key: string]: PluginElement<T>;
};

export type PluginParams<T = Descendant> = {
  type: string;
  render?: (props: RenderSlateElementProps) => JSX.Element;
  // options?: PluginElementOptions;
  customEditor?: (props: CustomEditorProps) => JSX.Element;
  elements: PluginElementsMap<T>;
};

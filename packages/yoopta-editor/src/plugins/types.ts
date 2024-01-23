import { ReactNode } from 'react';
import { Editor as SlateEditor } from 'slate';
import { RenderElementProps as RenderSlateElementProps } from 'slate-react';

export type RenderPluginProps = {
  id: string;
};

export type Plugin = {
  type: string;
  renderPlugin: (props: RenderPluginProps) => JSX.Element;
};

export type PluginOptions = {
  isVoid?: boolean;
  isInline?: boolean;
};

export type CustomEditorProps = RenderPluginProps & Pick<Plugin, 'type'> & { editor: SlateEditor };

export type CreatePluginParams<T> = {
  type: string;
  render: (props: RenderSlateElementProps) => JSX.Element;
  options?: PluginOptions;
  customEditor?: (props: CustomEditorProps) => ReactNode;
  nodeProps?: T;
};

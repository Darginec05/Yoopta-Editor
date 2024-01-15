import { ReactNode } from 'react';
import { Editor } from 'slate';
import { RenderElementProps } from 'slate-react';
import { UltraYooptaContextPlugin } from './contexts/UltraYooptaContext/UltraYooptaContext';

export type UltraPluginProps = {
  id: string;
  value: any[];
  onChange: (id: string, value: any[]) => void;
  selection: number[] | null;
  meta: UltraYooptaContextPlugin['meta'];
};

export type UltraPlugin = {
  type: string;
  renderPlugin: (props: UltraPluginProps) => ReactNode;
};

export type UltraPluginCreateOptions = {
  isVoid?: boolean;
};

export type CustomEditorProps = UltraPluginProps & Pick<UltraPlugin, 'type'> & { editor: Editor };

export type ElementMetaData<T> = {
  id: string;
} & T;

export type UltraPluginBaseParam<T> = {
  id?: string;
  type: string;
  options?: UltraPluginCreateOptions;
  render?: (props: RenderElementProps) => JSX.Element;
  customEditor?: (props: CustomEditorProps) => ReactNode;
};

import { ReactNode } from 'react';
import { Editor } from 'slate';
import { RenderElementProps } from 'slate-react';
import { YooptaEditorSlateBaseData } from '../../editor/types';

export type UltraPluginProps = {
  id: string;
  // value: any[];
  // onChange: (id: string, value: any[]) => void;
  // meta: UltraYooptaContextPlugin['meta'];
};

export type UltraPlugin = {
  type: string;
  renderPlugin: (props: UltraPluginProps) => ReactNode;
};

export type UltraPluginCreateOptions = {
  isVoid?: boolean;
  isInline?: boolean;
};

export type CustomEditorProps = UltraPluginProps & Pick<UltraPlugin, 'type'> & { editor: Editor };

export type CreateUltraPluginBaseParam<T> = {
  id?: string;
  type: string;
  options?: UltraPluginCreateOptions;
  render?: (props: RenderElementProps) => JSX.Element;
  props?: T;
  customEditor?: (props: CustomEditorProps) => ReactNode;
};

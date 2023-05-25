import { BaseEditor, BaseElement } from 'slate';
import { ReactEditor, RenderElementProps as ElementProps } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { YooptaPluginType, YooptaRenderHTMLAttributes } from './utils/plugins';

export type EmptyText = {
  text: string;
};

export type YooptaElementConfig = {
  nodeType: 'block' | 'inline' | 'void';
};

export type Modify<T, R> = Omit<T, keyof R> & R;

export type YooptaBaseElement<T> = {
  id: string;
  type: T;
  children: BaseElement['children'];
  // @ts-ignore [TODO: make it generic]
  data?: any;
} & YooptaElementConfig;

export type RenderYooptaElementProps<T extends BaseElement = BaseElement> = ElementProps & {
  element: T;
} & YooptaRenderHTMLAttributes;

export interface YooEditor extends BaseEditor, ReactEditor, HistoryEditor {
  shortcuts: Record<string, YooptaPluginType<string>>;
  plugins: Record<YooptaBaseElement<string>['type'], YooptaPluginType<any, YooptaBaseElement<string>>>;
}

import { BaseEditor, BaseElement } from 'slate';
import { ReactEditor, RenderElementProps as ElementProps } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import { YoptaPluginType } from './utils/plugins';

export type EmptyText = {
  text: string;
};

export type YoptaElementConfig = {
  nodeType: 'block' | 'inline' | 'void';
};

export type Modify<T, R> = Omit<T, keyof R> & R;

export type YoptaBaseElement<T> = { id: string; type: T; children: BaseElement['children'] } & YoptaElementConfig;

export type RenderElementProps<T extends BaseElement = BaseElement> = ElementProps & { element: T };

export interface YoEditor extends BaseEditor, ReactEditor, HistoryEditor {
  shortcuts: Record<string, YoptaPluginType<string>>;
  plugins: Record<YoptaBaseElement<string>['type'], YoptaPluginType<any, YoptaBaseElement<string>>>;
}

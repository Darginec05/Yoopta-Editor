import { BaseEditor, BaseElement } from 'slate';
import { ReactEditor, RenderElementProps as ElementProps } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type EmptyText = {
  text: string;
};

type ExtendedType<T, K> =
  | K
  | {
      [key in keyof T]: T[key];
    };

export type YoElement<T extends Record<string, unknown> = Record<string, unknown>> = ExtendedType<T, BaseElement>;

export type YoBaseElement<T extends string, C extends BaseElement['children'] = BaseElement['children']> = YoElement<{
  id: string;
  type: T;
  children: C;
}>;

export type RenderElementProps<T extends BaseElement = BaseElement> = ElementProps & { element: T };

export interface YoEditor extends BaseEditor, ReactEditor, HistoryEditor {
  shortcuts: Record<string, unknown>;
}

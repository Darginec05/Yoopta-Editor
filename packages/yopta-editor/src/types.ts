import { BaseEditor, BaseElement, Node } from 'slate';
import { ReactEditor, RenderElementProps as ElementProps } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type EmptyText = {
  text: string;
};

export interface YoElement extends BaseElement {}

export type RenderElementProps<T extends BaseElement = BaseElement> = ElementProps & { element: T };

export interface YoEditor extends BaseEditor, ReactEditor, HistoryEditor {
  shortcuts: Record<string, unknown>;
}

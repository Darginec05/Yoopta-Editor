import { ReactNode } from 'react';
import { Editor, Element, NodeEntry, Range } from 'slate';
import { RenderElementProps } from 'slate-react';
import { YoptaEditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS_TYPE } from '../utils/hotkeys';

export type HandlersOptions = {
  hotkeys: HOTKEYS_TYPE;
  defaultComponent: Element;
};

export type DecoratorFn = (nodeEntry: NodeEntry) => Range[];
export type YoptaComponentHandlers = {
  [key in keyof YoptaEditorEventHandlers]: (
    editor: Editor,
    options: HandlersOptions,
  ) => YoptaEditorEventHandlers[key] | void;
};

export type YoptaComponent = {
  type: string;
  renderer: (editor: Editor) => (props: RenderElementProps) => ReactNode;
  shortcut?: string;
  decorator?: (editor: Editor) => DecoratorFn;
  handlers?: YoptaComponentHandlers;
};

export const createYoptaComponent = (component: YoptaComponent): YoptaComponent => component;

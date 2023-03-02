import { Element, NodeEntry, Range } from 'slate';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { CustomEditor } from '../components/Editor/types';
import { YoptaEditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS_TYPE } from '../utils/hotkeys';

export type HandlersOptions = {
  hotkeys: HOTKEYS_TYPE;
  defaultComponent: Element;
};

export type ElementType = {
  type: 'block' | 'inline';
  isVoid: boolean;
};

export type DecoratorFn = (nodeEntry: NodeEntry) => Range[];
export type YoptaComponentHandlers = {
  [key in keyof YoptaEditorEventHandlers]: (
    editor: CustomEditor,
    options: HandlersOptions,
  ) => YoptaEditorEventHandlers[key] | void;
};

type Options = Record<string, unknown>;

export type YoptaComponent = {
  type: string;
  // renderer: (editor: CustomEditor) => (props: RenderElementProps) => ReactNode;
  renderer: (editor: CustomEditor) => (props: RenderElementProps) => any;
  shortcut?: string;
  decorator?: (editor: CustomEditor) => DecoratorFn;
  handlers?: YoptaComponentHandlers;
  element?: ElementType;
  extendEditor?: (editor: CustomEditor) => CustomEditor;
  leaf?: (editor: CustomEditor) => (props: RenderLeafProps) => any;
  options?: Options;
};

export const createYoptaComponent = (component: YoptaComponent): YoptaComponent => {
  const { type = 'block', isVoid = false } = component.element || {};

  return {
    ...component,
    element: {
      type,
      isVoid,
    },
  };
};

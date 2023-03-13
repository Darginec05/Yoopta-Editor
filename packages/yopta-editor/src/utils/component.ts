import { ReactElement } from 'react';
import { Element, NodeEntry, Range } from 'slate';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { CustomEditor } from '../components/Editor/types';
import { EditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS_TYPE } from '../utils/hotkeys';

export type HandlersOptions = {
  hotkeys: HOTKEYS_TYPE;
  defaultComponent: Element;
};

export type ElementType = {
  type?: 'block' | 'inline';
  isVoid?: boolean;
};

export type DecoratorFn = (nodeEntry: NodeEntry) => Range[];
export type YoptaComponentHandlers = {
  [key in keyof EditorEventHandlers]: (
    editor: CustomEditor,
    options: HandlersOptions,
  ) => EditorEventHandlers[key] | void;
};

type Options = Record<string, unknown>;

export type YoptaComponentType = {
  type: string;
  renderer: (
    editor: CustomEditor,
    component: Pick<YoptaComponentType, 'type' | 'options'>,
  ) => (props: RenderElementProps) => ReactElement;
  shortcut?: string;
  decorator?: (editor: CustomEditor) => DecoratorFn;
  handlers?: YoptaComponentHandlers;
  element?: ElementType;
  extendEditor?: (editor: CustomEditor) => CustomEditor;
  leaf?: (editor: CustomEditor) => (props: RenderLeafProps) => any;
  options?: Options;
  children?: YoptaComponent;
};

export class YoptaComponent {
  #props: YoptaComponentType;

  constructor(inputComponent: YoptaComponentType) {
    this.#props = Object.freeze({ ...inputComponent });
  }

  extend(overrides: Partial<YoptaComponentType>) {
    const updatedProps = Object.freeze({ ...this.#props, ...overrides });

    return new YoptaComponent(updatedProps);
  }

  get getProps(): YoptaComponentType {
    return this.#props;
  }
}

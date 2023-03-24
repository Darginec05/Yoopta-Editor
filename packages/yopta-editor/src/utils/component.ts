import uniqWith from 'lodash.uniqwith';
import { ReactElement } from 'react';
import { Element, NodeEntry, Range } from 'slate';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { CustomEditor } from '../components/Editor/types';
import { EditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS_TYPE } from '../utils/hotkeys';

export type HandlersOptions = {
  hotkeys: HOTKEYS_TYPE;
  defaultNode: Element;
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
  createNode?: (editor: CustomEditor, type: string, data?: any) => void;
};

export type ParentYoptaComponent = Omit<YoptaComponentType, 'children'>;

export class YoptaComponent {
  #props: YoptaComponentType;

  constructor(inputComponent: YoptaComponentType) {
    this.#props = Object.freeze({ ...inputComponent });
  }

  extend(overrides: Partial<YoptaComponentType>) {
    const updatedProps = Object.freeze({ ...this.#props, ...overrides });

    return new YoptaComponent(updatedProps);
  }

  get getComponent(): YoptaComponentType {
    return this.#props;
  }
}

export function getParentComponents(components: YoptaComponent[]) {
  const items: ParentYoptaComponent[] = components
    .map((instance) => {
      const component = instance.getComponent;
      const { children, ...restComponentProps } = component;
      return children ? [restComponentProps, children.getComponent] : component;
    })
    .flat();

  const uniqueComponents = uniqWith(items, (a, b) => a.type === b.type);
  return uniqueComponents;
}

import uniqWith from 'lodash.uniqwith';
import { ReactElement } from 'react';
import { Element, NodeEntry, Range } from 'slate';
import { RenderElementProps, RenderLeafProps } from 'slate-react';
import { CustomEditor } from '../components/Editor/types';
import { EditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS_TYPE } from './hotkeys';

export type HandlersOptions = {
  hotkeys: HOTKEYS_TYPE;
  defaultNode: Element;
};

export type ElementType = {
  type?: 'block' | 'inline';
  isVoid?: boolean;
};

export type DecoratorFn = (nodeEntry: NodeEntry) => Range[];
export type YoptaPluginHandlers = {
  [key in keyof EditorEventHandlers]: (
    editor: CustomEditor,
    options: HandlersOptions,
  ) => EditorEventHandlers[key] | void;
};

type Options = Record<string, unknown>;

export type YoptaPluginType = {
  type: string;
  renderer: (
    editor: CustomEditor,
    component: Pick<YoptaPluginType, 'type' | 'options'>,
  ) => (props: RenderElementProps) => ReactElement;
  shortcut?: string;
  decorator?: (editor: CustomEditor) => DecoratorFn;
  handlers?: YoptaPluginHandlers;
  element?: ElementType;
  extendEditor?: (editor: CustomEditor) => CustomEditor;
  leaf?: (editor: CustomEditor) => (props: RenderLeafProps) => any;
  options?: Options;
  childPlugin?: YoptaPlugin;
  isChild?: boolean;
  createNode?: (editor: CustomEditor, type: string, data?: any) => void;
};

export type ParentYoptaPlugin = Omit<YoptaPluginType, 'childPlugin' | 'isChild'>;

export class YoptaPlugin {
  #props: YoptaPluginType;

  constructor(inputPlugin: YoptaPluginType) {
    this.#props = Object.freeze({ ...inputPlugin });
  }

  extend(overrides: Partial<YoptaPluginType>) {
    const updatedProps = Object.freeze({ ...this.#props, ...overrides });

    return new YoptaPlugin(updatedProps);
  }

  get getPlugin(): YoptaPluginType {
    return this.#props;
  }
}

export function mergeComponents(plugins: YoptaPlugin[]): YoptaPluginType[] {
  console.log('plugins', plugins);

  const items: YoptaPluginType[] = plugins
    .map((instance) => {
      const { childPlugin, ...componentProps } = instance.getPlugin;
      return childPlugin ? [componentProps, { ...childPlugin.getPlugin, isChild: true }] : componentProps;
    })
    .flat();

  const uniquePlugins = uniqWith(items, (a, b) => a.type === b.type);
  return uniquePlugins;
}

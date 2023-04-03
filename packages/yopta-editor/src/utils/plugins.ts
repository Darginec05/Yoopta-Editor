import uniqWith from 'lodash.uniqwith';
import { ReactElement, ReactNode } from 'react';
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

export type YoptaRenderElementFunc = (
  editor: CustomEditor,
  plugin: Pick<YoptaPluginType, 'type' | 'options'>,
) => (props: RenderElementProps) => ReactElement;

export type YoptaRender = YoptaRenderElementFunc;

export type ExtendedYoptaRender = {
  editor: YoptaRenderElementFunc;
  render?: YoptaRenderElementFunc;
};

export type YoptaRenderer = ExtendedYoptaRender | YoptaRender;

export type YoptaPluginType<O = Options> = {
  type: string;
  renderer: YoptaRenderer;
  shortcut?: string;
  decorator?: (editor: CustomEditor) => DecoratorFn;
  handlers?: YoptaPluginHandlers;
  element?: ElementType;
  extendEditor?: (editor: CustomEditor) => CustomEditor;
  leaf?: (editor: CustomEditor) => (props: RenderLeafProps) => any;
  options?: O;
  childPlugin?: YoptaPlugin<O>;
  isChild?: boolean;
  createNode?: (editor: CustomEditor, type: string, data?: any) => void;
};

export type ParentYoptaPlugin<O = Options> = Omit<YoptaPluginType<O>, 'childPlugin' | 'isChild'>;

export class YoptaPlugin<O = Options> {
  #props: YoptaPluginType<O>;

  constructor(inputPlugin: YoptaPluginType<O>) {
    this.#props = Object.freeze({ ...inputPlugin });
  }

  extend<P extends O>(overrides: Partial<YoptaPluginType<P>>) {
    const updatedProps = Object.freeze({ ...this.#props, ...overrides });

    return new YoptaPlugin(updatedProps);
  }

  get getPlugin(): YoptaPluginType<O> {
    return this.#props;
  }
}

export function mergePlugins(plugins: YoptaPlugin[]): YoptaPluginType[] {
  const items: YoptaPluginType[] = plugins
    .map((instance) => {
      const { childPlugin, ...componentProps } = instance.getPlugin;
      return childPlugin ? [componentProps, { ...childPlugin.getPlugin, isChild: true }] : componentProps;
    })
    .flat();

  const uniquePlugins = uniqWith(items, (a, b) => a.type === b.type);
  return uniquePlugins;
}

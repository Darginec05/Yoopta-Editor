import uniqWith from 'lodash.uniqwith';
import { ReactElement } from 'react';
import { Element, NodeEntry, Range } from 'slate';
import { RenderLeafProps } from 'slate-react';
import { YoEditor, RenderElementProps, YooptaBaseElement } from '../types';
import { EditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS_TYPE } from './hotkeys';

export type HandlersOptions = {
  hotkeys: HOTKEYS_TYPE;
  defaultNode: Element;
};

export type DecoratorFn = (nodeEntry: NodeEntry) => Range[];
export type YooptaPluginEventHandlers = {
  [key in keyof EditorEventHandlers]: (editor: YoEditor, options: HandlersOptions) => EditorEventHandlers[key] | void;
};

export type YooptaPluginBaseOptions = Record<string, unknown>;

export type YooptaRenderElementFunc<P extends YooptaBaseElement<string> = YooptaBaseElement<string>> = (
  editor: YoEditor,
  plugin: YooptaPluginType,
) => (props: RenderElementProps<P>) => ReactElement;

export type YooptaRender<P extends YooptaBaseElement<string>> = YooptaRenderElementFunc<P>;

export type ExtendedYooptaRender<P extends YooptaBaseElement<string>> = {
  editor: YooptaRenderElementFunc<P>;
  render: (props: RenderElementProps<P>) => ReactElement;
};

export type YooptaRenderer<P extends YooptaBaseElement<string>> = ExtendedYooptaRender<P> | YooptaRender<P>;

type DeserializeHTML = { nodeName: string | string[]; parse?: (el: HTMLElement) => any };

type Serializes<T, S> = {
  serialize?: (node: T, text: string) => string;
  deserialize?: S;
  // deserialize: (node: T, text: string) => string;
};

type Exports<T> = {
  html: Serializes<T, DeserializeHTML>;
  markdown: Serializes<T, { mark: string; parse: (mark: any) => any }>;
};

export type YooptaPluginType<
  O = YooptaPluginBaseOptions,
  P extends YooptaBaseElement<string> = YooptaBaseElement<string>,
> = {
  type: string;
  renderer: YooptaRenderer<P>;
  shortcut?: string | string[];
  decorator?: (editor: YoEditor) => DecoratorFn;
  events?: YooptaPluginEventHandlers;
  extendEditor?: (editor: YoEditor) => YoEditor;
  leaf?: (editor: YoEditor) => (props: RenderLeafProps) => any;
  placeholder?: string | null;
  options?: O;
  childPlugin?: YooptaPlugin<any, any>;
  hasParent?: boolean;
  createElement?: (editor: YoEditor) => void;
  defineElement: () => P;
  exports?: Exports<P>;
};

export type ParentYooptaPlugin<O = YooptaPluginBaseOptions> = Omit<YooptaPluginType<O>, 'childPlugin' | 'hasParent'>;

export class YooptaPlugin<O extends YooptaPluginBaseOptions, P extends YooptaBaseElement<string>> {
  #props: YooptaPluginType<O, P>;

  constructor(inputPlugin: YooptaPluginType<O, P>) {
    this.#props = Object.freeze({ ...inputPlugin });
  }

  extend(overrides: Partial<YooptaPluginType<O, P>>) {
    const updatedProps = Object.freeze({ ...this.#props, ...overrides });

    return new YooptaPlugin<O, P>(updatedProps);
  }

  get getPlugin(): YooptaPluginType<O, P> {
    return this.#props;
  }
}

export function createYooptaPlugin<O extends YooptaPluginBaseOptions, P extends YooptaBaseElement<string>>(
  input: YooptaPluginType<O, P>,
) {
  return new YooptaPlugin<O, P>(input);
}

export function mergePlugins<O extends YooptaPluginBaseOptions, P extends YooptaBaseElement<string>>(
  plugins: YooptaPlugin<O, P>[],
): YooptaPluginType<O, P>[] {
  const items: YooptaPluginType<O, P>[] = plugins
    .map((instance) => {
      const { childPlugin, ...componentProps } = instance.getPlugin;
      return childPlugin ? [componentProps, { ...childPlugin.getPlugin, hasParent: true }] : componentProps;
    })
    .flat();

  const uniquePlugins = uniqWith(items, (a, b) => a.type === b.type);
  return uniquePlugins;
}

export function mergePluginTypesToMap(
  plugins: YooptaPluginType<any, YooptaBaseElement<string>>[],
): Record<YooptaBaseElement<string>['type'], YooptaPluginType<any, YooptaBaseElement<string>>> {
  const PLUGINS_MAP = {};
  plugins.forEach((plugin) => (PLUGINS_MAP[plugin.type] = plugin));
  return PLUGINS_MAP;
}

// const YooptaPlugin: YooptaPlugin = (props) => {
//   const frozenProps = Object.freeze({ ...props });

//   const extend = (overrides: Partial<YooptaPluginType>) => YooptaPlugin(Object.freeze({ ...frozenProps, ...overrides }));

//   const getPlugin = () => frozenProps;

//   return {
//     extend,
//     getPlugin,
//   };
// };

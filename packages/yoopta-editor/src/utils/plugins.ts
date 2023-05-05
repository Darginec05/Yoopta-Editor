import uniqWith from 'lodash.uniqwith';
import { HTMLAttributes, ReactElement } from 'react';
import { Element, NodeEntry, Range } from 'slate';
import { RenderLeafProps } from 'slate-react';
import { YoEditor, RenderYooptaElementProps, YooptaBaseElement } from '../types';
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
) => (props: RenderYooptaElementProps<P>) => ReactElement;

export type YooptaRender<P extends YooptaBaseElement<string>> = YooptaRenderElementFunc<P>;

export type ExtendedYooptaRender<P extends YooptaBaseElement<string>> = {
  editor: YooptaRenderElementFunc<P>;
  render: (props: RenderYooptaElementProps<P>) => ReactElement;
};

export type YooptaRenderHTMLAttributes = {
  props: HTMLAttributes<HTMLElement>;
};

export type YooptaRenderer<P extends YooptaBaseElement<string>> = ExtendedYooptaRender<P> | YooptaRender<P>;
// | YooptaRenderHTMLAttributes;

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
  placeholder?: string | null;
  shortcut?: string | string[];
  exports?: Exports<P>;
  events?: YooptaPluginEventHandlers;
  options?: O & { HTMLAttributes?: HTMLAttributes<HTMLElement> };
  extendEditor?: (editor: YoEditor) => YoEditor;
  decorator?: (editor: YoEditor) => DecoratorFn;
  leaf?: (editor: YoEditor) => (props: RenderLeafProps) => any;
  childPlugin?: YooptaPlugin<any, any>;
  hasParent?: boolean;
  createElement?: (editor: YoEditor) => void;
  defineElement: () => P;
};

export type ParentYooptaPlugin<O = YooptaPluginBaseOptions> = Omit<YooptaPluginType<O>, 'childPlugin' | 'hasParent'>;

export class YooptaPlugin<O extends YooptaPluginBaseOptions, P extends YooptaBaseElement<string>> {
  #props: Readonly<YooptaPluginType<O, P>>;

  constructor(inputPlugin: YooptaPluginType<O, P>) {
    this.#props = Object.freeze({ ...inputPlugin });
  }

  extend(
    overrides: Partial<
      Pick<
        YooptaPluginType<O, P>,
        'type' | 'renderer' | 'placeholder' | 'shortcut' | 'exports' | 'events' | 'options' | 'extendEditor'
      >
    >,
  ) {
    const {
      type = this.#props.type,
      renderer = this.#props.renderer,
      placeholder = this.#props.placeholder,
      shortcut = this.#props.shortcut,
      exports = this.#props.exports,
      events = this.#props.events,
      options = this.#props.options,
    } = overrides;

    console.log('this.#props', this.#props.renderer);
    console.log('renderer', renderer);

    const updatedProps = Object.freeze({
      ...this.#props,
      type,
      renderer,
      placeholder,
      shortcut,
      exports,
      events,
      options,
    });

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

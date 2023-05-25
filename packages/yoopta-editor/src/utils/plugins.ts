import uniqWith from 'lodash.uniqwith';
import { HTMLAttributes, ReactElement } from 'react';
import { Element, NodeEntry, Range } from 'slate';
import { RenderLeafProps } from 'slate-react';
import { YooEditor, RenderYooptaElementProps, YooptaBaseElement } from '../types';
import { EditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS_TYPE } from './hotkeys';

export type HandlersOptions = {
  hotkeys: HOTKEYS_TYPE;
  defaultNode: Element;
};

export type DecoratorFn = (nodeEntry: NodeEntry) => Range[];
export type YooptaPluginEventHandlers = {
  [key in keyof EditorEventHandlers]: (editor: YooEditor, options: HandlersOptions) => EditorEventHandlers[key] | void;
};

export type YooptaPluginBaseOptions = {
  searchString?: string;
  displayLabel?: string;
  [x: string]: any;
};

export type YooptaRenderElementFunc<P extends YooptaBaseElement<string> = YooptaBaseElement<string>> = (
  editor: YooEditor,
  plugin: YooptaPluginType,
) => (props: RenderYooptaElementProps<P> & YooptaRenderHTMLAttributes) => ReactElement;

export type YooptaRender<P extends YooptaBaseElement<string>> = YooptaRenderElementFunc<P>;

export type ExtendedYooptaRender<P extends YooptaBaseElement<string>> = {
  editor: YooptaRenderElementFunc<P>;
  render: (props: RenderYooptaElementProps<P> & YooptaRenderHTMLAttributes) => ReactElement;
};

export type YooptaRenderHTMLAttributes = {
  HTMLAttributes?: HTMLAttributes<HTMLElement>;
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
  O extends YooptaPluginBaseOptions = YooptaPluginBaseOptions,
  P extends YooptaBaseElement<string> = YooptaBaseElement<string>,
> = {
  /**
   * The type of the plugin and element.
   */
  type: string;
  /**
   * The plugin's renderer which can be .
   */
  renderer: YooptaRenderer<P>;
  /**
   * The element placeholder.
   */
  placeholder?: string | null;
  /**
   * The element's shortcuts.
   */
  shortcut?: string | string[];
  /**
   * The element's exports which contain rules for deserializers and serializers for plain text([WIP]) html, markdown.
   */
  exports?: Exports<P>;
  /**
   * The element's events: onKeyDown, onCopy and etc.
   */
  events?: YooptaPluginEventHandlers;
  /**
   * The element's options object that can be extended with custom options for your plugin
   * Default options: HTMLAttributes
   */
  options?: O & YooptaRenderHTMLAttributes;
  /**
   *
   * @param editor
   * @returns
   */
  extendEditor?: (editor: YooEditor) => YooEditor;
  /**
   * Slate decorator for text ranges. Check docs: https://docs.slatejs.org/concepts/09-rendering#decorations
   */
  decorator?: (editor: YooEditor) => DecoratorFn;
  /** Slate leaves. Check docs: https://docs.slatejs.org/concepts/09-rendering#decorations */
  leaf?: (editor: YooEditor) => (props: RenderLeafProps) => any;
  /** Useful key for plugins which contain children as plugin. For example NumberedList contain childPlugin ListItem */
  childPlugin?: YooptaPlugin<any, any>;
  hasParent?: boolean;
  createElement?: (editor: YooEditor, elementData?: Partial<P>) => void;
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
      options,
    } = overrides;

    const updatedProps = Object.freeze({
      ...this.#props,
      type,
      renderer,
      placeholder,
      shortcut,
      exports,
      events,
      options: { ...this.#props.options, ...options },
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

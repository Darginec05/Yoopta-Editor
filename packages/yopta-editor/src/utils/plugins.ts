import uniqWith from 'lodash.uniqwith';
import { ReactElement } from 'react';
import { Element, NodeEntry, Range } from 'slate';
import { RenderLeafProps } from 'slate-react';
import { YoEditor, RenderElementProps, YoptaBaseElement } from '../types';
import { EditorEventHandlers } from '../types/eventHandlers';
import { HOTKEYS_TYPE } from './hotkeys';

export type HandlersOptions = {
  hotkeys: HOTKEYS_TYPE;
  defaultNode: Element;
};

export type DecoratorFn = (nodeEntry: NodeEntry) => Range[];
export type YoptaPluginEventHandlers = {
  [key in keyof EditorEventHandlers]: (editor: YoEditor, options: HandlersOptions) => EditorEventHandlers[key] | void;
};

type Options = Record<string, unknown>;

export type YoptaRenderElementFunc<P extends YoptaBaseElement<string> = YoptaBaseElement<string>> = (
  editor: YoEditor,
  plugin: YoptaPluginType,
) => (props: RenderElementProps<P>) => ReactElement;

export type YoptaRender<P extends YoptaBaseElement<string>> = YoptaRenderElementFunc<P>;

export type ExtendedYoptaRender<P extends YoptaBaseElement<string>> = {
  editor: YoptaRenderElementFunc<P>;
  render?: YoptaRenderElementFunc<P>;
};

export type YoptaRenderer<P extends YoptaBaseElement<string>> = ExtendedYoptaRender<P> | YoptaRender<P>;

export type YoptaPluginType<O = Options, P extends YoptaBaseElement<string> = YoptaBaseElement<string>> = {
  type: string;
  renderer: YoptaRenderer<P>;
  shortcut?: string;
  decorator?: (editor: YoEditor) => DecoratorFn;
  events?: YoptaPluginEventHandlers;
  extendEditor?: (editor: YoEditor) => YoEditor;
  leaf?: (editor: YoEditor) => (props: RenderLeafProps) => any;
  options?: O;
  childPlugin?: YoptaPlugin<any, any>;
  isChild?: boolean;
  createElement?: (editor: YoEditor, type: string, data?: any) => void;
  getElement: () => P;
};

export type ParentYoptaPlugin<O = Options> = Omit<YoptaPluginType<O>, 'childPlugin' | 'isChild'>;

export class YoptaPlugin<O extends Options, P extends YoptaBaseElement<string>> {
  #props: YoptaPluginType<O, P>;

  constructor(inputPlugin: YoptaPluginType<O, P>) {
    this.#props = Object.freeze({ ...inputPlugin });
  }

  extend(overrides: Partial<YoptaPluginType<O, P>>) {
    const updatedProps = Object.freeze({ ...this.#props, ...overrides });

    return new YoptaPlugin<O, P>(updatedProps);
  }

  get getPlugin(): YoptaPluginType<O, P> {
    return this.#props;
  }
}

export function createYoptaPlugin<O extends Options, P extends YoptaBaseElement<string>>(input: YoptaPluginType<O, P>) {
  return new YoptaPlugin<O, P>(input);
}

type SuperPluginOptions = {
  max: number;
  min: number;
};

// const SuperPlugin = createYoptaPlugin<SuperPluginOptions, any>({
//   type: 'superplugin',
//   renderer: (editor) => (props) => null,
//   getElement: () => ({ type: 'superplugin' }),
//   options: {
//     max: 19,
//     min: 19,
//   },
// });

export function mergePlugins<O extends Options, P extends YoptaBaseElement<string>>(
  plugins: YoptaPlugin<O, P>[],
): YoptaPluginType<O, P>[] {
  const items: YoptaPluginType<O, P>[] = plugins
    .map((instance) => {
      const { childPlugin, ...componentProps } = instance.getPlugin;
      return childPlugin ? [componentProps, { ...childPlugin.getPlugin, isChild: true }] : componentProps;
    })
    .flat();

  const uniquePlugins = uniqWith(items, (a, b) => a.type === b.type);
  return uniquePlugins;
}

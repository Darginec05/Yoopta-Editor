import uniqWith from 'lodash.uniqwith';
import { ReactElement } from 'react';
import { BaseElement, Element, NodeEntry, Range } from 'slate';
import { RenderLeafProps } from 'slate-react';
import { YoEditor, RenderElementProps } from '../types';
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

export type YoptaRenderElementFunc<P extends BaseElement> = (
  editor: YoEditor,
  plugin: Pick<YoptaPluginType, 'type' | 'options'>,
) => (props: RenderElementProps<P>) => ReactElement;

export type YoptaRender<P extends BaseElement> = YoptaRenderElementFunc<P>;

export type ExtendedYoptaRender<P extends BaseElement> = {
  editor: YoptaRenderElementFunc<P>;
  render?: YoptaRenderElementFunc<P>;
};

export type YoptaRenderer<P extends BaseElement> = ExtendedYoptaRender<P> | YoptaRender<P>;

export type YoptaPluginType<O = Options, P extends BaseElement = BaseElement> = {
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
  createNode?: (editor: YoEditor, type: string, data?: any) => void;
};

export type ParentYoptaPlugin<O = Options> = Omit<YoptaPluginType<O>, 'childPlugin' | 'isChild'>;

export class YoptaPlugin<O extends Options, P extends BaseElement> {
  #props: YoptaPluginType<O, P>;

  constructor(inputPlugin: YoptaPluginType<O, P>) {
    this.#props = Object.freeze({ ...inputPlugin });
  }

  extend<TO extends Options, PO extends BaseElement>(overrides: Partial<YoptaPluginType<TO, PO>>) {
    const updatedProps = Object.freeze({ ...this.#props, ...overrides });

    return new YoptaPlugin<TO, PO>(updatedProps);
  }

  get getPlugin(): YoptaPluginType<O, P> {
    return this.#props;
  }
}

export function createYoptaPlugin<O extends Options, P extends BaseElement>(input: YoptaPluginType<O, P>) {
  return new YoptaPlugin<O, P>(input);
}

export function mergePlugins<O extends Options, P extends BaseElement>(
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

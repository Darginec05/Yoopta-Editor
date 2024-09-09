import { SlateElement } from '../editor/types';
import { PluginElementRenderProps, Plugin, PluginOptions, ElementPropsMap } from './types';

export type ExtendPluginRender<TKeys extends string> = {
  [x in TKeys]: (props: PluginElementRenderProps) => JSX.Element;
};

type ExtractProps<T> = T extends SlateElement<any, infer P> ? P : never;

export type ExtendPlugin<TElementMap extends Record<string, SlateElement>, TOptions> = {
  renders?: {
    [K in keyof TElementMap]?: (props: PluginElementRenderProps & { element: TElementMap[K] }) => JSX.Element;
  };
  options?: Partial<PluginOptions<TOptions>>;
  elementProps?: {
    [K in keyof TElementMap]?: (props: ExtractProps<TElementMap[K]>) => ExtractProps<TElementMap[K]>;
  };
};

export class YooptaPlugin<TElementMap extends Record<string, SlateElement>, TOptions = Record<string, unknown>> {
  private readonly plugin: Plugin<TElementMap, TOptions>;
  constructor(plugin: Plugin<TElementMap, TOptions>) {
    this.plugin = plugin;
  }

  get getPlugin(): Plugin<TElementMap, TOptions> {
    return this.plugin;
  }

  // [TODO] - add validation
  // validatePlugin(): boolean {
  //   return true
  // }

  extend(extendPlugin: ExtendPlugin<TElementMap, TOptions>): YooptaPlugin<TElementMap, TOptions> {
    const { renders, options, elementProps } = extendPlugin;

    const extendedOptions = { ...this.plugin.options, ...options };
    const elements = { ...this.plugin.elements };

    if (renders) {
      Object.keys(renders).forEach((elementType) => {
        const element = elements[elementType];

        if (element && element.render) {
          const customRenderFn = renders[elementType];

          let elementRender = element.render;

          element.render = (props) => {
            return elementRender({ ...props, extendRender: customRenderFn });
          };
        }
      });
    }

    if (elementProps) {
      Object.keys(elementProps).forEach((elementType) => {
        const element = elements[elementType];

        if (element) {
          const defaultPropsFn = elementProps[elementType];
          const updatedElementProps = element.props;
          if (defaultPropsFn && updatedElementProps) {
            element.props = defaultPropsFn(updatedElementProps);
          }
        }
      });
    }

    return new YooptaPlugin<TElementMap, TOptions>({
      ...this.plugin,
      elements: elements,
      options: extendedOptions as PluginOptions<TOptions>,
    });
  }
}

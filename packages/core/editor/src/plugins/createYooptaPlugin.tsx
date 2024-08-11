import { Descendant } from 'slate';
import { PluginElementRenderProps, Plugin, PluginOptions } from './types';

export type ExtendPluginRender<TKeys extends string> = {
  [x in TKeys]: (props: PluginElementRenderProps) => JSX.Element;
};

export type ExtendPlugin<TKeys extends string, TProps, TOptions> = {
  renders?: Partial<ExtendPluginRender<TKeys>>;
  options?: Partial<PluginOptions<TOptions>>;
  elementProps?: Partial<Record<TKeys, (props: TProps) => TProps>>;
};

export class YooptaPlugin<TKeys extends string = string, TProps = Descendant, TOptions = Record<string, unknown>> {
  private readonly plugin: Plugin<TKeys, TProps, TOptions>;

  constructor(plugin: Plugin<TKeys, TProps, TOptions>) {
    this.plugin = plugin;
  }

  get getPlugin() {
    return this.plugin;
  }

  extend(extendPlugin: ExtendPlugin<TKeys, TProps, TOptions>): YooptaPlugin<TKeys, TProps, TOptions> {
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

          element.props = defaultPropsFn(updatedElementProps);
        }
      });
    }

    return new YooptaPlugin<TKeys, TProps, TOptions>({
      ...this.plugin,
      elements: elements,
      options: extendedOptions as PluginOptions<TOptions>,
    });
  }
}

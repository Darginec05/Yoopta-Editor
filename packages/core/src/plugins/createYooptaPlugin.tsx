import { Descendant } from 'slate';
import { PluginElementRenderProps, Plugin, PluginOptions } from './types';

export type ExtendPluginRender<TKeys extends string> = {
  [x in TKeys]: (props: PluginElementRenderProps) => JSX.Element;
};

export type ExtendPlugin<TKeys extends string, TOptions> = {
  renders?: ExtendPluginRender<TKeys>;
  options?: Partial<PluginOptions<TOptions>>;
};

export class YooptaPlugin<TKeys extends string = string, TProps = Descendant, TOptions = Record<string, unknown>> {
  private readonly plugin: Plugin<TKeys, TProps, TOptions>;

  constructor(plugin: Plugin<TKeys, TProps, TOptions>) {
    this.plugin = plugin;
  }

  get getPlugin() {
    return this.plugin;
  }

  extend(extendPlugin: ExtendPlugin<TKeys, TOptions>): YooptaPlugin<TKeys, TProps, TOptions> {
    const { renders, options } = extendPlugin;

    const extendedOptions = { ...this.plugin.options, ...options };
    const elements = { ...this.plugin.elements };

    if (renders) {
      Object.keys(renders).forEach((elementType) => {
        const element = elements[elementType];
        if (element && element.render) {
          elements[elementType].render = (props) => renders[elementType](props);
        }
      });
    }

    return new YooptaPlugin<TKeys, TProps, TOptions>({
      type: this.plugin.type,
      elements: elements,
      events: this.plugin.events,
      parsers: this.plugin.parsers,
      options: extendedOptions as PluginOptions<TOptions>,
    });
  }
}

import { Descendant } from 'slate';
import { PluginElementRenderProps, PluginParams } from './types';

export type ExtendPluginRender<TKeys extends string> = {
  [x in TKeys]: (props: PluginElementRenderProps) => JSX.Element;
};

export type ExtendPlugin<TKeys extends string, TOptions = Record<string, unknown>> = {
  renders?: ExtendPluginRender<TKeys>;
  options?: TOptions;
};

export class YooptaPlugin<TKeys extends string = string, TProps = Descendant, TOptions = Record<string, unknown>> {
  private readonly plugin: PluginParams<TKeys, TProps, TOptions>;

  constructor(plugin: PluginParams<TKeys, TProps, TOptions>) {
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
      options: extendedOptions,
    });
  }

  // extend(options: Partial<PluginOptions<TOptions>>): YooptaPlugin<TKeys, TProps, TOptions> {
  //   const extendedOptions = { ...this.plugin.options, ...options };

  //   return new YooptaPlugin<TKeys, TProps, TOptions>({
  //     type: this.plugin.type,
  //     elements: this.plugin.elements,
  //     events: this.plugin.events,
  //     options: extendedOptions,
  //   });
  // }
}

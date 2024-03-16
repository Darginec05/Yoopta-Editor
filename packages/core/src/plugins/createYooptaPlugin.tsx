import { Descendant } from 'slate';
import { PluginOptions, PluginParams } from './types';

export class YooptaPlugin<TKeys extends string = string, TProps = Descendant, TOptions = Record<string, unknown>> {
  private readonly plugin: PluginParams<TKeys, TProps, TOptions>;

  constructor(plugin: PluginParams<TKeys, TProps, TOptions>) {
    this.plugin = plugin;
  }

  get getPlugin() {
    return this.plugin;
  }

  extend(options: Partial<PluginOptions<TOptions>>): YooptaPlugin<TKeys, TProps, TOptions> {
    const extendedOptions = { ...this.plugin.options, ...options };

    return new YooptaPlugin<TKeys, TProps, TOptions>({
      type: this.plugin.type,
      elements: this.plugin.elements,
      events: this.plugin.events,
      options: extendedOptions,
    });
  }
}

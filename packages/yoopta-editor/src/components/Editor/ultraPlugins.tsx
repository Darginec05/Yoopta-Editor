import { RenderPlugin } from './RenderUltraPlugin';
import { UltraPlugin, CreateUltraPluginBaseParam } from './types';

export function createUltraPlugin<T>(plugin: CreateUltraPluginBaseParam<T>): UltraPlugin {
  return {
    type: plugin.type,
    renderPlugin: (props) => {
      const { customEditor, render, options } = plugin;

      return (
        <RenderPlugin key={props.id} id={props.id} options={options} customEditor={customEditor} render={render} />
      );
    },
  };
}

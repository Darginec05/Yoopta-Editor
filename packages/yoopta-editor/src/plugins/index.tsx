import { RenderPlugin } from './RenderPlugin';
import { CreatePluginParams, Plugin } from './types';

export function createUltraPlugin<T>(plugin: CreatePluginParams<T>): Plugin {
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

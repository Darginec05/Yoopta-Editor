import { SlateEditorComponent } from './SlateEditorComponent';
import { PluginParams, Plugin } from './types';

export function createPlugin<T>(plugin: PluginParams<T>): Plugin {
  return {
    type: plugin.type,
    elements: plugin.elements,
    renderPlugin: (props) => {
      const { customEditor, render, type } = plugin;

      return (
        <SlateEditorComponent
          key={props.id}
          type={type}
          id={props.id}
          customEditor={customEditor}
          render={render}
          // [TODO] - remove elements from plugins. NOTE: top level inline nodes
          elements={props.elements}
        />
      );
    },
  };
}

// [TODO] - This is a WIP: simplify the plugin creation
// type PluginCreateComponentProps<T> = PluginParams<T>;
// export const PluginCreateComponent = <T,>({ type, render, elements }: PluginCreateComponentProps<T>) => {
//   const plugin = createPlugin({
//     type,
//     render,
//     elements,
//   });

//   return plugin;
// };

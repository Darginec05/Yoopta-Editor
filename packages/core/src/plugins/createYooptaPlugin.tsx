import { Descendant } from 'slate';
import { SlateEditorComponent } from './SlateEditorComponent';
import { PluginOptions, PluginParams, PluginReturn } from './types';

export function createYooptaPlugin<TKeys extends string, TProps = Descendant, TOptions = Record<string, unknown>>(
  plugin: PluginParams<TKeys, TProps, TOptions>,
): PluginReturn<TKeys, TProps, TOptions> {
  const pluginOptions = {
    displayLabel: plugin.options?.displayLabel,
    shortcuts: plugin.options?.shortcuts,
    ...plugin.options,
    // withCustomEditor: !!plugin.customEditor,
  };

  return {
    type: plugin.type,
    elements: plugin.elements,
    options: pluginOptions,
    renderPlugin: (props) => {
      const { customEditor, type, events } = plugin;

      return (
        <SlateEditorComponent
          key={props.id}
          type={type}
          id={props.id}
          marks={props.marks}
          customEditor={customEditor}
          events={events}
          // [TODO] - remove elements from plugins. NOTE: top level inline nodes
          elements={props.elements}
          options={pluginOptions}
        />
      );
    },
  };
}

// [TODO] - This is a WIP: simplify plugin creation
// type PluginCreateComponentProps<T> = PluginParams<T>;
// export const PluginCreateComponent = <T,>({ type, render, elements }: PluginCreateComponentProps<T>) => {
//   const plugin = createYooptaPlugin({
//     type,
//     render,
//     elements,
//   });

//   return plugin;
// };

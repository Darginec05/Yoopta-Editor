import { useMemo } from 'react';
import { UltraElementWrapper } from '../ElementWrapper/UltraElementWrapper';
import { PLUGIN_INDEX } from './utils';
import { Plugin, PluginElementsMap } from '../../plugins/types';
import { YooEditor } from '../../editor/types';
import { YooptaMark } from '../../textFormatters/createYooptaMark';

const DEFAULT_EDITOR_KEYS = [];

type Props = {
  editor: YooEditor;
  marks?: YooptaMark[];
  plugins: Plugin[];
};

const RenderBlocks = ({ editor, plugins, marks }: Props) => {
  const childrenUnorderedKeys = Object.keys(editor.children);

  const childrenKeys = useMemo(() => {
    if (childrenUnorderedKeys.length === 0) return DEFAULT_EDITOR_KEYS;

    return childrenUnorderedKeys.sort((a, b) => {
      const aOrder = editor.children[a].meta.order;
      const bOrder = editor.children[b].meta.order;

      return aOrder - bOrder;
    });
  }, [childrenUnorderedKeys]);

  // [TODO] - Optimize and remvoe top level inline plugins
  const PLUGINS_MAP = useMemo<Record<string, Plugin>>(() => {
    const pluginsMap = {};
    const inlineTopLevelPlugins: PluginElementsMap<unknown> = {};

    plugins.forEach((plugin) => {
      if (plugin.elements) {
        Object.keys(plugin.elements).forEach((type) => {
          const element = plugin.elements[type];
          if (element.options?.isInline) inlineTopLevelPlugins[type] = element;
        });
      }

      pluginsMap[plugin.type] = plugin;
    });

    plugins.forEach((plugin) => {
      if (plugin.elements) {
        const elements = { ...plugin.elements, ...inlineTopLevelPlugins };
        pluginsMap[plugin.type] = { ...plugin, elements };
      }
    });

    return pluginsMap;
  }, [plugins]);

  const blocks: JSX.Element[] = [];

  for (let i = 0; i < childrenKeys.length; i++) {
    const childrenId = childrenKeys[i];
    const yooptaPlugin = editor.children[childrenId];
    const pluginRenderer = PLUGINS_MAP[yooptaPlugin.type];

    if (pluginRenderer?.renderPlugin) {
      blocks.push(
        <UltraElementWrapper key={childrenId} plugin={yooptaPlugin} pluginId={childrenId}>
          {pluginRenderer.renderPlugin({ id: childrenId, elements: pluginRenderer.elements, marks })}
        </UltraElementWrapper>,
      );
    }

    PLUGIN_INDEX.set(yooptaPlugin, i);
  }

  return <>{blocks}</>;
};

export { RenderBlocks };

import { useMemo } from 'react';
import { UltraElementWrapper } from '../ElementWrapper/UltraElementWrapper';
import { PLUGIN_INDEX } from './utils';

import { Blockquote } from './plugins/Blockquote/Blockquote';
import { Code } from './plugins/Code/Code';
import { Link } from './plugins/Link/Link';
import { Paragraph } from './plugins/Paragraph/Paragraph';
import { Video } from './plugins/Video/Video';
import { Plugin } from '../../plugins/types';

const ULTRA_PLUGINS = [Paragraph, Blockquote, Code, Video];
const DEFAULT_EDITOR_KEYS = [];

const RenderBlocks = ({ editor }) => {
  const pluginKeys = Object.keys(editor.children);

  const pluginValueKeys = useMemo(() => {
    if (pluginKeys.length === 0) return DEFAULT_EDITOR_KEYS;

    return pluginKeys.sort((a, b) => {
      const aOrder = editor.children[a].meta.order;
      const bOrder = editor.children[b].meta.order;

      return aOrder - bOrder;
    });
  }, [pluginKeys]);

  const ultraPluginsMap = useMemo<Record<string, Plugin>>(() => {
    const pluginsMap = {};
    ULTRA_PLUGINS.forEach((plugin) => (pluginsMap[plugin.type] = plugin));

    return pluginsMap;
  }, []);

  const blocks: JSX.Element[] = [];

  for (let i = 0; i < pluginValueKeys.length; i++) {
    const pluginId = pluginValueKeys[i];
    const plugin = editor.children[pluginId];

    const renderPlugin = ultraPluginsMap[plugin.type]?.renderPlugin;

    if (renderPlugin) {
      blocks.push(
        <UltraElementWrapper key={pluginId} plugin={plugin} pluginId={pluginId}>
          {renderPlugin({ id: pluginId })}
        </UltraElementWrapper>,
      );
    }

    PLUGIN_INDEX.set(plugin, i);
  }

  return <>{blocks}</>;
};

export { RenderBlocks };

import { Key, useEffect, useMemo, useRef } from 'react';
import { YooptaEditorValue, YooptaTools, YooptaNodeElementSettings } from '../../types';
import { YooptaMark } from '../../utils/marks';
import { YooptaPlugin } from '../../utils/plugins';
import { OFFLINE_STORAGE } from '../../utils/storage';
import { Code } from './plugins/Code/Code';
import { useYooptaEditor } from './contexts/UltraYooptaContext/UltraYooptaContext';
import { Paragraph } from './plugins/Paragraph/Paragraph';
import { UltraPlugin } from './types';
import { Blockquote } from './plugins/Blockquote/Blockquote';
import { UltraElementWrapper } from '../ElementWrapper/UltraElementWrapper';
import { PLUGIN_INDEX } from './utils';
import { Video } from './plugins/Video/Video';

export type YooptaEditorProps<V> = {
  onChange: (_value: YooptaEditorValue<V>) => void;
  value: YooptaEditorValue<V>;
  key?: Key;
  placeholder?: string;
  plugins: YooptaPlugin<any, any>[];
  readOnly?: boolean;
  autoFocus?: boolean;
  offline?: OFFLINE_STORAGE;
  marks?: YooptaMark[];
  nodeElementSettings?: YooptaNodeElementSettings;
  className?: string;
  tools?: YooptaTools;
};

const ULTRA_PLUGINS = [Paragraph, Blockquote, Code, Video];
const DEFAULT_EDITOR_KEYS = [];

const YooptaEditor = () => {
  const editor = useYooptaEditor();
  const selection = useRef<number[] | null>(null);

  const pluginValueKeys =
    Object.keys(editor.plugins).sort((a, b) => {
      const aOrder = editor.plugins[a].meta.order;
      const bOrder = editor.plugins[b].meta.order;

      return aOrder - bOrder;
    }) || DEFAULT_EDITOR_KEYS;

  const ultraPluginsMap = useMemo<Record<string, UltraPlugin>>(() => {
    const pluginsMap = {};
    ULTRA_PLUGINS.forEach((plugin) => (pluginsMap[plugin.type] = plugin));

    return pluginsMap;
  }, []);

  console.log('selection', selection.current);

  const nodes: JSX.Element[] = [];

  for (let i = 0; i < pluginValueKeys.length; i++) {
    const pluginId = pluginValueKeys[i];
    const plugin = editor.plugins[pluginId];

    const renderPlugin = ultraPluginsMap[plugin.type]?.renderPlugin;

    if (renderPlugin) {
      nodes.push(
        <UltraElementWrapper key={pluginId} plugin={plugin} pluginId={pluginId}>
          {renderPlugin({
            id: pluginId,
            meta: plugin.meta,
            value: plugin.value,
            onChange: editor.changeValue,
            selection: selection.current,
          })}
        </UltraElementWrapper>,
      );
    }

    PLUGIN_INDEX.set(plugin, i);
  }

  useEffect(() => {
    const handleSelectionChange = (event) => {
      const domSelection = document.getSelection()!;
      let el = domSelection.anchorNode;

      while (el && !el.parentElement?.hasAttribute('data-yoopta-plugin')) {
        el = el.parentNode;
      }

      const pluginElement = el?.parentElement;
      const pluginId = pluginElement?.getAttribute('data-yoopta-plugin-id') || '';

      selection.current = editor.plugins[pluginId] ? [editor.plugins[pluginId].meta.order] : null;
    };

    window.document.addEventListener('selectionchange', handleSelectionChange);
    return () => window.document.removeEventListener('selectionchange', handleSelectionChange);
  }, [pluginValueKeys]);

  return <div id="yoopta-editor">{nodes}</div>;
};

export { YooptaEditor };

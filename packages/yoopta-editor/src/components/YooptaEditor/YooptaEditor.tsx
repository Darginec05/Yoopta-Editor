import { useCallback, useEffect, useState, Key, useMemo, ReactNode, Children, Fragment } from 'react';
import { YooptaBaseElement, YooptaEditorValue, YooptaTools, YooptaNodeElementSettings } from '../../types';
import { generateId } from '../../utils/generateId';
import { YooptaMark } from '../../utils/marks';
import { YooptaPlugin } from '../../utils/plugins';
import { getStorageName, OFFLINE_STORAGE } from '../../utils/storage';
import { Code } from './plugins/Code/Code';
import { useYooptaEditor } from './contexts/UltraYooptaContext/UltraYooptaContext';
import { YOOPTA_EDITOR_ULTRA_VALUE, DEFAULT_ULTRA_PLUGIN } from './defaultValue';
import { Paragraph } from './plugins/Paragraph/Paragraph';
import { UltraPlugin } from './types';
import { createUltraPlugin } from './ultraPlugins';
import { Blockquote } from './plugins/Blockquote/Blockquote';
import { UltraElementWrapper } from './UltraElementWrapper/UltraElementWrapper';

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

const Video = createUltraPlugin({
  type: 'video',

  render: (props) => {
    return (
      <div data-element-type="VideoPluginUltra" {...props.attributes}>
        {props.children}
      </div>
    );
  },
});

const ULTRA_PLUGINS = [Paragraph, Blockquote, Code];

const DEFAULT_EDITOR_KEYS = [];
const PLUGIN_NODE_INDEX = new WeakMap();

const YooptaEditor = () => {
  const [editorValue, setEditorValue] = useState(YOOPTA_EDITOR_ULTRA_VALUE);

  const onChange = useCallback((id, value) => {
    setEditorValue((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const pluginValueKeys = Object.keys(editorValue) || DEFAULT_EDITOR_KEYS;

  const ultraPluginsMap = useMemo<Record<string, UltraPlugin>>(() => {
    const pluginsMap = {};
    ULTRA_PLUGINS.forEach((plugin) => (pluginsMap[plugin.type] = plugin));
    return pluginsMap;
  }, []);

  const nodes: JSX.Element[] = [];

  for (let i = 0; i < pluginValueKeys.length; i++) {
    const key = pluginValueKeys[i];
    const pluginEditorValue = editorValue[key];
    const plugin = ultraPluginsMap[pluginEditorValue[0].type];

    if (plugin) {
      nodes.push(
        <UltraElementWrapper key={key}>
          {plugin.renderPlugin({
            id: key,
            value: pluginEditorValue,
            onChange,
          })}
        </UltraElementWrapper>,
      );
    }

    PLUGIN_NODE_INDEX.set(pluginEditorValue, i);
  }

  return <div id="yoopta-editor">{nodes}</div>;
};

export { YooptaEditor };

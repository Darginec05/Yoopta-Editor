import { useCallback, useEffect, useState, Key, useMemo, ReactNode, Children, Fragment } from 'react';
import { YooptaBaseElement, YooptaEditorValue, YooptaTools, YooptaNodeElementSettings } from '../../types';
import { generateId } from '../../utils/generateId';
import { YooptaMark } from '../../utils/marks';
import { YooptaPlugin } from '../../utils/plugins';
import { getStorageName, OFFLINE_STORAGE } from '../../utils/storage';
import { useYooptaEditor } from './contexts/UltraYooptaContext/UltraYooptaContext';
import { YOOPTA_EDITOR_ULTRA_VALUE, DEFAULT_ULTRA_PLUGIN } from './defaultValue';
import { UltraPlugin } from './types';
import { ULTRA_PLUGINS } from './ultraPlugins';

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

const DEFAULT_EDITOR_KEYS = [];
const PLUGIN_NODE_INDEX = new WeakMap();

const YooptaEditor = <V extends YooptaBaseElement<string>>({
  key,
  // value,
  // onChange,
  // plugins,
  marks,
  readOnly,
  placeholder,
  autoFocus = true,
  offline,
  className,
  tools,
}: YooptaEditorProps<V>) => {
  const yooptaEditor = useYooptaEditor();

  console.log('yooptaEditor.editor.children', yooptaEditor.editor.children);

  const [editorValue, setEditorValue] = useState(YOOPTA_EDITOR_ULTRA_VALUE);

  const onChange = useCallback((id, value) => {
    console.log(value[0].type, value);

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

  const nodes = [];

  for (let i = 0; i < pluginValueKeys.length; i++) {
    const key = pluginValueKeys[i];
    const pluginEditorValue = editorValue[key];
    const plugin = ultraPluginsMap[pluginEditorValue[0].type];

    if (plugin) {
      nodes.push(
        <div key={key}>
          {plugin.render({
            id: key,
            value: pluginEditorValue,
            onChange,
          })}
        </div>,
      );
    }

    PLUGIN_NODE_INDEX.set(pluginEditorValue, i);
  }

  return (
    <div id="yoopta-editor">
      <button onClick={() => console.log(PLUGIN_NODE_INDEX.get(editorValue['HGQj3faHJkbMGFcBJNUgj']))}>get </button>
      {nodes}
    </div>
  );
};

export { YooptaEditor };

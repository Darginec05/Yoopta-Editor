import { generateId } from '../../utils/generateId';

const codeText = `import { useCallback, useEffect, useState, Key, useMemo, ReactNode, Children, Fragment } from 'react';
import { YooptaBaseElement, YooptaEditorValue, YooptaTools, YooptaNodeElementSettings } from '../../types';
import { YooptaMark } from '../../utils/marks';
import { YooptaPlugin } from '../../utils/plugins';
import { getStorageName, OFFLINE_STORAGE } from '../../utils/storage';
import { YOOPTA_EDITOR_ULTRA_VALUE, YOOPTA_ULTRA_VALUES } from './defaultValue';
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
  const storageName = getStorageName(offline);
  const [editorValue, setEditorValue] = useState(YOOPTA_EDITOR_ULTRA_VALUE);

  const onChange = useCallback((id, value) => {
    setEditorValue((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const editorKeys = Object.keys(editorValue) || DEFAULT_EDITOR_KEYS;

  const ultraPluginsMap = useMemo<Record<string, UltraPlugin>>(() => {
    const pluginsMap = {};
    ULTRA_PLUGINS.forEach((plugin) => (pluginsMap[plugin.type] = plugin));
    return pluginsMap;
  }, []);

  return (
    <div key={key} id="yoopta-editor">
      {editorKeys.length > 0 &&
        Object.keys(editorValue).map((key) => {
          const pluginValue = editorValue[key];
          const plugin = ultraPluginsMap[pluginValue[0].type];

          if (plugin) {
            return (
              <div key={key}>
                {plugin.render({
                  id: key,
                  value: pluginValue,
                  onChange,
                })}
              </div>
            );
          }

          return null;
        })}
      {/* <ParagraphPluginUltra id="li3D16cCB7Ze5jxy8OwrN" value={YOOPTA_ULTRA_VALUES.paragraph} onChange={onChange} />
      <CodePluginUltra id="ir9BOyBAjjXB3NyjXfZXm" value={YOOPTA_ULTRA_VALUES.code} onChange={onChange} />
      <BlockquotePluginUltra id="Gci1KGGfnlup_h4Ta-AOI" value={YOOPTA_ULTRA_VALUES.blockquote} onChange={onChange} /> */}
    </div>
  );
};

export { YooptaEditor };
`;

export const YOOPTA_ULTRA_VALUES = {
  paragraph: [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ],
  code: [
    {
      type: 'code',
      children: [{ text: codeText }],
    },
  ],
  blockquote: [
    {
      type: 'blockquote',
      children: [{ text: 'A line of text in a blockquote' }],
    },
  ],
};

export const DEFAULT_ULTRA_PLUGIN = {
  type: 'paragraph',
  children: [{ text: '' }],
};

export const YOOPTA_EDITOR_ULTRA_VALUE = {
  li3D16cCB7Ze5jxy8OwrN: YOOPTA_ULTRA_VALUES.paragraph,
  ir9BOyBAjjXB3NyjXfZXm: YOOPTA_ULTRA_VALUES.code,
  'Gci1KGGfnlup_h4Ta-AOI': YOOPTA_ULTRA_VALUES.blockquote,
  ATrb0U6MPHzdn8XRTm5M6: YOOPTA_ULTRA_VALUES.paragraph,
  HGQj3faHJkbMGFcBJNUgj: YOOPTA_ULTRA_VALUES.blockquote,
  iBhNRtHtdoEq6_hQrI4La: YOOPTA_ULTRA_VALUES.code,
};

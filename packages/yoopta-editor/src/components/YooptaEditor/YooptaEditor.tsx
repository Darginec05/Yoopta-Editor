import { Key, useMemo } from 'react';
import { YooptaEditorValue, YooptaTools, YooptaNodeElementSettings } from '../../types';
import { generateId } from '../../utils/generateId';
import { YooptaMark } from '../../utils/marks';
import { YooptaPlugin } from '../../utils/plugins';
import { OFFLINE_STORAGE } from '../../utils/storage';
import { Code } from './plugins/Code/Code';
import { useYooptaEditor } from './contexts/UltraYooptaContext/UltraYooptaContext';
import { Paragraph } from './plugins/Paragraph/Paragraph';
import { UltraPlugin } from './types';
import { createUltraPlugin } from './ultraPlugins';
import { Blockquote } from './plugins/Blockquote/Blockquote';
import { UltraElementWrapper } from '../ElementWrapper/UltraElementWrapper';
import { PLUGIN_INDEX } from './utils';

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

type VideoElementMeta = {
  height: number;
  width: number;
  src: string;
};

const VideoRender = (props) => {
  const data = props.element.data;

  return (
    <div data-element-type="VideoPluginUltra" {...props.attributes}>
      <video
        playsInline
        controls
        data-automation="VideoPlayer"
        height={data.height}
        width={data.width}
        loop
        muted
        autoPlay
        poster={data.poster}
        preload="auto"
        aria-label="video-player"
      >
        <source
          src="https://www.shutterstock.com/shutterstock/videos/1075423076/preview/stock-footage-collage-of-eyes-beautiful-people-of-different-ages-and-multiethnic-close-up-montage-of-positive.webm"
          type="video/webm"
        />
        <source
          src="https://www.shutterstock.com/shutterstock/videos/1075423076/preview/stock-footage-collage-of-eyes-beautiful-people-of-different-ages-and-multiethnic-close-up-montage-of-positive.mp4"
          type="video/mp4"
        />
      </video>
      {props.children}
    </div>
  );
};

const Video = createUltraPlugin<VideoElementMeta>({
  type: 'video',
  render: VideoRender,
  data: {
    id: generateId(),
    height: 400,
    width: 400,
    src: '',
  },
  options: {
    isVoid: true,
  },
});

const ULTRA_PLUGINS = [Paragraph, Blockquote, Code, Video];
const DEFAULT_EDITOR_KEYS = [];

const YooptaEditor = () => {
  const editor = useYooptaEditor();

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

  const nodes: JSX.Element[] = [];

  for (let i = 0; i < pluginValueKeys.length; i++) {
    const pluginId = pluginValueKeys[i];
    const plugin = editor.plugins[pluginId];
    // console.log('plugin.type', plugin.type);

    const renderPlugin = ultraPluginsMap[plugin.type]?.renderPlugin;

    if (renderPlugin) {
      nodes.push(
        <UltraElementWrapper key={pluginId} element={plugin}>
          {renderPlugin({
            id: pluginId,
            value: plugin.value,
            onChange: editor.changeValue,
          })}
        </UltraElementWrapper>,
      );
    }

    PLUGIN_INDEX.set(plugin, i);
  }

  return <div id="yoopta-editor">{nodes}</div>;
};

export { YooptaEditor };

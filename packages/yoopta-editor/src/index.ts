import { YooptaEditor } from './YooptaEditor';
import { YooptaPlugin, mergePlugins, createYooptaPlugin } from './utils/plugins';
import classnames from 'classnames';
import { ElementOptions } from './components/ElementOptions/ElementOptions';
import { Overlay } from './components/ElementOptions/Overlay';
import { useNodeElementSettings } from './fakecontexts/NodeSettingsContext/NodeSettingsContext';
export { classnames as cx };
export { isKeyHotkey, isHotkey, isCodeHotkey } from 'is-hotkey';
export { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';

export { isValidYooptaNodes } from './utils/validate';
export { generateId } from './utils/generateId';
export { HOTKEYS } from './utils/hotkeys';

export { useYoopta, useMarks, useElements, useTools } from './fakecontexts/YooptaContext/YooptaContext';
export type { ElementsMap, MarksMap } from './fakecontexts/YooptaContext/YooptaContext';
export { deepClone } from './utils/deepClone';
export { createYooptaMark } from './utils/marks';
export { isElementActive, getElementByPath } from './utils/nodes';
export { getElementClassname } from './utils/getElementClassname';
export { createYooptaEditor, TextFormats } from './editor';
export type {
  YooptaPluginType,
  YooptaPluginEventHandlers,
  HandlersOptions,
  YooptaPluginBaseOptions,
  YooptaRenderHTMLAttributes,
} from './utils/plugins';
export type { YooptaMarksConfig, YooptaMark } from './utils/marks';

const UI_HELPERS = { ElementOptions, Overlay };

export { YooptaPlugin, mergePlugins, createYooptaPlugin, useNodeElementSettings, UI_HELPERS };

export default YooptaEditor;

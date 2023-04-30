import { YoptaPlugin, mergePlugins, createYoptaPlugin } from './utils/plugins';
import classnames from 'classnames';
import { ElementOptions } from './components/ElementOptions/ElementOptions';
import { Overlay } from './components/ElementOptions/Overlay';
import { useElementSettings } from './contexts/NodeSettingsContext/NodeSettingsContext';
export { classnames as cx };
export { isKeyHotkey, isHotkey, isCodeHotkey } from 'is-hotkey';

export { YoptaEditor } from './YoptaEditor';
export { isValidYoptaNodes } from './utils/validate';
export { generateId } from './utils/generateId';
export { HOTKEYS } from './utils/hotkeys';
export { useYopta } from './contexts/YoptaEditor/YoptaContext';
export { deepClone } from './utils/deepClone';
export { createYoptaMark } from './utils/marks';
export { isElementActive, getElementByPath } from './utils/nodes';
export type { YoptaPluginType, YoptaPluginEventHandlers, HandlersOptions } from './utils/plugins';
export type { YoptaMarksConfig, YoptaMark } from './utils/marks';
export type { YoEditor, RenderElementProps, YoptaBaseElement, Modify } from './types';

const UI_HELPERS = { ElementOptions, Overlay };

export { YoptaPlugin, mergePlugins, createYoptaPlugin, useElementSettings, UI_HELPERS };

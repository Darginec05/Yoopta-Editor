import { YoptaPlugin, mergePlugins, createYoptaPlugin } from './utils/plugins';
import classnames from 'classnames';
export { classnames as cx };
export { isKeyHotkey, isHotkey, isCodeHotkey } from 'is-hotkey';

export { YoptaEditor } from './YoptaEditor';
export { isValidYoptaNodes } from './utils/validate';
export { generateId } from './utils/generateId';
export { HOTKEYS } from './utils/hotkeys';
export { createYoptaMark } from './utils/marks';
export { isElementActive, getElementByPath } from './utils/nodes';
export type { YoptaPluginType, YoptaPluginHandlers, HandlersOptions } from './utils/plugins';
export type { YoptaMarksConfig, YoptaMark } from './utils/marks';
export type { YoEditor, RenderElementProps } from './types';

export { YoptaPlugin, mergePlugins, createYoptaPlugin };

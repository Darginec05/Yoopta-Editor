import { YooptaPlugin, mergePlugins, createYooptaPlugin } from './utils/plugins';
import classnames from 'classnames';
import { ElementOptions } from './components/ElementOptions/ElementOptions';
import { Overlay } from './components/ElementOptions/Overlay';
import { useNodeElementSettings } from './contexts/NodeSettingsContext/NodeSettingsContext';
export { classnames as cx };
export { isKeyHotkey, isHotkey, isCodeHotkey } from 'is-hotkey';
export { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';

import { YooptaEditor } from './YooptaEditor';
export { isValidYooptaNodes } from './utils/validate';
export { generateId } from './utils/generateId';
export { HOTKEYS } from './utils/hotkeys';

// [WIP] - hooks
export { useYoopta, useMarks, useElements, useTools } from './contexts/YooptaContext/YooptaContext';
export type { ElementsMap, MarksMap } from './contexts/YooptaContext/YooptaContext';
export { deepClone } from './utils/deepClone';
export { createYooptaMark } from './utils/marks';
export { isElementActive, getElementByPath } from './utils/nodes';
export { getElementClassname } from './utils/getElementClassname';
export type {
  YooptaPluginType,
  YooptaPluginEventHandlers,
  HandlersOptions,
  YooptaPluginBaseOptions,
  YooptaRenderHTMLAttributes,
} from './utils/plugins';
export type { YooptaMarksConfig, YooptaMark } from './utils/marks';
export type { YooEditor, RenderYooptaElementProps, YooptaBaseElement, Modify, YooptaEditorValue, YooptaBaseToolProps } from './types';

const UI_HELPERS = { ElementOptions, Overlay };

export { YooptaPlugin, mergePlugins, createYooptaPlugin, useNodeElementSettings, UI_HELPERS };

export default YooptaEditor;

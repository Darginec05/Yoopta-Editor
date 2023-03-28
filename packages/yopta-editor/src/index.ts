import { YoptaPlugin, mergePlugins } from './utils/plugins';
import classnames from 'classnames';
export { classnames as cx };

export { YoptaEditor } from './YoptaEditor';
export { isValidYoptaNodes } from './utils/validate';
export { generateId } from './utils/generateId';
export { HOTKEYS } from './utils/hotkeys';
export { isElementActive, getNodeByPath } from './utils/nodes';
export type { YoptaPluginType, YoptaPluginHandlers, HandlersOptions } from './utils/plugins';
export type { CustomEditor as YoptaEditorType } from './components/Editor/types';

export { YoptaPlugin, mergePlugins };

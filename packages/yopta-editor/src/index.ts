import { YoptaComponent, getNormalizedComponents } from './utils/component';
import classnames from 'classnames';
export { classnames as cx };

export { YoptaEditor } from './YoptaEditor';
export { isValidYoptaNodes } from './utils/validate';
export { generateId } from './utils/generateId';
export { HOTKEYS } from './utils/hotkeys';
export { isElementActive, getNodeByPath } from './utils/nodes';
export type {
  YoptaComponentType,
  YoptaComponentHandlers,
  HandlersOptions,
  NormalizedYoptaComponent,
} from './utils/component';
export type { CustomEditor as YoptaEditorType } from './components/Editor/types';

export { YoptaComponent, getNormalizedComponents };

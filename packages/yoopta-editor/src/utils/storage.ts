import { YooptaEditorValue } from '../types';
import { generateId } from './generateId';
import { isValidYooptaNodes } from './validate';

const DEFAULT_YOPTA_LS_NAME = 'yoopta-content';

export type OFFLINE_STORAGE = boolean | string;

export function getStorageName(offline?: OFFLINE_STORAGE) {
  if (typeof offline === 'string') {
    return offline;
  }

  return DEFAULT_YOPTA_LS_NAME;
}

export function getInitialState<V>(storageName: string, offline?: OFFLINE_STORAGE, value?: YooptaEditorValue<V>): YooptaEditorValue<V> {
  const DEFAULT_STATE = [{ id: generateId(), type: 'paragraph', children: [{ text: '' }] }] as YooptaEditorValue<V>;
  const defaultValue = isValidYooptaNodes(value) ? value : DEFAULT_STATE;

  if (!offline) {
    localStorage.removeItem(storageName);
    return defaultValue as YooptaEditorValue<V>;
  }

  try {
    const storedData = JSON.parse(localStorage.getItem(storageName) || '[]');

    return isValidYooptaNodes(storedData) ? storedData : defaultValue;
  } catch (error) {
    localStorage.removeItem(storageName);
    return DEFAULT_STATE;
  }
}

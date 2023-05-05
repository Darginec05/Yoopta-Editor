import { Descendant } from 'slate';
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

export function getInitialState(storageName: string, offline?: OFFLINE_STORAGE, value?: Descendant[]): Descendant[] {
  const DEFAULT_STATE = [{ id: generateId(), type: 'paragraph', children: [{ text: '' }] }] as Descendant[];
  const defaultValue = isValidYooptaNodes(value) ? value : DEFAULT_STATE;

  if (!offline) {
    localStorage.removeItem(storageName);
    return defaultValue as Descendant[];
  }

  try {
    const storedData = JSON.parse(localStorage.getItem(storageName) || '[]');

    return isValidYooptaNodes(storedData) ? storedData : defaultValue;
  } catch (error) {
    localStorage.removeItem(storageName);
    return DEFAULT_STATE;
  }
}

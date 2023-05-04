import { Descendant } from 'slate';
import { generateId } from './generateId';
import { isValidYoptaNodes } from './validate';

const DEFAULT_YOPTA_LS_NAME = 'yoopta-content';

export type LOCAL_STORAGE_NAME_TYPE = boolean | { name: string };

export function getStorageName(shouldStoreInLocalStorage?: LOCAL_STORAGE_NAME_TYPE) {
  if (typeof shouldStoreInLocalStorage === 'object' && shouldStoreInLocalStorage.name) {
    return shouldStoreInLocalStorage.name;
  }

  return DEFAULT_YOPTA_LS_NAME;
}

export function getInitialState(
  storageName: string,
  shouldStoreInLocalStorage?: LOCAL_STORAGE_NAME_TYPE,
  value?: Descendant[],
): Descendant[] {
  const DEFAULT_STATE = [{ id: generateId(), type: 'paragraph', children: [{ text: '' }] }] as Descendant[];
  const defaultValue = isValidYoptaNodes(value) ? value : DEFAULT_STATE;

  if (!shouldStoreInLocalStorage) {
    localStorage.removeItem(storageName);
    return defaultValue as Descendant[];
  }

  try {
    const storedData = JSON.parse(localStorage.getItem(storageName) || '[]');

    return isValidYoptaNodes(storedData) ? storedData : defaultValue;
  } catch (error) {
    localStorage.removeItem(storageName);
    return DEFAULT_STATE;
  }
}

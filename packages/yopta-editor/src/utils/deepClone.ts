import cloneDeep from 'lodash.clonedeep';

export function deepClone(object: any) {
  if (typeof window.structuredClone === 'function') return window.structuredClone(object);

  return cloneDeep(object);
}

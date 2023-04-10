export const isText = (value: any) => typeof value === 'object' && typeof value.text === 'string';
export const isElement = (value: any) => typeof value === 'object' && isNodeList(value.children);
export const isNode = (value: any): boolean => isText(value) || isElement(value);

export const isNodeList = (value: any): boolean => {
  if (!Array.isArray(value)) return false;

  const isNodeList = value.every((val) => isNode(val));
  return isNodeList;
};

export const isText = (value: any) => typeof value === 'object' && typeof value.text === 'string';
export const isElement = (node: any) => typeof node === 'object' && isNodeList(node.children);
export const isNode = (value: any): boolean => isText(value) || isElement(value);

export const isNodeList = (value: any): boolean => {
  if (!Array.isArray(value)) return false;

  const isNodeList = value.every((val) => isNode(val));
  return isNodeList;
};

export const isInline = (node) => {
  if (node?.props?.nodeType === 'inline') {
    console.log('node?.props?.nodeType', node?.props?.nodeType);
  }

  return node?.props?.nodeType === 'inline';
};

export const hasInlines = (element) => {
  console.log('element', element);

  return element.children.some((n) => isText(n) || isInline(n));
};

export function isValidYoptaNodes(nodes: any): boolean {
  if (!Array.isArray(nodes)) return false;
  if (nodes.length === 0) return false;

  const nestedItems = ['numbered-list', 'ordered-list'];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const nodeChild = node.children;

    const isNested = nestedItems.includes(node.type);

    if (isNested) {
      return isValidYoptaNodes(nodeChild);
    }

    // eslint-disable-next-line max-len
    if (!node.type || !node.id || !nodeChild || !Array.isArray(nodeChild) || typeof nodeChild?.[0]?.text !== 'string') {
      console.error('NOT VALID NODE', node);
      return false;
    }
  }

  return true;
}

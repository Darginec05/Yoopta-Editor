export function isValidYoptaNodes(nodes: any): boolean {
  if (!Array.isArray(nodes)) return false;
  if (nodes.length === 0) return false;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const nodeChild = node.children;

    // nested nodes as list items dont include children[0].text key
    // eslint-disable-next-line max-len
    // if (!node.type || !node.id || !nodeChild || !Array.isArray(nodeChild) || typeof nodeChild?.[0]?.text !== 'string') {
    if (!node.type || !node.id || !nodeChild || !Array.isArray(nodeChild)) {
      return false;
    }
  }

  return true;
}

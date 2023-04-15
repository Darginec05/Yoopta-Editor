export function isValidYoptaNodes(nodes: any): boolean {
  if (!Array.isArray(nodes)) return false;
  if (nodes.length === 0) return false;

  return true;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const nodeChild = node.children;

    if (isNested) {
      return isValidYoptaNodes(nodeChild);
    }

    if (!node.type) {
      console.error('NOT VALID NODE: missed type in node', node);
      return false;
    }

    if (!node.id) {
      console.error('NOT VALID NODE: missed id in node', node);
      return false;
    }

    if (!nodeChild || !Array.isArray(nodeChild)) {
      console.error('NOT VALID NODE: node.children should be array', node);
      return false;
    }

    if (typeof nodeChild?.[0]?.text !== 'string') {
      console.error('NOT VALID NODE: node.children[0].text should be String', node);
      return false;
    }
  }

  return true;
}

// WORK IN PROGRESS
export function isValidYooptaNodes(nodes: any): boolean {
  if (!Array.isArray(nodes)) return false;
  if (nodes.length === 0) return false;

  return true;
}

import { ClipboardEvent } from 'react';
import { LIST_TYPES } from './components/Editor/constants';

export function isValidYoptaNodes(nodes: any): boolean {
  if (!Array.isArray(nodes)) return false;
  if (nodes.length === 0) return false;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const nodeChild = node.children;

    const isNested = LIST_TYPES.includes(node.type);

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

// copy function for parent <div /> of nodes
export function onCopyYoptaNodes(e: ClipboardEvent) {
  e.preventDefault();
  e.stopPropagation();

  const div = document.createElement('div');
  div.innerHTML = e.currentTarget.innerHTML;

  // [TODO] - add common classname to every tool for additional check
  const yoptaTools = div.querySelectorAll('.node-settings-actions');

  if (yoptaTools.length > 0) {
    div.querySelectorAll('.node-settings-actions').forEach((el) => el?.remove());
  }

  e.clipboardData.setData('text/html', div.innerHTML);
}

import { ClipboardEvent } from 'react';

// copy function for parent <div /> of nodes
export function onCopyYoptaNodes(event: ClipboardEvent) {
  event.preventDefault();
  event.stopPropagation();

  const range = window.getSelection()!.getRangeAt(0);
  const content = range.cloneContents();

  const div = content?.ownerDocument.createElement('div');
  div?.appendChild(content);

  const yoptaTools = div.querySelectorAll('.yopta-tools');

  if (yoptaTools && yoptaTools.length > 0) {
    yoptaTools.forEach((el) => el?.remove());
  }

  event.clipboardData.setData('text/html', div.innerHTML);

  return event.clipboardData;
}

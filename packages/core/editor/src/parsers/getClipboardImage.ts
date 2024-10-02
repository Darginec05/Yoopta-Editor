import { generateId } from '../utils/generateId';
import { YooEditor, YooptaBlockData } from '../editor/types';

const buildBlockData = (imageURL: string) => {
  const blockData = {
    id: generateId(),
    type: 'Image',
    value: [
      {
        id: generateId(),
        type: 'image',
        children: [{ text: '' }],
        props: {
          nodeType: 'void',
          src: imageURL,
          alt: 'pasted image',
          srcSet: null,
          fit: 'contain',
        },
      },
    ],
    meta: {
      order: 0,
      depth: 0,
      align: 'left',
    },
  };
  return blockData as YooptaBlockData;
};

export const pasteClipboardImage = (editor: YooEditor, image: DataTransferItem) => {
  const blob = image.getAsFile();
  if (!blob) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    if (!e.target) return;
    const blockData = buildBlockData(e.target.result as string);
    editor.insertBlock(blockData, { at: editor.selection, focus: true });
  };
  reader.readAsDataURL(blob);
};

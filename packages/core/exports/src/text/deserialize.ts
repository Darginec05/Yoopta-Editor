import { Blocks, generateId, YooEditor, YooptaContentValue } from '@yoopta/editor';

export function deserializeText(editor: YooEditor, text: string): YooptaContentValue {
  const blockId = generateId();
  const paragraphBlock = Blocks.buildBlockData({
    id: blockId,
    value: [{ id: generateId(), type: 'paragraph', children: [{ text }] }],
  });

  return {
    [blockId]: paragraphBlock,
  };
}

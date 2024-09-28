import { YooEditor, YooptaBlockData } from '../types';
import { YooptaOperation } from './applyTransforms';

export function updateBlock(editor: YooEditor, blockId: string, data: Partial<YooptaBlockData>) {
  const block = editor.children[blockId];

  if (!block) {
    console.warn(`Block with id ${blockId} does not exist.`);
    return;
  }

  const updateOperation: YooptaOperation = {
    type: 'update_block',
    id: blockId,
    properties: {},
  };

  // Проверяем и добавляем только измененные свойства
  if (data.id && data.id !== block.id) {
    updateOperation.properties.id = data.id;
  }

  if (data.type && data.type !== block.type) {
    updateOperation.properties.type = data.type;
  }

  if (data.meta) {
    updateOperation.properties.meta = { ...block.meta, ...data.meta };
  }

  if (data.value) {
    updateOperation.properties.value = data.value;
  }

  // Применяем операцию только если есть изменения
  if (Object.keys(updateOperation.properties).length > 0) {
    editor.applyTransforms([updateOperation]);
  }
}

import { YooptaBlockData, SlateElement } from '../../editor/types';
import { generateId } from '../../utils/generateId';

export const getDefaultParagraphPluginElement = (): SlateElement => ({
  id: generateId(),
  type: 'paragraph',
  children: [{ text: '' }],
  props: {
    nodeType: 'block',
  },
});

export const getDefaultParagraphBlock = (id?: string): YooptaBlockData => ({
  id: id || generateId(),
  value: [getDefaultParagraphPluginElement()],
  type: 'Paragraph',
  meta: {
    order: 0,
    depth: 0,
  },
});

export const getDefaultYooptaChildren = () => {
  const pId = generateId();
  // const codeId = generateId();

  return {
    [pId]: getDefaultParagraphBlock(pId),
    // [codeId]: YOOPTA_ULTRA_VALUES.code(codeId, { order: 1, depth: 0 }),
  };
};

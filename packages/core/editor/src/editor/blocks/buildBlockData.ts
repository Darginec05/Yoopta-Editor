import { YooptaBlockData, SlateElement, YooptaBlockBaseMeta } from '../../editor/types';
import { generateId } from '../../utils/generateId';

export const buildBlockElement = (element?: Partial<SlateElement>): SlateElement => {
  return {
    id: generateId(),
    type: element?.type || 'paragraph',
    children: element?.children || [{ text: '' }],
    props: {
      nodeType: 'block',
      ...element?.props,
    },
  };
};

type BuildBlockDataOptions = Partial<YooptaBlockData<SlateElement>> & {
  value?: SlateElement[];
  meta?: Partial<YooptaBlockBaseMeta>;
};

export function buildBlockData(block?: BuildBlockDataOptions): YooptaBlockData {
  return {
    id: block?.id || generateId(),
    value: block?.value || [buildBlockElement()],
    type: block?.type || 'Paragraph',
    meta: {
      order: block?.meta?.order || 0,
      depth: block?.meta?.depth || 0,
      ...block?.meta,
    },
  };
}

export const buildDefaultChildren = () => {
  const blockId = generateId();

  return {
    [blockId]: buildBlockData({ id: blockId }),
  };
};

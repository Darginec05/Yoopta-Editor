import { Blocks } from '../../editor/blocks';
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

export const buildBlockData = (block?: BuildBlockDataOptions): YooptaBlockData => ({
  id: block?.id || generateId(),
  value: block?.value || [buildBlockElement()],
  type: block?.type || 'Paragraph',
  meta: {
    order: 0,
    depth: 0,
    ...block?.meta,
  },
});

export const getDefaultYooptaChildren = () => {
  const pId = generateId();

  return {
    [pId]: buildBlockData({ id: pId }),
  };
};

export async function handleClipboardItems(editor, file: File) {
  const plugin = Object.keys(editor.plugins).find((plugin) => {
    const pluginInstance = editor.plugins[plugin];
    const mimeTypes = pluginInstance.clipboardPasteOrDropRules?.mimeTypes;
    if (!mimeTypes) return false;
    return mimeTypes.includes(file.type);
  });

  if (!plugin) return;

  const pluginInstance = editor.plugins[plugin];
  const block = await pluginInstance.clipboardPasteOrDropRules?.handler(file, editor);
  if (!block) return;

  const blockData = Blocks.buildBlockData({ type: pluginInstance.type, value: [block] });
  Blocks.insertBlock(editor, pluginInstance.type, { focus: true, blockData });
}

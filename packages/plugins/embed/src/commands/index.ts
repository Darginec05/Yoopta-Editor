import { Blocks, buildBlockData, Elements, generateId, YooEditor, YooptaBlockPath } from '@yoopta/editor';
import { EmbedElement, EmbedElementProps } from '../types';

type EmbedElementOptions = {
  props?: Omit<EmbedElementProps, 'nodeType'>;
};

type InsertEmbedOptions = EmbedElementOptions & {
  at?: YooptaBlockPath;
  focus?: boolean;
};

export type EmbedCommands = {
  buildEmbedElements: (editor: YooEditor, options?: Partial<EmbedElementOptions>) => EmbedElement;
  insertEmbed: (editor: YooEditor, options?: Partial<InsertEmbedOptions>) => void;
  deleteEmbed: (editor: YooEditor, blockId: string) => void;
  updateEmbed: (editor: YooEditor, blockId: string, props: Partial<EmbedElementProps>) => void;
};

export const EmbedCommands: EmbedCommands = {
  buildEmbedElements: (editor: YooEditor, options = {}) => {
    const embedProps = options?.props ? { ...options.props, nodeType: 'void' } : { nodeType: 'void' };
    return { id: generateId(), type: 'embed', children: [{ text: '', props: embedProps }] };
  },
  insertEmbed: (editor: YooEditor, options = {}) => {
    const { at, focus, props } = options;
    const embed = EmbedCommands.buildEmbedElements(editor, { props });
    Blocks.insertBlock(editor, buildBlockData({ value: [embed], type: 'Embed' }), { focus, at });
  },
  deleteEmbed: (editor: YooEditor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
  updateEmbed: (editor: YooEditor, blockId, props) => {
    Elements.updateElement(editor, blockId, { props });
  },
};

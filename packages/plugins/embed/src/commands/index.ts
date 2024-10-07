import { Blocks, buildBlockData, Elements, generateId, YooEditor, YooptaBlockPath } from '@yoopta/editor';
import { EmbedElement, EmbedElementProps, EmbedProvider, EmbedSizes } from '../types';
import { getProvider, ProviderGetters } from '../utils/providers';

type EmbedElementOptions = {
  props?: {
    sizes?: EmbedSizes;
    provider?: {
      url: string;
    };
  };
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
    const embedProps = { ...options.props, nodeType: 'void' };

    if (embedProps.provider?.url) {
      const value = embedProps.provider.url;

      const providerType = getProvider(value);
      const embedId = providerType ? ProviderGetters[providerType]?.(value) : null;
      const provider: EmbedProvider = { type: providerType, id: embedId, url: value };

      if (!providerType || !embedId) {
        provider.id = value;
      }

      // @ts-ignore - [TODO] Fix types
      embedProps.provider = provider;
    }

    return { id: generateId(), type: 'embed', children: [{ text: '' }], props: embedProps as EmbedElementProps };
  },
  insertEmbed: (editor: YooEditor, options = {}) => {
    const { at, focus, props } = options;
    const embed = EmbedCommands.buildEmbedElements(editor, { props });
    const block = buildBlockData({ value: [embed], type: 'Embed' });
    Blocks.insertBlock(editor, block.type, { focus, at, blockData: block });
  },
  deleteEmbed: (editor: YooEditor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
  updateEmbed: (editor: YooEditor, blockId, props) => {
    Elements.updateElement(editor, blockId, { props });
  },
};

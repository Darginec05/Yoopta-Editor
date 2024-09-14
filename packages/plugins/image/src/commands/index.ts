import { Blocks, buildBlockData, Elements, generateId, YooEditor, YooptaBlockPath } from '@yoopta/editor';
import { ImageElement, ImageElementProps } from '../types';

type ImageElementOptions = {
  props?: ImageElementProps;
};

type InsertImageOptions = ImageElementOptions & {
  at?: YooptaBlockPath;
  focus?: boolean;
};

export type ImageCommands = {
  buildImageElements: (editor: YooEditor, options?: Partial<ImageElementOptions>) => ImageElement;
  insertImage: (editor: YooEditor, options?: Partial<InsertImageOptions>) => void;
  deleteImage: (editor: YooEditor, blockId: string) => void;
  updateImage: (editor: YooEditor, blockId: string, props: Partial<ImageElementProps>) => void;
};

export const ImageCommands: ImageCommands = {
  buildImageElements: (editor: YooEditor, options = {}) => {
    return { id: generateId(), type: 'image', children: [{ text: '', props: options?.props }] };
  },
  insertImage: (editor: YooEditor, options = {}) => {
    const { at, focus, props } = options;
    const image = ImageCommands.buildImageElements(editor, { props });
    Blocks.insertBlock(editor, buildBlockData({ value: [image], type: 'Image' }), { focus, at });
  },
  deleteImage: (editor: YooEditor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
  updateImage: (editor: YooEditor, blockId, props) => {
    Elements.updateElement(editor, blockId, { props });
  },
};

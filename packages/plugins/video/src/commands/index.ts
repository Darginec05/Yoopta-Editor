import { Blocks, buildBlockData, Elements, generateId, YooEditor, YooptaBlockPath } from '@yoopta/editor';
import { VideoElement, VideoElementProps } from '../types';

type VideoElementOptions = {
  props?: Omit<VideoElementProps, 'nodeType'>;
};

type InsertVideoOptions = VideoElementOptions & {
  at?: YooptaBlockPath;
  focus?: boolean;
};

export type VideoCommands = {
  buildVideoElements: (editor: YooEditor, options?: Partial<VideoElementOptions>) => VideoElement;
  insertVideo: (editor: YooEditor, options?: Partial<InsertVideoOptions>) => void;
  deleteVideo: (editor: YooEditor, blockId: string) => void;
  updateVideo: (editor: YooEditor, blockId: string, props: Partial<VideoElementProps>) => void;
};

export const VideoCommands: VideoCommands = {
  buildVideoElements: (editor: YooEditor, options = {}) => {
    const videoProps = options?.props ? { ...options.props, nodeType: 'void' } : { nodeType: 'void' };
    return { id: generateId(), type: 'video', children: [{ text: '', props: videoProps }] };
  },
  insertVideo: (editor: YooEditor, options = {}) => {
    const { at, focus, props } = options;
    const video = VideoCommands.buildVideoElements(editor, { props });
    Blocks.insertBlock(editor, buildBlockData({ value: [video], type: 'Video' }), { focus, at });
  },
  deleteVideo: (editor: YooEditor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
  updateVideo: (editor: YooEditor, blockId, props) => {
    Elements.updateElement(editor, blockId, { props });
  },
};

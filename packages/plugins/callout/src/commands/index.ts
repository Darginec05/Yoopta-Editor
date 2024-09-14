import {
  Blocks,
  buildBlockData,
  Elements,
  generateId,
  PluginCommands,
  YooEditor,
  YooptaBlockPath,
} from '@yoopta/editor';
import { CalloutElement, CalloutElementProps, CalloutPluginElementKeys, CalloutTheme } from '../types';

type CalloutElementOptions = {
  text?: string;
};

type InsertCalloutOptions = {
  text?: string;
  at?: YooptaBlockPath;
  focus?: boolean;
};

export type CalloutCommands = {
  buildCalloutElements: (editor: YooEditor, options?: Partial<CalloutElementOptions>) => CalloutElement;
  insertCallout: (editor: YooEditor, options?: Partial<InsertCalloutOptions>) => void;
  deleteCallout: (editor: YooEditor, blockId: string) => void;
  updateCalloutTheme: (editor: YooEditor, blockId: string, theme: CalloutTheme) => void;
};

export const CalloutCommands: CalloutCommands = {
  buildCalloutElements: (editor, options = {}) => {
    return { id: generateId(), type: 'callout', children: [{ text: options?.text || '' }] };
  },
  insertCallout: (editor, options = {}) => {
    const { at, focus, text } = options;

    const callout = CalloutCommands.buildCalloutElements(editor, { text });
    Blocks.insertBlock(editor, buildBlockData({ value: [callout], type: 'Callout' }), { at, focus });
  },
  deleteCallout: (editor, blockId) => {
    Blocks.deleteBlock(editor, { blockId });
  },
  updateCalloutTheme: (editor: YooEditor, blockId: string, theme: CalloutTheme) => {
    Elements.updateElement<CalloutPluginElementKeys, CalloutElementProps>(editor, blockId, {
      type: 'callout',
      props: {
        theme,
      },
    });
  },
};

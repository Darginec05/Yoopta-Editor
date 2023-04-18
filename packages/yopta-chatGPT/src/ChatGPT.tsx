import { createYoptaPlugin, generateId } from '@yopta/editor';
import { Transforms } from 'slate';
import { ChatGTPElement } from './types';
import { ChatGPTEditor } from './ui/ChatGPTEditor';
import { ChatGPTRenderer } from './ui/ChatGPTRenderer';

type ChatGTPOptions = {
  provider: '';
  API: {};
};

const ChatGPT = createYoptaPlugin<ChatGTPOptions, ChatGTPElement>({
  type: 'chat-gpt',
  renderer: {
    editor: (editor) => ChatGPTEditor,
    render: ChatGPTRenderer,
  },
  shortcut: '>',
  defineElement: (): ChatGTPElement => ({
    id: generateId(),
    type: 'chat-gpt',
    children: [{ text: '' }],
    nodeType: 'block',
  }),
  createElement: (editor) => {
    const node: ChatGTPElement = ChatGPT.getPlugin.defineElement();

    Transforms.setNodes<ChatGTPElement>(editor, node, {
      at: editor.selection?.anchor,
    });
  },
  options: {
    provider: '',
    API: {},
  },
});

export { ChatGPT };

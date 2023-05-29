import { generateId } from '@yoopta/editor';
import { useState } from 'react';
import { ChatMessageUI, OpenAIChatMessage } from '../types';

type Props = {
  context?: OpenAIChatMessage[];
};

export const useChatMessages = ({ context }: Props) => {
  const getDefaultMessages = () => {
    if (!Array.isArray(context)) return [];
    if (context.length === 0) return [];

    return context.map((msg) => ({ ...msg, id: generateId(), fromContext: true }));
  };

  const [messages, setMessages] = useState<ChatMessageUI[]>(() => getDefaultMessages());

  const addMessage = (message: ChatMessageUI) => setMessages((prevMsgs) => [...prevMsgs, message]);

  return { messages, updateMessage: addMessage };
};

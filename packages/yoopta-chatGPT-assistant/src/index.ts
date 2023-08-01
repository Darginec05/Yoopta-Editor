import { YooEditor } from '@yoopta/editor';
import { ChatGPTAssistant } from './ui/ChatGPT';

declare module 'slate' {
  interface CustomTypes {
    Editor: YooEditor;
  }
}

export default ChatGPTAssistant;

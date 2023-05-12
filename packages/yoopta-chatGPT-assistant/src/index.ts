import { YoEditor } from '@yoopta/editor';
import { ChatGPTAssistant } from './ui/ChatGPT';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
  }
}

export default ChatGPTAssistant;

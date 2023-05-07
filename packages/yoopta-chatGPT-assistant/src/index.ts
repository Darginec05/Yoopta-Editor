import { YoEditor } from '@yoopta/editor';
import { ChatGTP } from './types';
import { ChatGPTAssistant } from './ui/ChatGPTEditor';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
  }
}

export default ChatGPTAssistant;
export { ChatGTP };

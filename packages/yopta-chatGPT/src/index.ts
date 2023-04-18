import { YoEditor } from '@yopta/editor';
import { ChatGTPElement } from './types';
import { ChatGPT } from './ChatGPT';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
    Element: ChatGTPElement;
  }
}

export default ChatGPT;
export { ChatGTPElement };

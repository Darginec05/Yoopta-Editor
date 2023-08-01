import { YooEditor, YooptaBaseElement } from '@yoopta/editor';
import { ActionMenuList } from './components/ActionMenuList';
export type { ActionMenuItem, ActionMenuRenderProps } from './types';

declare module 'slate' {
  interface CustomTypes {
    Editor: YooEditor;
    Element: YooptaBaseElement<string>;
  }
}

export default ActionMenuList;

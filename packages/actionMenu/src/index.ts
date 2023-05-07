import { YoEditor, YooptaBaseElement } from '@yoopta/editor';
import { ActionMenuList } from './components/ActionMenuList';
export type { ActionMenuItem, ActionMenuRenderProps } from './types';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
    Element: YooptaBaseElement<string>;
  }
}

export default ActionMenuList;

import { YoEditor, YoptaBaseElement } from '@yopta/editor';
import { ActionMenuList } from './components/ActionMenuList';
export type { ActionMenuComponentItem, ActionMenuRenderItem, ActionRenderItemProps } from './types';

declare module 'slate' {
  interface CustomTypes {
    Editor: YoEditor;
    Element: YoptaBaseElement<string>;
  }
}

export default ActionMenuList;

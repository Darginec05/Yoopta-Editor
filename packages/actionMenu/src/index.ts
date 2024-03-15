import { SlateElement } from '@yoopta/editor';
import { ActionMenuList } from './components/ActionMenuList';

import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: SlateElement<string>;
  }
}

export default ActionMenuList;

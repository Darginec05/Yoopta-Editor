import { SlateElement } from '@yoopta/editor';
import { LinkTool } from './components/LinkTool';
export { DefaultLinkToolRender } from './components/DefaultLinkToolRender';

import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: SlateElement<string>;
  }
}

export default LinkTool;

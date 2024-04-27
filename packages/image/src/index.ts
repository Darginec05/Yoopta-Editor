import { Image } from './plugin';
import { ImageRender } from './render/ImageRender';
import { ImageElement } from './types';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: ImageElement;
  }
}

export default Image;
export { ImageElement, ImageRender };

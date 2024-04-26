import { Image } from './plugin';
import { ImageRenderer } from './renders/ImageRenderer';
import { ImageElement } from './types';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: ImageElement;
  }
}

export default Image;
export { ImageElement, ImageRenderer };

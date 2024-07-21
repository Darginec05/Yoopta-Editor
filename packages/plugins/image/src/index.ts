import { Image } from './plugin';
import { ImageElement, ImageElementProps, ImageUploadResponse } from './types';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: ImageElement;
  }
}

export default Image;
export { ImageElement, ImageElementProps, ImageUploadResponse };

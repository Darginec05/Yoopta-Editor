import { Video } from './plugin';
import { VideoElement } from './types';
import './styles.css';

declare module 'slate' {
  interface CustomTypes {
    Element: VideoElement;
  }
}

export default Video;
export { VideoElement };

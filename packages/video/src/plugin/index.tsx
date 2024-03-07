import { YooptaPlugin } from '@yoopta/editor';
import { VideoElementProps, VideoPluginElements, VideoPluginOptions } from '../types';
import { VideoRender } from '../ui/Video';

const Video = new YooptaPlugin<VideoPluginElements, VideoElementProps, VideoPluginOptions>({
  type: 'Video',
  elements: {
    // [TODO] - caption element??,
    video: {
      render: VideoRender,
      props: {
        src: null,
        alt: null,
        srcSet: null,
        bgColor: null,
        fit: 'contain',
        sizes: { width: 650, height: 400 },
        nodeType: 'void',
      },
    },
  },
  options: {
    displayLabel: 'Video',
    onUpload: () => Promise.resolve({ src: null, alt: null }),
    accept: 'video/png, video/jpeg, video/gif, video/webp',
    maxSizes: { maxWidth: 850, maxHeight: 600 },
    // optimizations: {
    //   deviceSizes: [320, 420, 768, 1024, 1200, 1600],
    // },
  },
});

export { Video };

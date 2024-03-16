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
        srcSet: null,
        bgColor: null,
        sizes: { width: 650, height: 400 },
        nodeType: 'void',
        settings: {
          controls: false,
          loop: true,
          muted: true,
          autoPlay: true,
        },
      },
    },
  },
  options: {
    display: {
      title: 'Video',
      description: 'Upload from device, embed from Youtube, Vimeo',
    },
    accept: 'video/*',
    maxSizes: { maxWidth: 650, maxHeight: 550 },
    // optimizations: {
    //   deviceSizes: [320, 420, 768, 1024, 1200, 1600],
    // },
  },
});

export { Video };

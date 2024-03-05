import { YooptaPlugin } from '@yoopta/editor';
import { VideoRender } from '../ui/Video';

const Video = new YooptaPlugin({
  type: 'VideoPlugin',
  elements: {
    video: {
      render: VideoRender,
      props: {
        src: null,
        alt: null,
        srcSet: null,
        fit: 'cover',
        sizes: { width: 626, height: 400, maxWidth: 700, maxHeight: 400 },
        nodeType: 'void',
      },
    },
  },
  options: {
    displayLabel: 'Video',
  },
});

export { Video };

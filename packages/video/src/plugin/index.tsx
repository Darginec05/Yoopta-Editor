import { createYooptaPlugin } from '@yoopta/editor';
import { VideoRender } from '../ui/Video';

const Video = createYooptaPlugin({
  type: 'VideoPlugin',
  elements: {
    video: {
      render: VideoRender,
      elementProps: {
        src: null,
        alt: null,
        srcSet: null,
        fit: 'cover',
        sizes: { width: 500, height: 300, maxWidth: 700, maxHeight: 400 },
      },
      options: {
        nodeType: 'void',
        // asRoot: true
      },
    },
  },
  options: {
    displayLabel: 'Video',
  },
});

export { Video };

import { generateId, YooptaPlugin } from '@yoopta/editor';
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
        provider: {
          type: null,
          id: '',
        },
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
    accept: 'video/*',
    maxSizes: { maxWidth: 650, maxHeight: 550 },
    onUpload: async () => Promise.resolve({ src: '' }),
    display: {
      title: 'Video',
      description: 'Upload from device, embed from Youtube, Vimeo',
    },
  },
  parsers: {
    html: {
      deserialize: {
        nodeNames: ['VIDEO', 'A'],
        parse: (el) => {
          if (el.nodeName === 'VIDEO') {
            const src = el.getAttribute('src');
            const srcSet = el.getAttribute('srcset');
            const bgColor = el.getAttribute('bgcolor');
            const sizes = { width: el.getAttribute('width'), height: el.getAttribute('height') };
            const controls = el.getAttribute('controls');
            const loop = el.getAttribute('loop');
            const muted = el.getAttribute('muted');
            const autoPlay = el.getAttribute('autoplay');

            const props = {
              src,
              srcSet,
              bgColor,
              sizes,
              settings: {
                controls: !!controls,
                loop: !!loop,
                muted: !!muted,
                autoPlay: !!autoPlay,
              },
            };

            return {
              id: generateId(),
              type: 'video',
              children: [{ text: '' }],
              props,
            };
          }

          // [TODO] - add support for video links. Ex. from notion
          // if (el.nodeName === 'A') {
          //   console.log('el', el);

          //   const href = el.getAttribute('href');
          //   if (href?.endsWith('.mp4')) {
          //     return {
          //       id: generateId(),
          //       type: 'video',
          //       children: [{ text: '' }],
          //       props: {
          //         src: href,
          //         sizes: { width: 650, height: 400 },
          //         settings: {
          //           controls: false,
          //           loop: true,
          //           muted: true,
          //           autoPlay: true,
          //         },
          //       },
          //     };
          //   }
          // }
        },
      },
    },
  },
});

export { Video };

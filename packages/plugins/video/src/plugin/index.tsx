import { generateId, YooptaPlugin } from '@yoopta/editor';
import { VideoElementProps, VideoPluginElements, VideoPluginOptions } from '../types';
import { VideoRender } from '../ui/Video';

const ALIGNS_TO_JUSTIFY = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

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
        fit: 'cover',
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
        nodeNames: ['VIDEO'],
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
            const fit = el.getAttribute('objectFit') || 'cover';

            const props = {
              src,
              srcSet,
              bgColor,
              sizes,
              fit,
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
      serialize: (element, text, blockMeta) => {
        const { align = 'center', depth = 0 } = blockMeta || {};
        const justify = ALIGNS_TO_JUSTIFY[align] || 'center';

        return `
        <div style="margin-left: ${depth}px; display: flex; width: 100%; justify-content: "${justify}"">
        <video data-meta-align="${align}" data-meta-depth="${depth}" src="${element.props.src}" width="${element.props.sizes.width}" height="${element.props.sizes.height}" controls="${element.props.settings.controls}" loop="${element.props.settings.loop}" muted="${element.props.settings.muted}" autoplay="${element.props.settings.autoPlay}" style="margin: 0 auto;" objectFit="${element.props.fit}" />
        </div>`;
      },
    },
    markdown: {
      serialize: (element, text) => {
        return `![${element.props.src}](${element.props.src})\n`;
      },
    },
  },
});

export { Video };

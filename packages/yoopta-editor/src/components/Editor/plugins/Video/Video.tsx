import { createPlugin } from '../../../../plugins';

const VideoRender = (props) => {
  const data = props.element.data;

  return (
    <div data-element-type="VideoPluginUltra" {...props.attributes}>
      <video
        playsInline
        controls
        data-automation="VideoPlayer"
        height={data.height}
        width={data.width}
        loop
        muted
        autoPlay
        poster={data.poster}
        preload="auto"
        aria-label="video-player"
      >
        <source
          src="https://www.shutterstock.com/shutterstock/videos/1075423076/preview/stock-footage-collage-of-eyes-beautiful-people-of-different-ages-and-multiethnic-close-up-montage-of-positive.webm"
          type="video/webm"
        />
        <source
          src="https://www.shutterstock.com/shutterstock/videos/1075423076/preview/stock-footage-collage-of-eyes-beautiful-people-of-different-ages-and-multiethnic-close-up-montage-of-positive.mp4"
          type="video/mp4"
        />
      </video>
      {props.children}
    </div>
  );
};

export type VideoSlateElementProps = {
  height: number;
  width: number;
  src: string | null;
  poster?: string;
};

const Video = createPlugin<VideoSlateElementProps>({
  type: 'VideoPlugin',
  elements: {
    video: {
      render: VideoRender,
      props: {
        height: 400,
        width: 400,
        src: null,
        poster: undefined,
      },
      options: {
        nodeType: 'void',
      },
    },
  },
});

export { Video };

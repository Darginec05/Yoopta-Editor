import { createUltraPlugin } from '../../ultraPlugins';

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

const Video = createUltraPlugin<VideoSlateElementProps>({
  type: 'video',
  render: VideoRender,
  options: {
    isVoid: true,
  },
  props: {
    height: 400,
    width: 400,
    src: null,
    poster: undefined,
  },
});

export { Video };

import { RenderElementProps } from 'slate-react';

const VideoRender = (props: RenderElementProps) => {
  const { src, alt, sources, fit, poster, sizes } = props.element.props;

  console.log({ src, alt, sources, fit, sizes });

  return (
    <div data-element-type="VideoPluginUltra" {...props.attributes}>
      <video
        playsInline
        controls
        data-automation="VideoPlayer"
        height={sizes.height}
        width={sizes.width}
        loop
        muted
        autoPlay
        poster={poster}
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

export { VideoRender };

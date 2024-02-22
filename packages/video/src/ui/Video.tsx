import { RenderElementProps, useFocused, useSelected } from 'slate-react';

const VideoRender = ({ element, attributes, children }: RenderElementProps) => {
  const { src, alt, sources, fit, poster, sizes } = element.props;
  const selected = useSelected();
  const focused = useFocused();

  const style = {
    boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}`,
  };

  return (
    <div contentEditable={false} draggable={false} {...attributes} style={style}>
      {children}
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
    </div>
  );
};

export { VideoRender };

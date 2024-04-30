import { CSSProperties } from 'react';
import { VideoElementProps } from '../types';
import DailyMotion from '../editor/DailyMotionPlayer';
import VimeoPlayer from '../editor/VimeoPlayer';
import YouTubePlayer from '../editor/YootubePlayer';
import { ElementRendererProps } from '@yoopta/editor';

type VideoComponentProps = Omit<VideoElementProps, 'sizes'> & {
  width: number;
  height: number;
};

const PROVIDERS = {
  vimeo: VimeoPlayer,
  youtube: YouTubePlayer,
  dailymotion: DailyMotion,
};

const VideoRender = ({ attributes, children, element }: ElementRendererProps) => {
  const { sizes, src, bgColor, poster, provider, fit } = element.props || {};
  const { width, height } = sizes || {};

  const style: CSSProperties = {
    backgroundColor: bgColor || 'transparent',
    objectFit: fit || 'contain',
  };

  // const attributes: VideoHTMLAttributes<HTMLVideoElement> = {};

  // if (settings?.autoPlay) {
  //   attributes['autoPlay'] = true;
  //   attributes['controls'] = false;
  //   attributes['muted'] = false;
  // }

  // if (settings?.loop) {
  //   attributes['loop'] = true;
  //   attributes['muted'] = true;
  //   attributes['controls'] = false;
  // }

  // if (settings?.muted) {
  //   attributes['muted'] = true;
  // }

  // if (settings?.controls) {
  //   attributes['controls'] = true;
  // }

  if (provider && provider.id && provider.type && PROVIDERS[provider.type]) {
    const Provider = PROVIDERS[provider.type];

    return (
      <div
        {...attributes}
        style={{ height, width, ...attributes?.style }}
        className={`yoo-video-relative yoo-video-mx-auto yoo-video-flex yoopta-video ${attributes.className || ''}`}
      >
        <Provider videoId={provider.id} width={width} height={height} />
        {children}
      </div>
    );
  }

  return (
    <div
      {...attributes}
      style={{ height, width, ...attributes?.style }}
      className={`yoo-video-relative yoo-video-mx-auto yoo-video-flex yoopta-video ${attributes.className || ''}`}
    >
      {src && (
        <video
          preload="metadata"
          poster={poster}
          src={src}
          width={width}
          height={height}
          onDragStart={(e) => e.preventDefault()}
          className="yoo-video-object-cover yoo-video-w-full yoo-video-h-full"
          style={style}
          playsInline
          controls
        />
      )}
      {children}
    </div>
  );
};

export { VideoRender, VideoComponentProps };

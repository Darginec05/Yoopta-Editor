import { CSSProperties, HTMLAttributes, VideoHTMLAttributes } from 'react';
import { VideoElementProps } from '../types';
import DailyMotion from './DailyMotionPlayer';
import VimeoPlayer from './VimeoPlayer';
import YouTubePlayer from './YootubePlayer';

type VideoComponentProps = Omit<VideoElementProps, 'sizes'> & {
  width: number;
  height: number;
};

const PROVIDERS = {
  vimeo: VimeoPlayer,
  youtube: YouTubePlayer,
  dailymotion: DailyMotion,
};

const VideoComponent = ({ width, height, src, settings, bgColor, poster, provider, fit }: VideoComponentProps) => {
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
    return <Provider videoId={provider.id} width={width} height={height} />;
  }

  return (
    <div className="yoo-video-w-full">
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
    </div>
  );
};

export { VideoComponent, VideoComponentProps };

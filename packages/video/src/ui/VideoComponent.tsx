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

const VideoComponent = ({ width, height, src, settings, bgColor, poster, provider }: VideoComponentProps) => {
  const style: CSSProperties = {
    backgroundColor: bgColor || 'transparent',
    objectFit: 'contain',
  };

  const attributes: VideoHTMLAttributes<HTMLVideoElement> = {};

  if (settings?.autoPlay) {
    attributes['autoPlay'] = true;
    attributes['controls'] = false;
    attributes['muted'] = false;
  }

  if (settings?.loop) {
    attributes['loop'] = true;
    attributes['muted'] = true;
    attributes['controls'] = false;
  }

  if (settings?.muted) {
    attributes['muted'] = true;
  }

  if (settings?.controls) {
    attributes['controls'] = true;
  }

  console.log('provider', provider);
  console.log('is', provider && provider.id && provider.type && PROVIDERS[provider.type]);

  if (provider && provider.id && provider.type && PROVIDERS[provider.type]) {
    const Provider = PROVIDERS[provider.type];
    return <Provider videoId={provider.id} width={width} height={height} />;
  }

  return (
    <div className="w-full">
      {src && (
        <video
          preload="metadata"
          poster={poster}
          src={src}
          width={width}
          height={height}
          onDragStart={(e) => e.preventDefault()}
          className="object-cover w-full h-full"
          style={style}
          playsInline
          {...attributes}
        />
      )}
    </div>
  );
};

export { VideoComponent, VideoComponentProps };

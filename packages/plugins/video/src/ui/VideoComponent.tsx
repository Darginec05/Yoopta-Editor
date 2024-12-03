import { CSSProperties } from 'react';
import { RenderElementProps } from 'slate-react';
import { VideoElementProps } from '../types';
import DailyMotion from './DailyMotionPlayer';
import VimeoPlayer from './VimeoPlayer';
import YouTubePlayer from './YoutubePlayer';
import LoomPlayer from './LoomPlayer';
import WistiaPlayer from './WistiaPlayer';

type VideoComponentProps = Omit<VideoElementProps, 'sizes'> & {
  width: number | string;
  height: number | string;
} & Pick<RenderElementProps, 'attributes' | 'children'>;

const PROVIDERS = {
  vimeo: VimeoPlayer,
  youtube: YouTubePlayer,
  dailymotion: DailyMotion,
  loom: LoomPlayer,
  wistia: WistiaPlayer,
};

const VideoComponent = ({
  width,
  height,
  src,
  bgColor,
  poster,
  provider,
  fit,
  attributes,
  children,
}: VideoComponentProps) => {
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
      <Provider videoId={provider.id} width={width} height={height} attributes={attributes}>
        {children}
      </Provider>
    );
  }

  return (
    <div className="yoo-video-w-full" {...attributes}>
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

export { VideoComponent, VideoComponentProps };

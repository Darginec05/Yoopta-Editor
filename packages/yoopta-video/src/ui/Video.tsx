import { RenderYooptaElementProps } from '@yoopta/editor';
import { ReactNode } from 'react';
import DailyMotion from '../components/DayliMotion';
import VimeoPlayer from '../components/VimeoPlayer';
import YouTubePlayer from '../components/YoutubePlayer';
import { VideoElement, VideoElementData } from '../types';
import s from './Video.module.scss';

type Props = RenderYooptaElementProps<VideoElement> & { children?: ReactNode; size?: VideoElementData['size'] };

const PROVIDERS = {
  vimeo: VimeoPlayer,
  youtube: YouTubePlayer,
  dailymotion: DailyMotion,
};

const Video = ({ attributes, element, children, size }: Props) => {
  const width = size?.width || element.data?.size?.width || '100%';
  const height = size?.height || element.data?.size?.height || 400;

  if (typeof element.data.provider === 'string' && element.data.videoId && PROVIDERS[element.data.provider]) {
    const ProviderComponent = PROVIDERS[element.data.provider];
    return (
      <div {...attributes} className={s.videoElement} contentEditable={false} draggable={false}>
        <div className={s.iframRoot}>
          <div className={s.iframeWrap}>
            <ProviderComponent videoId={element.data.videoId} />
          </div>
        </div>
        {children}
      </div>
    );
  }

  if (!element.data.url && !element.data['data-src'])
    return (
      <div {...attributes} className={s.videoElement} contentEditable={false} draggable={false}>
        {children}
      </div>
    );

  return (
    <div {...attributes} className={s.videoElement} contentEditable={false} draggable={false}>
      <video
        controls
        preload="metadata"
        playsInline
        src={element.data.url || element.data['data-src'] || ''}
        width={width}
        height={height}
        className={s.video}
        onDragStart={(e) => e.preventDefault()}
      />
      {children}
    </div>
  );
};

export { Video };

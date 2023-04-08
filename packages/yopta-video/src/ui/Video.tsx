import { RenderElementProps } from '@yopta/editor';
import { ReactNode } from 'react';
import { VideoElement, VideoElementData } from '../types';
import s from './Video.module.scss';

type Props = RenderElementProps<VideoElement> & { children?: ReactNode; size?: VideoElementData['size'] };

const Video = ({ attributes, element, children, size }: Props) => {
  const width = size?.width || element.data?.size?.width || '100%';
  const height = size?.height || element.data?.size?.height || 400;

  if (!element.data.url && !element.data['data-src'])
    return (
      <div {...attributes} className={s.videoElement} contentEditable={false} draggable={false}>
        {children}
      </div>
    );

  if (typeof element.data.provider === 'string' && element.data.url) {
    return (
      <div {...attributes} className={s.videoElement} contentEditable={false} draggable={false}>
        <div className={s.iframRoot}>
          <div className={s.iframeWrap}>
            <iframe src={element.data.url} allowFullScreen frameBorder={0} className={s.iframe} />
          </div>
        </div>
        {children}
      </div>
    );
  }

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

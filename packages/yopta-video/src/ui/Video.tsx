import { RenderElementProps } from '@yopta/editor';
import { ReactNode } from 'react';
import { VideoElement } from '../types';
import s from './Video.module.scss';

type Props = RenderElementProps<VideoElement> & { children?: ReactNode; size?: { width: number; height: number } };

const Video = ({ attributes, element, children, size }: Props) => {
  const width = size?.width || element.options?.size?.width || '100%';
  const height = size?.height || element.options?.size?.height || 400;

  if (!element.url && !element['data-src']) return <div />;

  return (
    <div {...attributes} className={s.videoElement} contentEditable={false} draggable={false}>
      <video
        controls
        preload="metadata"
        playsInline
        src={element.url || element['data-src'] || ''}
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

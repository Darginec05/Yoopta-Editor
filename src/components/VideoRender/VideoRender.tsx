import { CSSProperties } from 'react';
import { getMediaAspectRatio } from '../Editor/utils';
import s from './VideoRender.module.scss';

type Video = { style?: CSSProperties | undefined; options: any } & JSX.IntrinsicElements['video'];

const VideoRender = ({ src, style, options = {} }: Video) => {
  const onContextMenu = (e) => e.preventDefault();
  const { width, height } = getMediaAspectRatio(options?.width, options?.height, 718, 900);

  return (
    <div className={s.wrap} style={style}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        onContextMenu={onContextMenu}
        width={width}
        height={height}
        controls
        preload="metadata"
        controlsList="nodownload"
        src={src}
      />
    </div>
  );
};

export { VideoRender };

import { CSSProperties } from 'react';
import s from './VideoRender.module.scss';

type Video = { style?: CSSProperties | undefined } & JSX.IntrinsicElements['video'];

const VideoRender = ({ src, style }: Video) => {
  const onContextMenu = (e) => e.preventDefault();

  return (
    <div className={s.wrap} style={style}>
      <video onContextMenu={onContextMenu} controls controlsList="nodownload">
        <source src={src} type="video/mp4" />
        {/* <source src="forrest_gump.ogg" type="video/ogg" /> */}
        <track src={src} kind="subtitles" srcLang="en" label="English" />
      </video>
    </div>
  );
};

export { VideoRender };

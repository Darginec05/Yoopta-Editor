import { CSSProperties } from 'react';
import s from './VideoRender.module.scss';

type Video = { style?: CSSProperties | undefined } & JSX.IntrinsicElements['video'];

const VideoRender = ({ src, style, ...rest }: Video) => {
  return (
    <div className={s.wrap} style={style}>
      <video controls>
        <source src={src} type="video/mp4" />
        {/* <source src="forrest_gump.ogg" type="video/ogg" /> */}
        <track src={src} kind="subtitles" srcLang="en" label="English" />
      </video>
    </div>
  );
};

export { VideoRender };

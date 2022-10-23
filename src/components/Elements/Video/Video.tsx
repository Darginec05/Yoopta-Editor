import { VideoEditor } from '../../VideoEditor/VideoEditor';
import { VideoRender } from '../../VideoRender/VideoRender';
import s from './Video.module.scss';

// [TODO] - problems when dynamic import
// const VideoEditor = dynamic(() => import('../../VideoEditor').then((mod) => mod.VideoEditor));

const Video = ({ element, attributes, children, isEdit }) => {
  if (isEdit) {
    return (
      <VideoEditor element={element} attributes={attributes} className={s.image}>
        {children}
      </VideoEditor>
    );
  }

  return (
    <div className={s.image}>
      <VideoRender src={element.src} alt="URI" options={element.options} />
    </div>
  );
};

export { Video };

import { Video } from './Video';
import s from './VideoEditor.module.scss';

const VideoEditor = (props) => {
  return (
    <div contentEditable={false}>
      <Video {...props} />
    </div>
  );
};

export { VideoEditor };
